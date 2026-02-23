/**
 * Web API client – backend integration
 */
const getBaseUrl = () =>
  (typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL) || 'http://localhost:5000/api';

export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token') || localStorage.getItem('authToken') || null;
}

export function setToken(token) {
  if (typeof window === 'undefined') return;
  if (token) localStorage.setItem('token', token);
  else {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
  }
}

/** Send OTP to phone – backend (Mongo) OTP */
export async function sendOtp(phone) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/auth/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone: phone.replace(/\D/g, '').slice(-10) }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
  return data;
}

/** Verify OTP and login – returns { token, user } */
export async function verifyOtp(phone, otp, name) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: phone.replace(/\D/g, '').slice(-10),
      otp: otp.toString().trim(),
      name: name || undefined,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Invalid OTP');
  return data;
}

/** Get current user (protected) – for /account and after refresh */
export async function fetchMe() {
  const base = getBaseUrl();
  const res = await fetch(`${base}/auth/me`, { headers: authHeaders() });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(data.message || 'Failed to load user');
  return data.user;
}

/** Update user profile (name, email, phone) */
export async function updateProfile(body) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/users/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(data.message || 'Failed to update profile');
  return data.user;
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Fetch products from backend */
export async function fetchProducts(params = {}) {
  const base = getBaseUrl();
  const q = new URLSearchParams();
  if (params.category) q.set('category', params.category);
  if (params.petType) q.set('petType', params.petType);
  if (params.age) q.set('age', params.age);
  if (params.search) q.set('search', params.search);
  if (params.sortBy) q.set('sortBy', params.sortBy);
  if (params.minRating != null) q.set('minRating', params.minRating);
  if (params.minPrice != null) q.set('minPrice', params.minPrice);
  if (params.maxPrice != null) q.set('maxPrice', params.maxPrice);
  const url = `${base}/products${q.toString() ? `?${q}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Products fetch failed');
  const data = await res.json();
  return data.products || [];
}

