// ------------------------------------------------------------------
// FILE: src/components/StatCard.jsx
// ------------------------------------------------------------------
import React from 'react';

export default function StatCard({ icon: Icon, title, value, color }) {
    const colors = { blue: 'bg-blue-100 text-blue-600', green: 'bg-green-100 text-green-600', amber: 'bg-amber-100 text-amber-600' };
    return (<div className="bg-white p-6 rounded-2xl shadow-lg flex items-center space-x-4"><div className={`p-4 rounded-full ${colors[color]}`}><Icon className="w-8 h-8" /></div><div><p className="text-slate-500 text-sm font-medium">{title}</p><p className="text-2xl font-bold text-slate-800">{value}</p></div></div>);
};