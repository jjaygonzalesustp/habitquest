import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { verifyUser, signOut } from '../../services/dataService';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setLoading(true);
    setError('');

    const userData = await verifyUser(account, password);

    if (!userData) {
      setError('Invalid account or password');
      setLoading(false);
      return;
    }

    if (userData.role !== 'admin') {
      await signOut();
      setError('This account does not have admin access');
      setLoading(false);
      return;
    }

    setUser(userData);
    navigate('/admin/dashboard');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-500/20 p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-amber-500/10 rounded-full p-4 mb-4">
              <ShieldCheck className="h-10 w-10 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-amber-400 mb-2">Admin Access</h1>
            <p className="text-slate-400 text-sm">HabitQuest administration</p>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="account" className="text-slate-300">Account</Label>
              <Input
                id="account"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 focus:border-amber-500"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
                className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100 focus:border-amber-500"
              />
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/30">
                {error}
              </div>
            )}

            <Button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>

            <button
              onClick={() => navigate('/')}
              className="w-full text-center text-slate-500 hover:text-slate-400 text-xs mt-2"
            >
              Back to student sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
