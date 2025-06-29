// ------------------------------------------------------------------
// FILE: src/components/AdminPanel.jsx
// ------------------------------------------------------------------
import React, { useState } from 'react';
import { writeBatch, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { seedData } from '../data/seedData';
import { Database } from 'lucide-react';


export default function AdminPanel({ userId }) {
    const [isSeeding, setIsSeeding] = useState(false);
    const [message, setMessage] = useState('');
    const seedDatabase = async () => {setIsSeeding(true); setMessage('Seeding database... Please wait.'); try {const batch = writeBatch(db); seedData.marketplace.forEach(project => {const projectRef = doc(db, "projects", project.id); batch.set(projectRef, project);}); if (userId) {const userRef = doc(db, "users", userId); batch.update(userRef, { portfolio: seedData.portfolio });} await batch.commit(); setMessage('Database seeded successfully! Your dashboard will now show the sample data.');} catch (error) {console.error("Error seeding database: ", error); setMessage(`Error: ${error.message}`);} finally {setIsSeeding(false);}};
    return (<div className="bg-white p-6 rounded-2xl shadow-lg"><h3 className="text-xl font-semibold text-slate-800">Admin Control Panel</h3><p className="text-slate-500 mt-2">This panel is for demonstration purposes to set up the initial data in Firestore.</p><div className="mt-6"><button onClick={seedDatabase} disabled={isSeeding} className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-400 transition-colors"><Database className="mr-2" size={16}/>{isSeeding ? 'Seeding...' : 'Seed Sample Data'}</button>{message && <p className="mt-4 text-sm text-slate-600">{message}</p>}</div></div>);
}
