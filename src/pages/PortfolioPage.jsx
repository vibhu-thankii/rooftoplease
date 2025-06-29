// ------------------------------------------------------------------
// FILE: src/pages/PortfolioPage.jsx
// ------------------------------------------------------------------
import React from 'react';
import PortfolioCard from '../components/PortfolioCard';

export default function PortfolioPage({ portfolio = [] }) {
    return (<div><h2 className="text-2xl font-bold text-slate-800 mb-6">My Portfolio ({portfolio.length} Shares)</h2>{portfolio.length > 0 ? (<div className="space-y-6">{portfolio.map(item => <PortfolioCard key={item.id} item={item} />)}</div>) : (<div className="text-center py-16 bg-white rounded-2xl shadow-lg"><h3 className="text-xl font-semibold text-slate-700">Your portfolio is empty.</h3><p className="text-slate-500 mt-2">Invest in your first Solar Share from the Marketplace to see it here.</p></div>)}</div>);
};