/** Fetch single product by ID */
export async function fetchProductById(id) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/products/${id}`);
  if (!res.ok) throw new Error('Product not found');
  const data = await res.json();
  return data.product;
}

/** Normalize backend product to UI shape (ProductCard, detail page) */
export function normalizeProduct(p) {
  if (!p) return null;
  const price = p.discountPrice ?? p.price ?? 0;
  const oldPrice = p.discountPrice ? p.price : undefined;
  const petTypeArr = Array.isArray(p.petType) ? p.petType : [p.petType].filter(Boolean);
  return {
    ...p,
    id: p._id || p.id,
    _id: p._id,
    name: p.name || 'Product',
    price,
    oldPrice,
    image: (p.images && p.images[0]) || p.image || '/images/products/p1.png',
    images: p.images || [],
    petType: petTypeArr,
  };
}

/** Fetch vet service types (categories for filter) – public */
export async function fetchVetServiceTypes() {
  const base = getBaseUrl();
  const res = await fetch(`${base}/vet-service-types`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.types || [];
}

/** Fetch veterinarians from backend (serviceType = filter by type set in Manage Veterinarians) */
export async function fetchVeterinarians(params = {}) {
  const base = getBaseUrl();
  const q = new URLSearchParams();
  if (params.category) q.set('category', params.category);
  if (params.city) q.set('city', params.city);
  if (params.specialization) q.set('specialization', params.specialization);
  if (params.serviceType && params.serviceType !== 'All') q.set('serviceType', params.serviceType);
  const url = `${base}/veterinarians${q.toString() ? `?${q}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Veterinarians fetch failed');
  const data = await res.json();
  return data.veterinarians || [];
}

/** Fetch service providers from backend */
export async function fetchServiceProviders(params = {}) {
  const base = getBaseUrl();
  const q = new URLSearchParams();
  if (params.serviceType) q.set('serviceType', params.serviceType);
  const url = `${base}/service-providers${q.toString() ? `?${q}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Service providers fetch failed');
  const data = await res.json();
  return data.providers || [];
}

/** Fetch cremation centers from backend */
export async function fetchCremationCenters(params = {}) {
  const base = getBaseUrl();
  const q = new URLSearchParams();
  if (params.city) q.set('city', params.city);
  if (params.state) q.set('state', params.state);
  if (params.search) q.set('search', params.search);
  const url = `${base}/cremation/centers${q.toString() ? `?${q}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Cremation centers fetch failed');
  const data = await res.json();
  return data.centers || [];
}

/** Fetch training videos from backend */
export async function fetchTrainingVideos(params = {}) {
  const base = getBaseUrl();
  const q = new URLSearchParams();
  if (params.category) q.set('category', params.category);
  if (params.petType) q.set('petType', params.petType);
  if (params.level) q.set('level', params.level);
  const url = `${base}/training-videos${q.toString() ? `?${q}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Training videos fetch failed');
  const data = await res.json();
  return data.videos || [];
}

/** Get user's training progress (completed video IDs). Requires auth. */
export async function fetchTrainingProgress(params = {}) {
  const base = getBaseUrl();
  const q = new URLSearchParams();
  if (params.category) q.set('category', params.category);
  const url = `${base}/training-progress${q.toString() ? `?${q}` : ''}`;
  try {
    const res = await fetch(url, { headers: authHeaders() });
    if (res.status === 401) return { completedVideoIds: [], byCategory: {} };
    if (!res.ok) throw new Error('Progress fetch failed');
    const data = await res.json();
    return { completedVideoIds: data.completedVideoIds || [], byCategory: data.byCategory || {} };
  } catch {
    return { completedVideoIds: [], byCategory: {} };
  }
}

/** Mark a video as complete. Requires auth. */
export async function markTrainingProgressComplete({ videoId, category }) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/training-progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ videoId, category: category || 'basic' }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to mark complete');
  }
  return res.json();
}

/** Fetch single training video by ID */
export async function fetchTrainingVideoById(id) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/training-videos/${id}`);
  if (!res.ok) throw new Error('Training video not found');
  const data = await res.json();
  return data.video;
}

/** Fetch Hope posts (lost & found / adoption). */
export async function fetchHopePosts(params = {}) {
  const base = getBaseUrl();
  const q = new URLSearchParams();
  if (params.postType) q.set('postType', params.postType);
  if (params.petType) q.set('petType', params.petType);
  if (params.location) q.set('location', params.location);
  if (params.search) q.set('search', params.search);
  if (params.page != null) q.set('page', params.page);
  if (params.limit != null) q.set('limit', params.limit);
  const url = `${base}/hope/posts${q.toString() ? `?${q}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Hope posts fetch failed');
  const data = await res.json();
  return data.posts || [];
}

/** Get user subscription. Requires auth. */
export async function fetchSubscription() {
  const base = getBaseUrl();
  const res = await fetch(`${base}/subscription`, { headers: authHeaders() });
  if (res.status === 401) return { subscription: null };
  if (!res.ok) throw new Error('Subscription fetch failed');
  const data = await res.json();
  return { subscription: data.subscription };
}

/** Upgrade subscription plan. Requires auth. */
export async function upgradeSubscription(plan) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/subscription/upgrade`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ plan: plan || 'free' }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Upgrade failed');
  }
  return res.json();
}

/** Fetch pet events (public). city optional. */
export async function fetchPetEvents(params = {}) {
  const base = getBaseUrl();
  const q = new URLSearchParams();
  if (params.city && params.city !== 'All') q.set('city', params.city);
  if (params.search) q.set('search', params.search);
  const url = `${base}/pet-events${q.toString() ? `?${q}` : ''}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Pet events fetch failed');
  const data = await res.json();
  return data.events || [];
}

/** Register for a pet event (public). */
export async function registerPetEvent(eventId, { name, email, phone, notes }) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/pet-events/${eventId}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: name?.trim(), email: email?.trim(), phone: phone?.trim(), notes: notes?.trim() || undefined }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}
