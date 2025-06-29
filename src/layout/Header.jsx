// ------------------------------------------------------------------
// FILE: src/layout/Header.jsx
// ------------------------------------------------------------------
import React from 'react';

export default function Header({ user }) {
  return (
    <header className="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Welcome back, {user.name ? user.name.split(' ')[0] : 'Investor'}!</h1>
        <p className="text-slate-500">Here's your portfolio at a glance.</p>
      </div>
      <div className="flex items-center space-x-4"><div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">{user.name ? user.name.charAt(0) : 'I'}</div></div>
    </header>
  );
};