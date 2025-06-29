// ------------------------------------------------------------------
// FILE: src/components/MarketplaceCard.jsx
// DESC: (FIXED) Uses a reliable placeholder service to prevent image loops.
// ------------------------------------------------------------------
import React from 'react';
import { MapPin, Zap, Sun } from 'lucide-react';

export default function MarketplaceCard({ item, setSelectedProject }) {
    const handleImageError = (e) => {
        e.target.onerror = null; 
        const placeholderText = item.name.replace(/\s/g, '+');
        // This is a reliable placeholder service that will always work.
        e.target.src = `https://placehold.co/600x400/e2e8f0/475569?text=${placeholderText}`;
    };
    
    return (
        <div className="bg-white rounded-2xl shadow-lg flex flex-col justify-between border-t-4 border-amber-400 overflow-hidden">
            <img 
                src={item.imageUrl} 
                onError={handleImageError} 
                alt={item.name} 
                className="w-full h-40 object-cover bg-slate-200"
            />
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-800 leading-tight">{item.name}</h3>
                    <div className="flex-shrink-0 flex items-center text-sm bg-slate-100 text-slate-600 font-medium px-2 py-1 rounded-full">
                        <MapPin size={14} className="mr-1.5" />
                        {item.city}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-slate-500">Share Price</p>
                        <p className="font-bold text-slate-800 mt-1">₹{item.sharePrice.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg">
                        <p className="text-slate-500">Expected ROI</p>
                        <p className="font-bold text-green-600 mt-1">{item.expectedRoi}% p.a.</p>
                    </div>
                </div>
                <div className="mt-6">
                    <button onClick={() => setSelectedProject(item)} className="w-full bg-amber-600 text-white font-semibold py-3 rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">View Project & Invest</button>
                </div>
            </div>
        </div>
    );
};
