// ------------------------------------------------------------------
// FILE: src/App.jsx
// DESC: Main application component, handles routing and auth state.
// ------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import InvestorDashboard from './pages/InvestorDashboard';
import AuthScreen from './pages/AuthScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100"><div className="text-xl font-semibold">Loading RooftopLease...</div></div>;
  }

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      {user ? <InvestorDashboard user={user} /> : <AuthScreen />}
    </div>
  );
}
