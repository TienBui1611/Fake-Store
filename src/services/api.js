// src/services/api.js
// const BASE_URL = 'http://localhost:3000';

// For Android emulator, use:
// const BASE_URL = 'http://10.0.2.2:3000';

// For Expo Go, use:
const BASE_URL = 'http://10.128.219.12:8081';

// Store the JWT token in memory (use AsyncStorage for persistence later)
let authToken = null;

export const setToken = (token) => {
  authToken = token;
};

export const getToken = () => {
  return authToken;
};

export const clearToken = () => {
  authToken = null;
};

// Authenticated fetch function
const fetchWithAuth = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  return data;
};

// Authentication API
export const authAPI = {
  signUp: (name, email, password) => {
    return fetchWithAuth('/users/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  signIn: (email, password) => {
    return fetchWithAuth('/users/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  updateUser: (name, password) => {
    return fetchWithAuth('/users/update', {
      method: 'POST',
      body: JSON.stringify({ name, password }),
    });
  },
};

// Cart API
export const cartAPI = {
  getCart: () => {
    return fetchWithAuth('/cart');
  },

  updateCart: (items) => {
    // Convert items from our Redux format to API format
    const cartItems = items.map(item => ({
      id: item.id,
      price: item.price,
      count: item.quantity, // note the change from quantity to count
    }));

    return fetchWithAuth('/cart', {
      method: 'PUT',
      body: JSON.stringify({ items: cartItems }),
    });
  },
};

// Orders API
export const ordersAPI = {
  getAllOrders: () => {
    return fetchWithAuth('/orders/all');
  },

  createOrder: (items) => {
    // Convert cart items to order items format
    const orderItems = items.map(item => ({
      prodID: item.id,
      price: item.price,
      quantity: item.quantity,
    }));

    return fetchWithAuth('/orders/neworder', {
      method: 'POST',
      body: JSON.stringify({ items: orderItems }),
    });
  },

  updateOrderStatus: (orderID, isPaid, isDelivered) => {
    return fetchWithAuth('/orders/updateorder', {
      method: 'POST',
      body: JSON.stringify({ orderID, isPaid, isDelivered }),
    });
  },
};

// Product API - now fetch from local server instead of fakestoreapi.com
export const productAPI = {
  getCategories: () => {
    return fetchWithAuth('/products/categories');
  },

  getProductsByCategory: (category) => {
    return fetchWithAuth(`/products/category/${category}`);
  },

  getProductDetails: (id) => {
    return fetchWithAuth(`/products/${id}`);
  },
};