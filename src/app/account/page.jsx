"use client"
import React, { useState } from 'react';
import Container from '@/components/Container';
import { HiOutlineLogout, HiOutlineTrash, HiOutlineUserCircle } from 'react-icons/hi';

/* --- Modal Components --- */

// Log Out Popup
const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-[360px] rounded-[32px] p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-center mb-6">
                    <div className="bg-[#1a2b48] p-4 rounded-full text-white">
                        <HiOutlineLogout className="text-3xl" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Log Out</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Are you sure you want to <br /> log out of this device?
                </p>
                <div className="space-y-3">
                    <button 
                        onClick={onConfirm}
                        className="w-full bg-[#1a2b48] text-white font-bold py-3.5 rounded-full hover:bg-[#111e33] transition-colors shadow-md"
                    >
                        Log Out
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full text-gray-900 font-bold py-2 hover:text-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

// Delete Account Popup
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-[380px] rounded-[32px] p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex justify-center mb-6">
                    <div className="bg-[#ff5a5a] p-4 rounded-full text-white shadow-lg shadow-red-200">
                        <HiOutlineTrash className="text-3xl" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-balance leading-tight">
                    Delete Account Permanently
                </h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    This action cannot be undone. All your data and pet information will be permanently deleted. Do you want to continue?
                </p>
                <div className="space-y-3">
                    <button 
                        onClick={onConfirm}
                        className="w-full bg-[#ff5a5a] text-white font-bold py-3.5 rounded-full hover:bg-red-600 transition-colors shadow-md shadow-red-100"
                    >
                        Delete Account
                    </button>
                    <button 
                        onClick={onClose}
                        className="w-full text-gray-900 font-bold py-2 hover:text-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

/* --- Main Page Component --- */

const AccountSettings = () => {
    // State to handle modal visibility
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Placeholder handlers
    const handleLogout = () => {
        console.log("User logged out");
        setShowLogoutModal(false);
    };

    const handleDelete = () => {
        console.log("Account deleted");
        setShowDeleteModal(false);
    };

    return (
        <section className="bg-white h-full p-8">
            <Container>
                {/* Main Settings Card */}
                <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
                    <div className="p-8 md:p-12">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-10">My Account</h1>

                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Left: Profile Picture Section */}
                            <div className="w-full lg:w-1/4 flex flex-col items-center border-r border-gray-100 pr-0 lg:pr-12">
                                <div className="relative group cursor-pointer">
                                    <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300 overflow-hidden">
                                        <HiOutlineUserCircle className="text-6xl text-gray-400" />
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5 rounded-full transition-all" />
                                </div>
                                <button className="mt-4 text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors">
                                    Upload Profile Picture
                                </button>
                            </div>

                            {/* Right: Form Fields Section */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Your Name"
                                        className="w-full px-5 py-3.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:outline-none focus:ring-1 focus:ring-gray-300 text-[15px]"
                                    />
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        placeholder="Enter Your Email Address"
                                        className="w-full px-5 py-3.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:outline-none focus:ring-1 focus:ring-gray-300 text-[15px]"
                                    />
                                </div>

                                {/* Mobile Number with Change CTA */}
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Mobile Number</label>
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            defaultValue="1234567890"
                                            disabled
                                            className="w-full px-5 py-3.5 border border-gray-200 rounded-xl bg-gray-50/50 text-gray-400 text-[15px]"
                                        />
                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                                            Change Number
                                        </button>
                                    </div>
                                </div>

                                {/* Registration Type Info */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center h-full pt-6 md:pt-8 px-1">
                                        <span className="text-sm font-bold text-gray-700">Account Registration Type</span>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mobile Number</p>
                                            <p className="text-sm font-bold text-gray-500">1234567890</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="border-t border-gray-50 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50/30">
                        {/* Log Out Action */}
                        <button 
                            onClick={() => setShowLogoutModal(true)}
                            className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group text-left"
                        >
                            <div className="p-3 bg-gray-50 rounded-xl text-gray-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                <HiOutlineLogout className="text-2xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Log out</h4>
                                <p className="text-xs text-gray-400 mt-0.5">Log out this account on this device</p>
                            </div>
                        </button>

                        {/* Delete Account Action */}
                        <button 
                            onClick={() => setShowDeleteModal(true)}
                            className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group text-left"
                        >
                            <div className="p-3 bg-red-50 rounded-xl text-red-500 transition-colors">
                                <HiOutlineTrash className="text-2xl" />
                            </div>
                            <div>
                                <h4 className="font-bold text-red-500">Delete Account</h4>
                                <p className="text-xs text-gray-400 mt-0.5">Delete Your Account Permanently</p>
                            </div>
                        </button>
                    </div>
                </div>
            </Container>

            {/* Render Popups */}
            <LogoutModal 
                isOpen={showLogoutModal} 
                onClose={() => setShowLogoutModal(false)} 
                onConfirm={handleLogout} 
            />
            <DeleteModal 
                isOpen={showDeleteModal} 
                onClose={() => setShowDeleteModal(false)} 
                onConfirm={handleDelete} 
            />
        </section>
    );
};

export default AccountSettings;