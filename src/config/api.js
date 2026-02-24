// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API endpoints helper
export const API_ENDPOINTS = {
  // Add your endpoints here
  // Example:
  // products: `${API_BASE_URL}/products`,
  // orders: `${API_BASE_URL}/orders`,
  // auth: `${API_BASE_URL}/auth`,
};

// Fetch wrapper with error handling
export const apiClient = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};
