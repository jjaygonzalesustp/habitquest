# HabitQuest — Deployment Guide (Supabase + GitHub + Vercel)

This guide takes you from this folder to a live app with zero command-line
git usage: you'll drag-and-drop files into GitHub's web uploader, then
connect Vercel to that repo.

---

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) → **New project**.
   - Pick an organization, name it `habitquest` (or anything), set a database
     password (save it somewhere), pick a region close to your users.
2. Wait for the project to finish provisioning (~2 minutes).
3. **Turn off email confirmation** (required — the app uses fake internal
   emails since students only have a username/password, and there's no inbox
   to click a confirmation link from):
   - Go to **Authentication → Sign In / Providers → Email**.
   - Turn **off** "Confirm email".
   - Save.
4. Run the schema:
   - Go to **SQL Editor → New query**.
   - Open [supabase/schema.sql](./supabase/schema.sql) from this folder,
     copy its entire contents, paste into the editor, click **Run**.
   - This creates the `profiles`, `activity_log`, `user_progress` tables,
     all Row Level Security policies, the auto-profile-creation trigger, and
     an `avatars` storage bucket.
5. Collect your API keys — **Project Settings → API**:
   - **Project URL** → this is `VITE_SUPABASE_URL`.
   - **anon public** key → this is `VITE_SUPABASE_ANON_KEY`.
   - **service_role** key → this is `SUPABASE_SERVICE_ROLE_KEY`.
     ⚠️ Keep this one secret — never put it in the frontend or commit it to
     GitHub. It only goes into Vercel's server-side environment variables.

### Create your admin account

1. Run the app locally or after it's deployed (see below), register a normal
   account through the **Register New Account** dialog on the sign-in page —
   use whatever account name you want to be your admin login.
2. Back in Supabase, go to **SQL Editor** and run (replacing the account
   name):
   ```sql
   update public.profiles set role = 'admin' where account = 'your_account';
   ```
3. That account can now sign in at `/admin` (there's a small "Admin sign in"
   link at the bottom of the student sign-in page) instead of the regular
   student flow.

---

## 2. Upload this folder to GitHub (no git commands needed)

1. Go to [github.com/new](https://github.com/new) and create a new
   repository (e.g. `habitquest`). Leave it empty — do **not** initialize
   with a README.
2. On the new repo's page, click **uploading an existing file** (or **Add
   file → Upload files**).
3. Open this folder (`HabitQuest-Supabase-Deploy`) on your computer, select
   **all files and folders inside it** (not the folder itself — its
   contents), and drag them into the GitHub upload box.
   - Make sure hidden files come along too: `.gitignore` and `.env.example`.
     If your file explorer hides dotfiles, enable "Show hidden files" first
     (Windows: View → Show → Hidden items) so `.gitignore` is included.
   - **Never upload a `node_modules` folder** if one exists (e.g. because you
     ran `npm install` locally to test). It's huge, unnecessary — Vercel
     installs dependencies itself from `package.json` — and GitHub's web
     uploader does **not** respect `.gitignore` (that file only matters to
     the `git` command line), so you must manually leave `node_modules` out
     of whatever you drag in.
   - Do **not** upload a real `.env` file if you created one for local
     testing — it would leak your Supabase keys into the repo.
     `.env.example` (no real values) is fine and should be included.
4. Scroll down, add a commit message like "Initial deploy", click **Commit
   changes**.

Your repo now has the full app.

---

## 3. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and sign in (GitHub login
   is easiest).
2. **Import** the GitHub repo you just created.
3. Vercel should auto-detect **Vite** as the framework. Leave the build
   command (`vite build` / `npm run build`) and output directory (`dist`) as
   detected.
4. Before deploying, expand **Environment Variables** and add:

   | Name | Value | Environments |
   |---|---|---|
   | `VITE_SUPABASE_URL` | your Supabase Project URL | Production, Preview, Development |
   | `VITE_SUPABASE_ANON_KEY` | your Supabase anon public key | Production, Preview, Development |
   | `SUPABASE_SERVICE_ROLE_KEY` | your Supabase service_role key | Production, Preview, Development (mark **Sensitive**) |

5. Click **Deploy**. Vercel installs dependencies, builds, and gives you a
   `*.vercel.app` URL.
6. Open the URL, register a test account, and confirm sign-in/quests work.
   Sign in as your admin account at `/admin` and confirm the dashboard loads.

### Updating the site later

Since you're not using git locally, to ship a change: edit the files, then
on the GitHub repo page use **Add file → Upload files** again with the
changed files (GitHub will offer to replace the existing ones), commit.
Vercel automatically redeploys on every push to the repo's default branch.

---

## 4. Post-deploy checklist

- [ ] Confirmed "Confirm email" is OFF in Supabase Auth settings.
- [ ] Ran `supabase/schema.sql` successfully (no errors in the SQL editor).
- [ ] Promoted one account to `role = 'admin'`.
- [ ] All three env vars set in Vercel; redeployed after adding them if you
      added them after the first deploy.
- [ ] Registered a student account and completed a quest — check
      **Table Editor → activity_log** in Supabase for the new row.
- [ ] Signed in at `/admin`, saw the student in the Accounts tab.
- [ ] Tried **Reset Password** on a test account, then signed in as that
      student with password `123456` and confirmed the "password was reset"
      banner + Change Password flow works.
- [ ] Tried **Delete** on a throwaway test account and confirmed it
      disappears (and can no longer sign in).

---

## Updating an already-deployed site: subject enrollment gating

If your project was set up before subject-gating was added, do this once:

1. **Re-run the schema** — open [supabase/schema.sql](./supabase/schema.sql),
   copy the whole file again, paste into **Supabase → SQL Editor**, and
   **Run**. It's safe to re-run in full: it adds the new `enrolled_subjects`
   column (existing accounts are automatically backfilled with all 4
   subjects, so nobody loses access) without touching existing data.
2. **Re-upload the changed files to GitHub** — on your repo page, use **Add
   file → Upload files** and drag in just these (GitHub will detect and
   replace the existing versions):
   - `supabase/schema.sql`
   - `src/app/data/subjects.ts` (new file)
   - `src/app/services/dataService.ts`
   - `src/app/pages/Quest.tsx`
   - `src/app/pages/Home.tsx`
   - `src/app/pages/admin/AdminDashboard.tsx`
3. Vercel redeploys automatically on the push. Once it's live, open **Admin →
   Accounts → Edit** on any student and uncheck the subjects they're not
   enrolled in — their Quest page will only show the checked ones.

New registrations default to all 4 subjects enrolled; narrow them down per
student from the admin dashboard as needed.

---

## Notes / limitations

- Student "accounts" are mapped to `<account>@habitquest.local` internally
  for Supabase Auth. This is invisible to users — they only ever see/enter
  their account name.
- The admin API routes (`/api/admin/reset-password`, `/api/admin/delete-user`)
  only exist on Vercel — there is no equivalent running under plain
  `npm run dev`. Use `vercel dev` locally if you need to test them without
  deploying, or just test them after deploying.
- Grades are computed on the fly from quiz/quest activity — there is no
  manual "Grades" sheet to maintain anymore.
- Subject enrollment gating (Admin → Accounts → Edit → checkboxes) hides
  non-enrolled subjects from the student's Quest page, but — like the rest of
  this app's client-trusted design — it isn't a hard security boundary. A
  student who inspects network requests could still technically submit
  activity for a subject they're not enrolled in. For a self-paced study app
  this is a non-issue; if you need it enforced server-side too, that would
  mean adding a Postgres check against `enrolled_subjects` when quest
  activity is recorded.
