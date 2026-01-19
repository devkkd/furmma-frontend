"use client"
import React, { useState } from 'react';

const ShareFeedback = () => {
    // State management for form fields
    const [formData, setFormData] = useState({
        name: 'John Deo',
        email: 'johndeo@gmail.com',
        feedbackType: 'Bug Report',
        message: ''
    });

    // Types of feedback available
    const feedbackTypes = ["Bug Report", "Feature Request", "App Experience"];

    // Validation logic: Button is disabled if name, email, or message is empty
    const isFormEmpty = !formData.name.trim() || !formData.email.trim() || !formData.message.trim();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm min-h-[600px]">
            {/* Header */}
            <header className="mb-10">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Share Feedback</h1>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Help us improve your experience</h2>
                <p className="text-gray-500 text-sm max-w-3xl leading-relaxed">
                    We value your input. Share your thoughts, report an issue, or suggest new features 
                    to help us make Furrmaa better for you and your pets.
                </p>
            </header>

            <div className="space-y-8">
                {/* Name and Email Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Your Name</label>
                        <input 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full px-5 py-3.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:outline-none focus:ring-1 focus:ring-gray-300 text-[15px]"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full px-5 py-3.5 border border-gray-200 rounded-xl bg-gray-50/30 focus:outline-none focus:ring-1 focus:ring-gray-300 text-[15px]"
                        />
                    </div>
                </div>

                {/* Feedback Type Selector */}
                <div className="space-y-4">
                    <label className="text-sm font-bold text-gray-700 ml-1">Feedback Type</label>
                    <div className="flex flex-wrap gap-3">
                        {feedbackTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setFormData(prev => ({ ...prev, feedbackType: type }))}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all
                                    ${formData.feedbackType === type 
                                        ? 'bg-[#1e293b] text-white shadow-md' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feedback Message Area */}
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Your Feedback</label>
                    <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Tell us what happened or how we can improve..."
                        className="w-full px-5 py-4 border border-gray-200 rounded-2xl bg-gray-50/30 focus:outline-none focus:ring-1 focus:ring-gray-200 text-[15px] resize-none"
                    />
                </div>

                {/* Submit Button with conditional logic */}
                <div className="flex justify-center pt-4">
                    <button
                        disabled={isFormEmpty}
                        className={`px-12 py-4 rounded-full font-bold text-white transition-all flex items-center gap-2
                            ${isFormEmpty 
                                ? 'bg-gray-300 cursor-not-allowed opacity-70' 
                                : 'bg-[#1e293b] hover:bg-[#0f172a] shadow-lg active:scale-95'}`}
                    >
                        Submit Feedback ➔
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareFeedback;