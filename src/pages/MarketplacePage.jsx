// ------------------------------------------------------------------
// FILE: src/pages/MarketplacePage.jsx
// ------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import MarketplaceCard from '../components/MarketplaceCard';
import { Search, Loader } from 'lucide-react';

export default function MarketplacePage({ setSelectedProject }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [marketplaceItems, setMarketplaceItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {const q = query(collection(db, "projects"), where("status", "==", "available")); const unsubscribe = onSnapshot(q, (querySnapshot) => {const projects = []; querySnapshot.forEach((doc) => { projects.push({ id: doc.id, ...doc.data() });}); setMarketplaceItems(projects); setLoading(false);}); return () => unsubscribe();}, []);
    const filteredItems = marketplaceItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.city.toLowerCase().includes(searchTerm.toLowerCase()));
    return (<div><div className="mb-6"><h2 className="text-3xl font-bold text-slate-800">Marketplace</h2><p className="text-slate-500 mt-1">Browse available rooftops and invest in your next Solar Share.</p></div><div className="relative mb-6"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} /><input type="text" placeholder="Search by project name or city..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full shadow-sm focus:ring-amber-500 focus:border-amber-500"/></div>{loading ? <div className="text-center py-16"><Loader className="animate-spin text-amber-500 mx-auto" size={32}/></div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredItems.map(item => <MarketplaceCard key={item.id} item={item} setSelectedProject={setSelectedProject} />)}</div>}{!loading && filteredItems.length === 0 && (<div className="text-center py-16 bg-white rounded-2xl shadow-lg"><h3 className="text-xl font-semibold text-slate-700">No projects found</h3><p className="text-slate-500 mt-2">Try adjusting your search terms. New projects are added regularly!</p></div>)}</div>);
};
