import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { verifyUser, registerUser, RegisterPayload } from '../services/dataService';
import { isSupabaseConfigured } from '../lib/supabaseClient';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import logoImg from '../../imports/Logo.png';

export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [registerForm, setRegisterForm] = useState({
    account: '',
    password: '',
    name: '',
    course: '',
    year: '',
    subject: '',
    section: '',
  });

  const handleSignIn = async () => {
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');

    const userData = await verifyUser(account, password);

    if (userData) {
      // AppContext.setUser loads this account's progress from Supabase itself.
      setUser(userData);
      navigate('/home');
    } else {
      setError('Invalid account or password');
    }

    setLoading(false);
  };

  const handleRegister = async () => {
    if (!registerForm.account || !registerForm.password || !registerForm.name ||
        !registerForm.course || !registerForm.year || !registerForm.subject || !registerForm.section) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const success = await registerUser(registerForm as RegisterPayload);

    if (success) {
      setShowRegister(false);
      setError('');
      toast.success('Registration successful!', {
        description: 'You can now sign in with your account.',
        icon: <CheckCircle className="h-5 w-5" />,
      });
      setRegisterForm({
        account: '',
        password: '',
        name: '',
        course: '',
        year: '',
        subject: '',
        section: '',
      });
    } else {
      setError('Registration failed. Account may already exist.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute top-6 right-6">
        <Dialog open={showInfo} onOpenChange={setShowInfo}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all duration-300 hover:scale-110"
            >
              <Info className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-amber-500/30">
            <DialogHeader>
              <DialogTitle className="text-amber-400">About HabitQuest</DialogTitle>
              <DialogDescription className="sr-only">
                Information about the HabitQuest application
              </DialogDescription>
            </DialogHeader>
            <div className="text-slate-300 space-y-2">
              <p>HabitQuest is a gamified learning platform designed to help students build consistent study habits through daily quests.</p>
              <p className="mt-4">Complete daily questions across four subjects:</p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>Digital Electronics</li>
                <li>Internet of Things</li>
                <li>Physics for Automotive</li>
                <li>Automotive Trivia</li>
              </ul>
              <p className="mt-4">Track your progress and earn SDP points as you complete quests!</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-500/20 p-8">
          <div className="flex flex-col items-center mb-8">
            <img src={logoImg} alt="HabitQuest Logo" className="w-24 h-24 mb-4 rounded-full border-2 border-amber-500" />
            <h1 className="text-3xl font-bold text-amber-400 mb-2">HabitQuest</h1>
            <p className="text-slate-400 text-sm">Level up your learning journey</p>
          </div>

          {!isSupabaseConfigured && (
            <div className="mb-6 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-orange-300">
                <strong>Setup Required:</strong> Supabase is not configured. Set <code className="bg-slate-900/50 px-1 py-0.5 rounded">VITE_SUPABASE_URL</code> and <code className="bg-slate-900/50 px-1 py-0.5 rounded">VITE_SUPABASE_ANON_KEY</code>. See <code className="bg-slate-900/50 px-1 py-0.5 rounded">DEPLOYMENT_GUIDE.md</code>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="account" className="text-slate-300">Account</Label>
              <Input
                id="account"
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 focus:border-amber-500"
                placeholder="Enter your account"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 focus:border-amber-500"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                className="mt-1 border-slate-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
              />
              <label htmlFor="terms" className="text-sm text-slate-300 leading-tight">
                I agree to the terms and conditions of HabitQuest and understand the data collection policy
              </label>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/30">
                {error}
              </div>
            )}

            <Button
              onClick={handleSignIn}
              disabled={loading || !agreedToTerms}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Dialog open={showRegister} onOpenChange={setShowRegister}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition-all duration-300"
                >
                  Register New Account
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-amber-500/30 max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-amber-400">Create New Account</DialogTitle>
                  <DialogDescription className="sr-only">
                    Fill out the registration form to create your account
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label className="text-slate-300">Account</Label>
                    <Input
                      value={registerForm.account}
                      onChange={(e) => setRegisterForm({ ...registerForm, account: e.target.value })}
                      className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Password</Label>
                    <Input
                      type="password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Name</Label>
                    <Input
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Course</Label>
                    <Input
                      value={registerForm.course}
                      onChange={(e) => setRegisterForm({ ...registerForm, course: e.target.value })}
                      className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Year</Label>
                    <Input
                      value={registerForm.year}
                      onChange={(e) => setRegisterForm({ ...registerForm, year: e.target.value })}
                      className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Subject</Label>
                    <Input
                      value={registerForm.subject}
                      onChange={(e) => setRegisterForm({ ...registerForm, subject: e.target.value })}
                      className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Section</Label>
                    <Input
                      value={registerForm.section}
                      onChange={(e) => setRegisterForm({ ...registerForm, section: e.target.value })}
                      className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                  <Button
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900"
                  >
                    {loading ? 'Registering...' : 'Register'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="mt-6 pt-4 border-t border-slate-700/50 text-center">
              <p className="text-slate-500 text-xs">
                Created by <span className="text-amber-400/80">Julius Jay A. Gonzales</span>
              </p>
              <p className="text-slate-600 text-[10px] mt-0.5">© 2026 HabitQuest</p>
              <button
                onClick={() => navigate('/admin')}
                className="text-slate-700 hover:text-slate-500 text-[10px] mt-2 transition-colors"
              >
                Admin sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
