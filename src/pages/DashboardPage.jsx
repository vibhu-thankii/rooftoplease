// ------------------------------------------------------------------
// FILE: src/pages/DashboardPage.jsx
// ------------------------------------------------------------------
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, Zap, BarChart2 } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function DashboardPage({ portfolio = [] }) {
    const totalInvestment = portfolio.reduce((sum, item) => sum + item.investment, 0);
    const totalSavings = portfolio.reduce((sum, item) => sum + item.totalSavings, 0);
    const avgROI = portfolio.length > 0 ? portfolio.reduce((sum, item) => sum + item.roi, 0) / portfolio.length : 0;
    const combinedGenerationData = portfolio.length > 0 && portfolio[0]?.dailyGeneration ? portfolio[0].dailyGeneration.map((point, index) => {let totalValue = 0; portfolio.forEach(p => {totalValue += p.dailyGeneration?.[index]?.value || 0;}); return { hour: point.hour, 'Energy (Wh)': totalValue };}) : [];
    return (<div className="space-y-8"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><StatCard icon={DollarSign} title="Total Investment" value={`₹${totalInvestment.toLocaleString('en-IN')}`} color="blue" /><StatCard icon={Zap} title="Total Savings" value={`₹${totalSavings.toLocaleString('en-IN')}`} color="green" /><StatCard icon={BarChart2} title="Average ROI" value={`${avgROI.toFixed(2)}%`} color="amber" /></div><div className="bg-white p-6 rounded-2xl shadow-lg"><h3 className="text-xl font-semibold text-slate-800 mb-4">Portfolio Live Generation (Last 24h)</h3>{portfolio.length > 0 ? (<div style={{ height: '350px' }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={combinedGenerationData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}><defs><linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/><stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 12 }} /><YAxis tick={{ fill: '#64748b', fontSize: 12 }} label={{ value: 'Wh', angle: -90, position: 'insideLeft', fill: '#64748b' }}/><Tooltip contentStyle={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}/><Legend /><Area type="monotone" dataKey="Energy (Wh)" stroke="#f59e0b" fillOpacity={1} fill="url(#colorUv)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div>) : (<div className="text-center py-10 text-slate-500">You don't have any active solar shares yet. Visit the Marketplace to start investing!</div>)}</div></div>);
};
