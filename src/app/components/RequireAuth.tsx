import React from 'react';
import { useApp } from '../context/AppContext';

/**
 * Wraps student-facing routes. Supabase sessions persist across reloads, but
 * restoring one is async — without this, a hard refresh on e.g. /grades would
 * see `user === null` for a moment and bounce straight to sign-in before the
 * session finished loading.
 */
export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { authLoading } = useApp();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400" />
      </div>
    );
  }

  return <>{children}</>;
}
