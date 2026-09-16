import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Home, User, Trophy, Camera, LogOut, GraduationCap, KeyRound } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { toast } from 'sonner';
import { uploadAvatar, changePassword, signOut } from '../services/dataService';

export default function Profile() {
  const navigate = useNavigate();
  const { user, profileImage, setProfileImage, setUser, setMonthlyProgress, completedQuests } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadAvatar(file);
    setUploading(false);

    if (url) {
      setProfileImage(url);
      toast.success('Profile photo updated');
    } else {
      toast.error('Could not upload photo', {
        description: 'Please try again.',
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setMonthlyProgress(0);
    navigate('/');
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setChangingPassword(true);
    const success = await changePassword(newPassword);
    setChangingPassword(false);

    if (success) {
      toast.success('Password updated');
      setShowPasswordDialog(false);
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast.error('Could not update password', {
        description: 'Please try again.',
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      <div className="flex-1 px-4 py-6 pb-24">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-center text-amber-400 mb-8">Profile</h1>

          {user.mustResetPassword && (
            <div className="mb-6 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg text-xs text-orange-300">
              An administrator reset your password. Please set a new password below.
            </div>
          )}

          <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-amber-500/20 p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-4 border-amber-500 transition-all duration-300 group-hover:scale-105">
                  <AvatarImage src={profileImage} alt={user?.name || 'User'} />
                  <AvatarFallback className="bg-slate-700 text-amber-400 text-3xl">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="absolute bottom-0 right-0 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 disabled:opacity-50"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {uploading ? 'Uploading...' : 'Click camera to change photo'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-b border-slate-700 pb-3">
                <p className="text-sm text-slate-400">Name</p>
                <p className="text-lg font-semibold text-slate-100">{user?.name || 'N/A'}</p>
              </div>

              <div className="border-b border-slate-700 pb-3">
                <p className="text-sm text-slate-400">School</p>
                <p className="text-lg font-semibold text-slate-100">{user?.course || 'N/A'}</p>
              </div>

              <div className="border-b border-slate-700 pb-3">
                <p className="text-sm text-slate-400">Year</p>
                <p className="text-lg font-semibold text-slate-100">{user?.year || 'N/A'}</p>
              </div>

              <div className="border-b border-slate-700 pb-3">
                <p className="text-sm text-slate-400">Subject</p>
                <p className="text-lg font-semibold text-slate-100">{user?.subject || 'N/A'}</p>
              </div>

              <div className="pb-3">
                <p className="text-sm text-slate-400">Section</p>
                <p className="text-lg font-semibold text-slate-100">{user?.section || 'N/A'}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-amber-400">{completedQuests.length}</p>
                <p className="text-xs text-slate-400 mt-1">Quests Completed</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-amber-400">{Math.floor(completedQuests.length / 4)}</p>
                <p className="text-xs text-slate-400 mt-1">Days Completed</p>
              </div>
            </div>

            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full mt-6 border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition-all duration-300"
                >
                  <KeyRound className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-amber-500/30">
                <DialogHeader>
                  <DialogTitle className="text-amber-400">Change Password</DialogTitle>
                  <DialogDescription className="sr-only">Set a new password for your account</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-2">
                  <div>
                    <Label className="text-slate-300">New Password</Label>
                    <Input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                      placeholder="At least 6 characters"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Confirm Password</Label>
                    <Input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 bg-slate-700/50 border-slate-600 text-slate-100"
                    />
                  </div>
                  <Button
                    onClick={handleChangePassword}
                    disabled={changingPassword}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900"
                  >
                    {changingPassword ? 'Updating...' : 'Update Password'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full mt-3 border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all duration-300"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-amber-500/20">
        <div className="max-w-md mx-auto flex justify-around items-center h-20">
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/home')}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs">Home</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/profile')}
          >
            <User className="h-6 w-6" />
            <span className="text-xs">Profile</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/grades')}
          >
            <GraduationCap className="h-6 w-6" />
            <span className="text-xs">Grades</span>
          </Button>
          <Button
            variant="ghost"
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-300 hover:scale-110"
            onClick={() => navigate('/quest')}
          >
            <Trophy className="h-6 w-6" />
            <span className="text-xs">Quest</span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
