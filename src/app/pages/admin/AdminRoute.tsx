import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, authLoading } = useApp();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
