// ------------------------------------------------------------------
// FILE: src/components/ProjectDetailPage.jsx
// DESC: (FIXED) Uses a reliable placeholder service to prevent image loops.
// ------------------------------------------------------------------
import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Zap, Sun, Calendar, MapPin } from 'lucide-react';
import InfoCard from './InfoCard';
import InvestmentModal from './InvestmentModal';

export default function ProjectDetailPage({ project, user, setSelectedProject }) {
    const [investmentAmount, setInvestmentAmount] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleImageError = (e) => {
        e.target.onerror = null; 
        const placeholderText = project.name.replace(/\s/g, '+');
        // This is a reliable placeholder service that will always work.
        e.target.src = `https://placehold.co/800x400/e2e8f0/475569?text=${placeholderText}`;
    };
    
    return (
        <div className="max-w-5xl mx-auto">
             <button onClick={() => setSelectedProject(null)} className="flex items-center text-slate-600 hover:text-slate-900 font-semibold mb-6">
                <ArrowLeft size={18} className="mr-2" />
                Back to Marketplace
            </button>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <img 
                    src={project.imageUrl} 
                    onError={handleImageError} 
                    alt={project.name} 
                    className="w-full h-64 object-cover bg-slate-200" 
                />
                <div className="p-8">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                            <h2 className="text-4xl font-extrabold text-slate-800">{project.name}</h2>
                            <div className="flex items-center text-slate-500 mt-2">
                                <MapPin size={16} className="mr-2"/>
                                {project.city}
                            </div>
                        </div>
                         <div className="bg-amber-100 text-amber-800 text-lg font-bold px-4 py-2 rounded-lg">
                            {project.availableShares} Shares Left
                        </div>
                    </div>
                    <p className="mt-4 text-slate-600 max-w-2xl">{project.description}</p>
                    
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <InfoCard label="Share Price" value={`₹${project.sharePrice.toLocaleString('en-IN')}`} icon={DollarSign} />
                        <InfoCard label="Expected ROI" value={`${project.expectedRoi}% p.a.`} icon={Zap} />
                        <InfoCard label="Total Capacity" value={`${project.totalCapacity} kW`} icon={Sun} />
                        <InfoCard label="Project Term" value="15 Years" icon={Calendar} />
                    </div>

                    <div className="mt-10 pt-8 border-t border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-800 text-center">Make Your Investment</h3>
                        <div className="mt-6 max-w-md mx-auto bg-slate-50 p-6 rounded-2xl">
                             <div className="flex items-center justify-between">
                                <label className="font-semibold text-slate-700">Number of Shares:</label>
                                <div className="flex items-center space-x-2">
                                    <button onClick={() => setInvestmentAmount(Math.max(1, investmentAmount - 1))} className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300">-</button>
                                    <input type="text" readOnly value={investmentAmount} className="w-16 text-center font-bold text-lg bg-transparent border-none focus:ring-0"/>
                                    <button onClick={() => setInvestmentAmount(Math.min(project.availableShares, investmentAmount + 1))} className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 hover:bg-slate-300">+</button>
                                </div>
                            </div>
                            <div className="mt-4 text-center bg-white p-4 rounded-lg">
                                <p className="text-slate-500">Total Investment</p>
                                <p className="text-4xl font-extrabold text-slate-800 mt-1">₹{(project.sharePrice * investmentAmount).toLocaleString('en-IN')}</p>
                            </div>
                            <button onClick={() => setIsModalOpen(true)} className="mt-6 w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition-colors">
                                Invest Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <InvestmentModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                project={project}
                investmentAmount={investmentAmount}
                user={user}
                onSuccess={() => {
                    setIsModalOpen(false);
                    setSelectedProject(null);
                }}
            />
        </div>
    );
};
