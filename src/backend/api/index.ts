
// This is a simple mock API implementation to simulate backend functionality
// In a real application, this would connect to an actual backend server

import { 
  AuthResponse, 
  LoginRequest, 
  SignupRequest,
  DonationRequest,
  DonationResponse,
  Donation
} from '../../store/api/apiSlice';
import { FundingPlan, FundingGoal, Ad } from '../../store/slices/fundingSlice';
import { User } from '../../store/slices/authSlice';

// Mock database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    totalDonated: 2500
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    totalDonated: 750
  }
];

const mockPlans: FundingPlan[] = [
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
];

const mockGoals: FundingGoal[] = [
  {
    id: '1',
    year: 2025,
    amount: 100000,
    current: 35000,
    title: '2025 Annual Campaign',
    description: 'Help us reach our funding goal for 2025 to expand our programs.',
  },
];

const mockAds: Ad[] = [
  {
    id: '1',
    title: 'Double Your Impact',
    description: 'Every dollar you donate this month will be matched by our sponsors!',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1000',
    planId: '4',
  },
];

const mockDonations: Donation[] = [
  { 
    id: '1', 
    userId: '2', 
    planId: '1', 
    amount: 50, 
    date: '2023-05-01', 
    type: 'monthly' 
  },
  { 
    id: '2', 
    userId: '2', 
    planId: '1', 
    amount: 50, 
    date: '2023-04-01', 
    type: 'monthly' 
  },
  { 
    id: '3', 
    userId: '2', 
    planId: '1', 
    amount: 50, 
    date: '2023-03-01', 
    type: 'monthly' 
  },
  { 
    id: '4', 
    userId: '2', 
    planId: '1', 
    amount: 50, 
    date: '2023-02-01', 
    type: 'monthly' 
  },
  { 
    id: '5', 
    userId: '2', 
    planId: '1', 
    amount: 50, 
    date: '2023-01-01', 
    type: 'monthly' 
  },
  { 
    id: '6', 
    userId: '2', 
    planId: '4', 
    amount: 250, 
    date: '2023-01-15', 
    type: 'one-time' 
  },
];

// Mock API functions
export const api = {
  // Auth endpoints
  auth: {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user || credentials.password !== 'password') {
        throw new Error('Invalid email or password');
      }
      
      return {
        user,
        token: 'mock-jwt-token',
      };
    },
    
    signup: async (userData: SignupRequest): Promise<AuthResponse> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (mockUsers.some(u => u.email === userData.email)) {
        throw new Error('Email already exists');
      }
      
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name: userData.name,
        email: userData.email,
        role: 'user',
        totalDonated: 0,
      };
      
      mockUsers.push(newUser);
      
      return {
        user: newUser,
        token: 'mock-jwt-token',
      };
    },
  },
  
  // Plans endpoints
  plans: {
    getAll: async (): Promise<FundingPlan[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockPlans];
    },
    
    create: async (plan: Partial<FundingPlan>): Promise<FundingPlan> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPlan: FundingPlan = {
        id: String(mockPlans.length + 1),
        name: plan.name || 'New Plan',
        description: plan.description || '',
        amount: plan.amount || 0,
        type: plan.type || 'one-time',
        featured: plan.featured || false,
      };
      
      mockPlans.push(newPlan);
      
      return newPlan;
    },
    
    update: async (updatedPlan: FundingPlan): Promise<FundingPlan> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockPlans.findIndex(p => p.id === updatedPlan.id);
      
      if (index === -1) {
        throw new Error('Plan not found');
      }
      
      mockPlans[index] = updatedPlan;
      
      return updatedPlan;
    },
    
    delete: async (id: string): Promise<void> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockPlans.findIndex(p => p.id === id);
      
      if (index === -1) {
        throw new Error('Plan not found');
      }
      
      mockPlans.splice(index, 1);
    },
  },
  
  // Goals endpoints
  goals: {
    getAll: async (): Promise<FundingGoal[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockGoals];
    },
    
    update: async (updatedGoal: FundingGoal): Promise<FundingGoal> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockGoals.findIndex(g => g.id === updatedGoal.id);
      
      if (index === -1) {
        mockGoals.push(updatedGoal);
      } else {
        mockGoals[index] = updatedGoal;
      }
      
      return updatedGoal;
    },
  },
  
  // Donations endpoints
  donations: {
    getAll: async (): Promise<Donation[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockDonations];
    },
    
    create: async (donation: DonationRequest): Promise<DonationResponse> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDonation: Donation = {
        id: String(mockDonations.length + 1),
        userId: '2', // Assuming current user
        planId: donation.planId,
        amount: donation.amount,
        date: new Date().toISOString().split('T')[0],
        type: donation.type,
      };
      
      mockDonations.push(newDonation);
      
      // Update user's total donated amount
      const user = mockUsers.find(u => u.id === '2');
      if (user) {
        user.totalDonated = (user.totalDonated || 0) + donation.amount;
      }
      
      // Update current goal progress
      if (mockGoals.length > 0) {
        mockGoals[0].current += donation.amount;
      }
      
      return {
        success: true,
        transactionId: `TR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      };
    },
  },
  
  // Ads endpoints
  ads: {
    getAll: async (): Promise<Ad[]> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...mockAds];
    },
    
    create: async (ad: Partial<Ad>): Promise<Ad> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newAd: Ad = {
        id: String(mockAds.length + 1),
        title: ad.title || 'New Ad',
        description: ad.description,
        imageUrl: ad.imageUrl || 'https://placehold.co/600x400',
        linkTo: ad.linkTo,
        planId: ad.planId,
      };
      
      mockAds.push(newAd);
      
      return newAd;
    },
    
    update: async (updatedAd: Ad): Promise<Ad> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockAds.findIndex(a => a.id === updatedAd.id);
      
      if (index === -1) {
        throw new Error('Ad not found');
      }
      
      mockAds[index] = updatedAd;
      
      return updatedAd;
    },
    
    delete: async (id: string): Promise<void> => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const index = mockAds.findIndex(a => a.id === id);
      
      if (index === -1) {
        throw new Error('Ad not found');
      }
      
      mockAds.splice(index, 1);
    },
  },
};
