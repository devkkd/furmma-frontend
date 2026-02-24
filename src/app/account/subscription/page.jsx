"use client";
import React, { useEffect, useState } from 'react';
import { fetchSubscription, upgradeSubscription } from '@/lib/api';

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription()
      .then((data) => setSubscription(data.subscription))
      .catch(() => setSubscription(null))
      .finally(() => setLoading(false));
  }, []);

  const handleUpgrade = async (plan) => {
    try {
      await upgradeSubscription(plan);
      const data = await fetchSubscription();
      setSubscription(data.subscription);
    } catch (error) {
      console.error('Upgrade failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading subscription...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Subscription</h1>
      
      {subscription ? (
        <div className="bg-white border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Current Plan</h2>
          <p className="text-gray-600 capitalize">{subscription.plan || 'Free'}</p>
          {subscription.expiresAt && (
            <p className="text-sm text-gray-500 mt-2">
              Expires: {new Date(subscription.expiresAt).toLocaleDateString()}
            </p>
          )}
        </div>
      ) : (
        <div className="bg-white border rounded-lg p-6 mb-6">
          <p className="text-gray-600">No active subscription</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Free Plan</h3>
          <p className="text-gray-600 mb-4">Basic features</p>
          <button
            onClick={() => handleUpgrade('free')}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Select Free
          </button>
        </div>

        <div className="border rounded-lg p-6 bg-blue-50">
          <h3 className="text-lg font-semibold mb-2">Premium Plan</h3>
          <p className="text-gray-600 mb-4">All features unlocked</p>
          <button
            onClick={() => handleUpgrade('premium')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
}
