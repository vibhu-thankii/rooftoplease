// ------------------------------------------------------------------
// FILE: src/pages/InvestorDashboard.jsx
// DESC: (UPDATED) Manages state for the new Settings page.
// ------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import DashboardPage from './DashboardPage';
import PortfolioPage from './PortfolioPage';
import MarketplacePage from './MarketplacePage';
import SettingsPage from './SettingsPage'; // Import new page
import ProjectDetailPage from '../components/ProjectDetailPage';
import AdminPanel from '../components/AdminPanel';
import { Loader } from 'lucide-react';

export default function InvestorDashboard({ user }) {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loadingData, setLoadingData] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setDoc(userDocRef, { email: user.email, name: "New Investor", createdAt: new Date(), portfolio: [] });
      }
      setLoadingData(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleSetSelectedProject = (project) => {
      setSelectedProject(project);
      if (project) setActiveTab('marketplace');
  }

  if (loadingData || !userData) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8"><div className="flex items-center justify-center h-full"><Loader className="animate-spin text-amber-500" size={48} /></div></main>
      </div>
    );
  }

  const MainContent = () => {
    if (selectedProject) {
        return <ProjectDetailPage project={selectedProject} user={user} setSelectedProject={handleSetSelectedProject} />;
    }
    switch(activeTab) {
        case 'dashboard': return <DashboardPage portfolio={userData.portfolio} />;
        case 'portfolio': return <PortfolioPage portfolio={userData.portfolio} />;
        case 'marketplace': return <MarketplacePage setSelectedProject={handleSetSelectedProject} />;
        case 'settings': return <SettingsPage user={user} userData={userData} />; // Render Settings page
        case 'admin': return <AdminPanel userId={user.uid} />;
        default: return <DashboardPage portfolio={userData.portfolio} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-slate-100">
        {!selectedProject && activeTab !== 'settings' && <Header user={userData} />}
        <div className="mt-8">
          <MainContent />
        </div>
      </main>
    </div>
  );
}
