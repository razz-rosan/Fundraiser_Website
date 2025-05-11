
import Layout from '../components/layout/Layout';
import Hero from '../components/home/Hero';
import FundingProgress from '../components/home/FundingProgress';
import FeaturedPlans from '../components/home/FeaturedPlans';
import FeaturedAd from '../components/home/FeaturedAd';
import ImpactSection from '../components/home/ImpactSection';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FundingProgress />
      <FeaturedPlans />
      <FeaturedAd />
      <ImpactSection />
    </Layout>
  );
};

export default Index;
