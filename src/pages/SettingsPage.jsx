// ------------------------------------------------------------------
// FILE: src/pages/SettingsPage.jsx
// DESC: (DEFINITIVE FIX) Applies robust styling to buttons to ensure correct padding and professional appearance, resolving the "ugly button" glitch.
// ------------------------------------------------------------------
import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage({ user, userData }) {
    // State for profile info
    const [name, setName] = useState(userData.name);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileMessage, setProfileMessage] = useState({ text: '', type: '' });

    // State for password change
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setIsSavingProfile(true);
        setProfileMessage({ text: '', type: '' });

        const userDocRef = doc(db, "users", user.uid);
        try {
            await updateDoc(userDocRef, { name: name });
            setProfileMessage({ text: 'Profile updated successfully!', type: 'success' });
            setTimeout(() => setProfileMessage({ text: '', type: '' }), 3000);
        } catch (error) {
            setProfileMessage({ text: 'Error updating profile.', type: 'error' });
            console.error("Profile update error: ", error);
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMessage({ text: '', type: '' });

        if (newPassword !== confirmNewPassword) {
            setPasswordMessage({ text: "New passwords do not match.", type: 'error' });
            return;
        }
        if (newPassword.length < 6) {
            setPasswordMessage({ text: "Password must be at least 6 characters.", type: 'error' });
            return;
        }

        setIsChangingPassword(true);

        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            
            await updatePassword(user, newPassword);

            setPasswordMessage({ text: 'Password changed successfully!', type: 'success' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setTimeout(() => setPasswordMessage({ text: '', type: '' }), 4000);

        } catch (error) {
            let friendlyError = "An error occurred. Please try again.";
            if (error.code === 'auth/wrong-password') {
                friendlyError = "The current password you entered is incorrect.";
            } else if(error.code === 'auth/too-many-requests') {
                 friendlyError = "Too many attempts. Please try again later.";
            }
            setPasswordMessage({ text: friendlyError, type: 'error' });
            console.error("Password change error: ", error);
        } finally {
            setIsChangingPassword(false);
        }
    };
    
    const Message = ({ message }) => {
        if (!message.text) return null;
        const isSuccess = message.type === 'success';
        const colorClass = isSuccess ? 'text-green-600' : 'text-red-600';
        const Icon = isSuccess ? CheckCircle : AlertCircle;
        return (
            <div className={`flex items-center text-sm font-medium ${colorClass} mr-4`}>
                <Icon size={16} className="mr-1.5" />
                {message.text}
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
                <p className="text-slate-500 mt-1">Manage your profile and security settings.</p>
            </div>

            <div className="space-y-8 mt-8">
                {/* Profile Information Section */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-slate-700 border-b border-slate-200 pb-4">Profile Information</h2>
                    <form onSubmit={handleUpdateProfile} className="mt-6">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-600 mb-1">Full Name</label>
                                <input id="fullName" type="text" value={name} onChange={(e) => setName(e.target.value)} className="block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-1">Email Address</label>
                                <input id="email" type="email" value={userData.email} disabled className="block w-full px-4 py-2 bg-slate-200 border border-slate-300 rounded-lg text-slate-500 cursor-not-allowed" />
                            </div>
                        </div>
                        <div className="flex justify-end items-center pt-6 border-t border-slate-100 mt-8">
                            <div className="flex-grow">
                               <Message message={profileMessage} />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSavingProfile || name === userData.name} 
                                className="inline-flex justify-center items-center whitespace-nowrap text-sm bg-amber-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-700 transition-colors disabled:bg-amber-400 disabled:cursor-not-allowed"
                            >
                                {isSavingProfile ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Password & Security Section */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold text-slate-700 border-b border-slate-200 pb-4">Change Password</h2>
                    <form onSubmit={handlePasswordChange} className="mt-6">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Current Password</label>
                                <div className="relative">
                                   <input type={showCurrentPass ? "text" : "password"} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                                   <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"><EyeOff size={16} className={showCurrentPass ? '' : 'hidden'} /><Eye size={16} className={showCurrentPass ? 'hidden' : ''} /></button>
                                </div>
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">New Password</label>
                                <div className="relative">
                                    <input type={showNewPass ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                                    <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"><EyeOff size={16} className={showNewPass ? '' : 'hidden'} /><Eye size={16} className={showNewPass ? 'hidden' : ''} /></button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-600 mb-1">Confirm New Password</label>
                                <input type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} required className="w-full pl-4 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500" />
                            </div>
                        </div>
                         <div className="flex justify-end items-center pt-6 border-t border-slate-100 mt-8">
                            <div className="flex-grow">
                               <Message message={passwordMessage} />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isChangingPassword || !currentPassword || !newPassword} 
                                className="inline-flex justify-center items-center whitespace-nowrap text-sm bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg hover:bg-slate-800 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                            >
                                {isChangingPassword ? 'Updating...' : 'Update Password'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
