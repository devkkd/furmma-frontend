'use client';

import { useState, useCallback } from 'react';
import { getCurrentLocationString } from '@/lib/geolocation';

export function useGeolocation(defaultLocation = '') {
  const [location, setLocation] = useState(defaultLocation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const addr = await getCurrentLocationString();
      setLocation(addr);
      return addr;
    } catch (e) {
      const isDenied = e.code === 1 || (e.message && /denied|access|permission|secure|https/i.test(e.message));
      const msg = isDenied
        ? 'Location is off. Allow it in your browser, or type your city/area below and click "Use this location".'
        : (e.message || 'Could not get location. Type your city/area below and click "Use this location".');
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const setManualLocation = useCallback((addr) => {
    setLocation(addr || defaultLocation);
    setError(null);
  }, [defaultLocation]);

  return { location, loading, error, fetchCurrentLocation, setLocation: setManualLocation };
}
