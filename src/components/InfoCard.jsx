// ------------------------------------------------------------------
// FILE: src/components/InfoCard.jsx
// ------------------------------------------------------------------
import React from 'react';

export default function InfoCard({ icon: Icon, label, value }) {
    return (
        <div className="bg-slate-100 p-4 rounded-xl text-center">
            <Icon className="w-8 h-8 mx-auto text-amber-600 mb-2"/>
            <p className="text-sm text-slate-500 font-medium">{label}</p>
            <p className="text-lg font-bold text-slate-800">{value}</p>
        </div>
    );
};