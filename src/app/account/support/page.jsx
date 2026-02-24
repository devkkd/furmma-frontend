"use client";
import React, { useState } from 'react';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send to backend
    console.log('Support request:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Support</h1>
      
      <div className="bg-white border rounded-lg p-6 max-w-2xl">
        {submitted ? (
          <div className="text-center py-8">
            <p className="text-green-600 font-semibold mb-2">Request Submitted!</p>
            <p className="text-gray-600">We'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border rounded px-3 py-2 h-32"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
        <div className="space-y-2 text-gray-600">
          <p>Email: support@furrmaa.com</p>
          <p>Phone: +91 1234567890</p>
        </div>
      </div>
    </div>
  );
}
