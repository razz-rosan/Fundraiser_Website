
import { useEffect } from 'react';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { fetchFundingSuccess } from '@/store/slices/fundingSlice';
import Layout from '@/frontend/layout/Layout';
import Hero from '@/frontend/components/home/Hero';
import FeaturedPlans from '@/frontend/components/home/FeaturedPlans';
import FundingProgress from '@/frontend/components/home/FundingProgress';
import FeaturedAd from '@/frontend/components/home/FeaturedAd';
import ImpactSection from '@/frontend/components/home/ImpactSection';
import { api } from '@/backend/api';

const Index = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load data from the backend API
        const [plans, goals, ads] = await Promise.all([
          api.plans.getAll(),
          api.goals.getAll(),
          api.ads.getAll(),
        ]);
        
        // Update the Redux store
        dispatch(fetchFundingSuccess({
          plans,
          goals,
          ads,
        }));
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    
    loadData();
  }, [dispatch]);
  
  return (
    <Layout>
      <Hero />
      <FeaturedPlans />
      <FundingProgress />
      <FeaturedAd />
      <ImpactSection />
    </Layout>
  );
};

export default Index;
