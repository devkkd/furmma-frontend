/**
 * Get current position via browser Geolocation API
 */
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator?.geolocation) {
      reject(new Error('Geolocation is not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  });
}

/**
 * Reverse geocode lat/lng to address using OpenStreetMap Nominatim (free, no API key)
 */
export async function reverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
  const res = await fetch(url, {
    headers: { 'Accept-Language': 'en' },
  });
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  const addr = data.address || {};
  const parts = [
    addr.suburb || addr.neighbourhood || addr.locality,
    addr.city || addr.town || addr.village || addr.county,
    addr.state,
  ].filter(Boolean);
  return parts.join(', ') || data.display_name || `${lat}, ${lng}`;
}

/**
 * Get current location as readable address string
 */
export async function getCurrentLocationString() {
  const { lat, lng } = await getCurrentPosition();
  return reverseGeocode(lat, lng);
}
