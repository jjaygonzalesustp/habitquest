import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toaster } from './components/ui/sonner';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Grades from './pages/Grades';
import Quest from './pages/Quest';
import QuestLibrary from './pages/QuestLibrary';
import Question from './pages/Question';
import Explanation from './pages/Explanation';
import SurpriseQuiz from './components/SurpriseQuiz';
import RequireAuth from './components/RequireAuth';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './pages/admin/AdminRoute';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="size-full">
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/grades" element={<RequireAuth><Grades /></RequireAuth>} />
            <Route path="/quest" element={<RequireAuth><Quest /></RequireAuth>} />
            <Route path="/quest-library" element={<RequireAuth><QuestLibrary /></RequireAuth>} />
            <Route path="/question" element={<RequireAuth><Question /></RequireAuth>} />
            <Route path="/explanation" element={<RequireAuth><Explanation /></RequireAuth>} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <SurpriseQuiz />
          <Toaster richColors />
        </div>
      </Router>
    </AppProvider>
  );
}