// ------------------------------------------------------------------
// FILE: src/pages/AuthScreen.jsx
// DESC: Handles both Login and Sign Up for users.
// ------------------------------------------------------------------
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AuthScreen() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleAuthAction = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLoginView) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email: userCredential.user.email,
                    name: name || "New Investor",
                    createdAt: new Date(),
                    portfolio: [],
                });
            }
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'}}>
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <div className="inline-block"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 7L12 12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22V12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 7L12 12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 4.5L7 9.5" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                    <h1 className="text-3xl font-bold text-gray-900 mt-2">Welcome to RooftopLease</h1>
                    <p className="text-gray-500">{isLoginView ? 'Sign in to access your portfolio.' : 'Create an account to start investing.'}</p>
                </div>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative text-sm" role="alert"><AlertCircle className="inline w-4 h-4 mr-2"/>{error}</div>}
                <form className="space-y-4" onSubmit={handleAuthAction}>
                     {!isLoginView && (<div><label className="text-sm font-medium text-gray-700">Full Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="Priya Singh"/></div>)}
                    <div><label className="text-sm font-medium text-gray-700">Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="you@example.com"/></div>
                    <div><label className="text-sm font-medium text-gray-700">Password</label><div className="relative"><input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500" placeholder="••••••••"/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></div>
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-400">{isLoading ? 'Processing...' : (isLoginView ? 'Sign In' : 'Create Account')}</button>
                </form>
                <p className="text-center text-sm text-gray-600">{isLoginView ? "Don't have an account?" : "Already have an account?"}<button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-amber-600 hover:text-amber-500 ml-1">{isLoginView ? 'Sign Up' : 'Sign In'}</button></p>
            </div>
        </div>
    );
}
