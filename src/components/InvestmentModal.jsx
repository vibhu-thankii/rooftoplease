// ------------------------------------------------------------------
// FILE: src/components/InvestmentModal.jsx
// ------------------------------------------------------------------
import React, { useState } from 'react';
import { doc, getDoc, writeBatch, arrayUnion } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { X, Loader, AlertCircle, CheckCircle } from 'lucide-react';

export default function InvestmentModal({ isOpen, onClose, project, investmentAmount, user, onSuccess }) {
    const [isInvesting, setIsInvesting] = useState(false);
    const [message, setMessage] = useState('');

    const handleConfirmInvest = async () => {
        setIsInvesting(true);
        setMessage('');

        try {
            const userDocRef = doc(db, "users", user.uid);
            const projectDocRef = doc(db, "projects", project.id);

            const projectSnap = await getDoc(projectDocRef);
            if (!projectSnap.exists() || projectSnap.data().availableShares < investmentAmount) {
                throw new Error("Sorry, the selected number of shares are no longer available.");
            }

            const newPortfolioItem = {
                id: `${project.id}_P${Math.floor(1000 + Math.random() * 9000)}`,
                projectName: project.name,
                panelId: `${project.id.split('_')[0]}-P${projectSnap.data().totalCapacity * 2 - projectSnap.data().availableShares + 1}`,
                investment: project.sharePrice * investmentAmount,
                status: 'Active',
                dailyGeneration: [ { hour: '08:00', value: 0 }, { hour: '10:00', value: 0 }, { hour: '12:00', value: 0 }, { hour: '14:00', value: 0 }, { hour: '16:00', value: 0 }, { hour: '18:00', value: 0 } ],
                totalSavings: 0,
                lifetimeGeneration: 0,
                roi: project.expectedRoi,
                purchaseDate: new Date(),
            };
            
            const batch = writeBatch(db);
            batch.update(userDocRef, { portfolio: arrayUnion(newPortfolioItem) });
            batch.update(projectDocRef, { availableShares: projectSnap.data().availableShares - investmentAmount });
            
            await batch.commit();

            setMessage('Investment successful! Your portfolio has been updated.');
            setTimeout(() => {
                onSuccess();
            }, 2000);

        } catch (error) {
            console.error("Investment Error: ", error);
            setMessage(`Investment failed: ${error.message}`);
            setIsInvesting(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"><X size={24} /></button>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Confirm Your Investment</h2>
                    <p className="text-slate-500 mt-2">You are about to invest in the {project.name} project.</p>
                </div>

                <div className="mt-6 bg-slate-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between text-slate-700"><span>Project:</span> <span className="font-semibold">{project.name}</span></div>
                    <div className="flex justify-between text-slate-700"><span>Number of Shares:</span> <span className="font-semibold">{investmentAmount}</span></div>
                    <div className="flex justify-between text-slate-700 border-t pt-3 mt-3">
                        <span className="font-bold text-lg">Total Amount:</span>
                        <span className="font-extrabold text-lg text-slate-800">₹{(project.sharePrice * investmentAmount).toLocaleString('en-IN')}</span>
                    </div>
                </div>

                {message ? (
                     <div className={`text-center mt-6 p-4 rounded-lg text-sm font-medium ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {message.includes('success') ? <CheckCircle className="inline w-5 h-5 mr-2"/> : <AlertCircle className="inline w-5 h-5 mr-2"/>}
                        {message}
                    </div>
                ) : (
                    <div className="mt-8 flex gap-4">
                        <button onClick={onClose} disabled={isInvesting} className="flex-1 bg-slate-200 text-slate-700 font-semibold py-3 rounded-lg hover:bg-slate-300 transition-colors">Cancel</button>
                        <button onClick={handleConfirmInvest} disabled={isInvesting} className="flex-1 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400">
                            {isInvesting ? <Loader className="animate-spin mx-auto" size={24}/> : 'Confirm Investment'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};