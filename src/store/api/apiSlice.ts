
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { User } from '../slices/authSlice';
import type { FundingPlan, FundingGoal, Ad } from '../slices/fundingSlice';

// Simple interfaces for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DonationRequest {
  planId: string;
  amount: number;
  type: 'monthly' | 'one-time';
}

export interface DonationResponse {
  success: boolean;
  transactionId: string;
}

export interface Donation {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  date: string;
  type: 'monthly' | 'one-time';
}

// Create API slice with simplified endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      // Get token from state - simplified access
      const token = (getState() as any).auth?.token;
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Plans', 'Goals', 'Donations', 'Ads'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (user) => ({
        url: '/auth/signup',
        method: 'POST',
        body: user,
      }),
    }),
    
    // Funding plan endpoints
    getPlans: builder.query<FundingPlan[], void>({
      query: () => '/plans',
      providesTags: ['Plans'],
    }),
    createPlan: builder.mutation<FundingPlan, Partial<FundingPlan>>({
      query: (plan) => ({
        url: '/plans',
        method: 'POST',
        body: plan,
      }),
      invalidatesTags: ['Plans'],
    }),
    updatePlan: builder.mutation<FundingPlan, FundingPlan>({
      query: (plan) => ({
        url: `/plans/${plan.id}`,
        method: 'PUT',
        body: plan,
      }),
      invalidatesTags: ['Plans'],
    }),
    deletePlan: builder.mutation<void, string>({
      query: (id) => ({
        url: `/plans/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Plans'],
    }),
    
    // Funding goal endpoints
    getGoals: builder.query<FundingGoal[], void>({
      query: () => '/goals',
      providesTags: ['Goals'],
    }),
    updateGoal: builder.mutation<FundingGoal, FundingGoal>({
      query: (goal) => ({
        url: `/goals/${goal.id}`,
        method: 'PUT',
        body: goal,
      }),
      invalidatesTags: ['Goals'],
    }),
    
    // User donation endpoints
    getDonations: builder.query<Donation[], void>({
      query: () => '/donations',
      providesTags: ['Donations'],
    }),
    makeDonation: builder.mutation<DonationResponse, DonationRequest>({
      query: (donation) => ({
        url: '/donations',
        method: 'POST',
        body: donation,
      }),
      invalidatesTags: ['Donations'],
    }),
    
    // Ad endpoints
    getAds: builder.query<Ad[], void>({
      query: () => '/ads',
      providesTags: ['Ads'],
    }),
    createAd: builder.mutation<Ad, Partial<Ad>>({
      query: (ad) => ({
        url: '/ads',
        method: 'POST',
        body: ad,
      }),
      invalidatesTags: ['Ads'],
    }),
    updateAd: builder.mutation<Ad, Ad>({
      query: (ad) => ({
        url: `/ads/${ad.id}`,
        method: 'PUT',
        body: ad,
      }),
      invalidatesTags: ['Ads'],
    }),
    deleteAd: builder.mutation<void, string>({
      query: (id) => ({
        url: `/ads/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Ads'],
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useSignupMutation,
  useGetPlansQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useGetGoalsQuery,
  useUpdateGoalMutation,
  useGetDonationsQuery,
  useMakeDonationMutation,
  useGetAdsQuery,
  useCreateAdMutation,
  useUpdateAdMutation,
  useDeleteAdMutation,
} = apiSlice;
