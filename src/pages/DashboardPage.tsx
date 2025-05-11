
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import Layout from '../components/layout/Layout';
import UserStats from '../components/dashboard/UserStats';
import DonationHistory from '../components/dashboard/DonationHistory';
import ImpactSummary from '../components/dashboard/ImpactSummary';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is admin, redirect to admin dashboard
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return (
    <Layout>
      <div className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="section-title mb-0">Your Dashboard</h1>
            <Link to="/plans">
              <Button>Make a Donation</Button>
            </Link>
          </div>
          
          <UserStats />
          
          <div className="mt-8 grid grid-cols-1 gap-8">
            <ImpactSummary />
            <DonationHistory />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
