
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fundingReducer from './slices/fundingSlice';
import { apiSlice } from './api/apiSlice';

// Create and configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    funding: fundingReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Simple type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
