
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interfaces for funding plans and goals
export interface FundingPlan {
  id: string;
  name: string;
  description: string;
  amount: number;
  type: 'monthly' | 'one-time';
  featured: boolean;
}

export interface FundingGoal {
  id: string;
  year: number;
  amount: number;
  current: number;
  title: string;
  description?: string;
}

export interface Ad {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  linkTo?: string;
  planId?: string;
}

interface FundingState {
  plans: FundingPlan[];
  goals: FundingGoal[];
  ads: Ad[];
  isLoading: boolean;
  error: string | null;
  selectedPlan: FundingPlan | null;
}

// Initial state with some example data
const initialState: FundingState = {
  plans: [
    {
      id: '1',
      name: 'Monthly Friend',
      description: 'Support us with a small monthly donation and help us plan for the future.',
      amount: 5,
      type: 'monthly',
      featured: true,
    },
    {
      id: '2',
      name: 'Monthly Supporter',
      description: 'Your monthly contribution makes a real difference in our projects.',
      amount: 15,
      type: 'monthly',
      featured: false,
    },
    {
      id: '3',
      name: 'Monthly Champion',
      description: 'Become a champion with a significant monthly impact.',
      amount: 50,
      type: 'monthly',
      featured: false,
    },
    {
      id: '4',
      name: 'One-Time Gift',
      description: 'Make a one-time donation to help us reach our goals.',
      amount: 100,
      type: 'one-time',
      featured: true,
    },
    {
      id: '5',
      name: 'Major Gift',
      description: 'Make a significant one-time contribution to our cause.',
      amount: 500,
      type: 'one-time',
      featured: false,
    },
  ],
  goals: [
    {
      id: '1',
      year: 2025,
      amount: 100000,
      current: 35000,
      title: '2025 Annual Campaign',
      description: 'Help us reach our funding goal for 2025 to expand our programs.',
    },
  ],
  ads: [
    {
      id: '1',
      title: 'Double Your Impact',
      description: 'Every dollar you donate this month will be matched by our sponsors!',
      imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000',
      planId: '4',
    },
  ],
  isLoading: false,
  error: null,
  selectedPlan: null,
};

export const fundingSlice = createSlice({
  name: 'funding',
  initialState,
  reducers: {
    fetchFundingStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchFundingSuccess: (
      state,
      action: PayloadAction<{
        plans?: FundingPlan[];
        goals?: FundingGoal[];
        ads?: Ad[];
      }>
    ) => {
      state.isLoading = false;
      if (action.payload.plans) state.plans = action.payload.plans;
      if (action.payload.goals) state.goals = action.payload.goals;
      if (action.payload.ads) state.ads = action.payload.ads;
    },
    fetchFundingFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectPlan: (state, action: PayloadAction<FundingPlan>) => {
      state.selectedPlan = action.payload;
    },
    clearSelectedPlan: (state) => {
      state.selectedPlan = null;
    },
    // Admin functionality for managing plans
    addPlan: (state, action: PayloadAction<FundingPlan>) => {
      state.plans.push(action.payload);
    },
    updatePlan: (state, action: PayloadAction<FundingPlan>) => {
      const index = state.plans.findIndex((plan) => plan.id === action.payload.id);
      if (index !== -1) {
        state.plans[index] = action.payload;
      }
    },
    deletePlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter((plan) => plan.id !== action.payload);
    },
    // Admin functionality for managing goals
    updateGoal: (state, action: PayloadAction<FundingGoal>) => {
      const index = state.goals.findIndex((goal) => goal.id === action.payload.id);
      if (index !== -1) {
        state.goals[index] = action.payload;
      } else {
        state.goals.push(action.payload);
      }
    },
    // Admin functionality for managing ads
    addAd: (state, action: PayloadAction<Ad>) => {
      state.ads.push(action.payload);
    },
    updateAd: (state, action: PayloadAction<Ad>) => {
      const index = state.ads.findIndex((ad) => ad.id === action.payload.id);
      if (index !== -1) {
        state.ads[index] = action.payload;
      }
    },
    deleteAd: (state, action: PayloadAction<string>) => {
      state.ads = state.ads.filter((ad) => ad.id !== action.payload);
    },
  },
});

export const {
  fetchFundingStart,
  fetchFundingSuccess,
  fetchFundingFailure,
  selectPlan,
  clearSelectedPlan,
  addPlan,
  updatePlan,
  deletePlan,
  updateGoal,
  addAd,
  updateAd,
  deleteAd,
} = fundingSlice.actions;

export default fundingSlice.reducer;
