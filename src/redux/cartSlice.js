// src/redux/cartSlice.js (update)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { cartAPI, ordersAPI } from '../services/api';

// Fetch cart from server
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.getCart();
      if (response.status === 'OK') {
        // Convert cart items from API format to Redux format
        return response.items.map(item => ({
          id: item.id,
          price: item.price,
          quantity: item.count, // API uses "count", we use "quantity"
          totalPrice: item.price * item.count
        }));
      } else {
        return rejectWithValue(response.message || 'Failed to fetch cart');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Sync cart with server
export const syncCart = createAsyncThunk(
  'cart/syncCart',
  async (items, { rejectWithValue }) => {
    try {
      const response = await cartAPI.updateCart(items);
      if (response.status === 'OK') {
        return true;
      } else {
        return rejectWithValue(response.message || 'Failed to sync cart');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Checkout (create order from cart)
export const checkout = createAsyncThunk(
  'cart/checkout',
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const { cart } = getState();
      
      // Create order with cart items
      const response = await ordersAPI.createOrder(cart.items);
      
      if (response.status === 'OK') {
        // Clear cart on server after successful order
        await cartAPI.updateCart([]);
        return response.id;
      } else {
        return rejectWithValue(response.message || 'Checkout failed');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Keep your existing reducers
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);

      if (!existingItem) {
        // Add new item with quantity 1
        state.items.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        // Increase quantity of existing item
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      }
      
      // Update cart totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },

    increaseItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
        
        // Update cart totals
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },

    decreaseItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (existingItem.quantity === 1) {
          // Remove item if quantity becomes zero
          state.items = state.items.filter(item => item.id !== id);
        } else {
          // Decrease quantity
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
        }
        
        // Update cart totals
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      // Update cart totals
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },
    
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
        state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch cart';
      })
      
      // Sync Cart
      .addCase(syncCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncCart.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(syncCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to sync cart';
      })
      
      // Checkout
      .addCase(checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
        state.totalQuantity = 0;
        state.totalAmount = 0;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Checkout failed';
      });
  },
});

export const {
  addItemToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  removeItemFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;