// src/redux/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersAPI } from '../services/api';

// Async thunks for orders
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.getAllOrders();
      if (response.status === 'OK') {
        // Parse the order_items JSON string for each order
        const parsedOrders = response.orders.map(order => ({
          ...order,
          order_items: JSON.parse(order.order_items)
        }));
        return parsedOrders;
      } else {
        return rejectWithValue(response.message || 'Failed to fetch orders');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (items, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.createOrder(items);
      if (response.status === 'OK') {
        return response.id;
      } else {
        return rejectWithValue(response.message || 'Failed to create order');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
  async ({ orderID, isPaid, isDelivered }, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.updateOrderStatus(orderID, isPaid, isDelivered);
      if (response.status === 'OK') {
        return { orderID, isPaid, isDelivered };
      } else {
        return rejectWithValue(response.message || 'Failed to update order');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  orders: [],
  newOrdersCount: 0,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.newOrdersCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        // Count new (unpaid, undelivered) orders
        state.newOrdersCount = action.payload.filter(
          order => order.is_paid === 0 && order.is_delivered === 0
        ).length;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch orders';
      })
      
      // Create Order
      .addCase(createOrder.fulfilled, (state) => {
        state.newOrdersCount += 1;
      })
      
      // Update Order
      .addCase(updateOrder.fulfilled, (state, action) => {
        const { orderID, isPaid, isDelivered } = action.payload;
        const orderIndex = state.orders.findIndex(order => order.id === orderID);
        
        if (orderIndex !== -1) {
          // If changing from new to paid, decrease newOrdersCount
          if (state.orders[orderIndex].is_paid === 0 && isPaid === 1) {
            state.newOrdersCount = Math.max(0, state.newOrdersCount - 1);
          }
          
          // Update order status
          state.orders[orderIndex].is_paid = isPaid;
          state.orders[orderIndex].is_delivered = isDelivered;
        }
      });
  },
});

export const { clearOrders } = orderSlice.actions;
export default orderSlice.reducer;