// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI, setToken, clearToken } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunks for authentication
export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.signUp(name, email, password);
      if (response.status === 'OK') {
        setToken(response.token);
        // Save to AsyncStorage for persistence
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user', JSON.stringify({
          id: response.id,
          name: response.name,
          email: response.email,
        }));
        return response;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.signIn(email, password);
      if (response.status === 'OK') {
        setToken(response.token);
        // Save to AsyncStorage for persistence
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user', JSON.stringify({
          id: response.id,
          name: response.name,
          email: response.email,
        }));
        return response;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ name, password }, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateUser(name, password);
      if (response.status === 'OK') {
        // Update stored user data
        const userData = JSON.parse(await AsyncStorage.getItem('user'));
        userData.name = response.name;
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        return response;
      } else {
        return rejectWithValue(response.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (_, { rejectWithValue }) => {
    try {
      // Clear token from memory and AsyncStorage
      clearToken();
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Check for existing session on app start
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      
      if (token && userData) {
        setToken(token);
        return JSON.parse(userData);
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
        };
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sign up failed';
      })
      
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
        };
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sign in failed';
      })
      
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user) {
          state.user.name = action.payload.name;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Update profile failed';
      })
      
      // Sign Out
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      
      // Check Auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.user = action.payload;
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;