// ------------------------------------------------------------------
// FILE: src/layout/Sidebar.jsx
// DESC: (UPDATED) Adds a new link for the Settings page.
// ------------------------------------------------------------------
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { BarChart2, Briefcase, Building, Database, LogOut, Settings } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
    const handleSignOut = () => { signOut(auth).catch(error => console.error("Sign out error", error)); };
    const navItems = [
        { id: 'dashboard', name: 'Dashboard', icon: BarChart2 },
        { id: 'portfolio', name: 'My Portfolio', icon: Briefcase },
        { id: 'marketplace', name: 'Marketplace', icon: Building },
        { id: 'settings', name: 'Settings', icon: Settings }, // New settings item
    ];
    return (
        <aside className="w-20 lg:w-64 bg-white shadow-md flex flex-col transition-all duration-300">
            <div className="p-4 border-b h-20 flex items-center justify-center lg:justify-start">
                <div className="w-10 h-10 lg:w-12 lg:h-12"><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 7L12 12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22V12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 7L12 12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <span className="hidden lg:inline text-2xl font-bold ml-2 text-slate-800">RooftopLease</span>
            </div>
            <nav className="flex-1 mt-6">
                <ul>{navItems.map(item => (<li key={item.id} className="px-4 mb-2"><button onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-center lg:justify-start py-3 px-4 rounded-lg transition-colors ${activeTab === item.id ? 'bg-amber-100 text-amber-800' : 'text-slate-600 hover:bg-slate-100'}`}><item.icon className="h-6 w-6" /><span className="hidden lg:inline ml-4 font-medium">{item.name}</span></button></li>))}</ul>
            </nav>
            <div className="p-4 border-t"><button onClick={() => setActiveTab('admin')} className="w-full flex items-center justify-center lg:justify-start py-3 px-4 rounded-lg text-slate-600 hover:bg-slate-100 mb-2"><Database className="h-6 w-6" /><span className="hidden lg:inline ml-4 font-medium">Admin Panel</span></button><button onClick={handleSignOut} className="w-full flex items-center justify-center lg:justify-start py-3 px-4 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors"><LogOut className="h-6 w-6" /><span className="hidden lg:inline ml-4 font-medium">Logout</span></button></div>
        </aside>
    );
};