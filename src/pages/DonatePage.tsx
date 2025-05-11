
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import Layout from '../components/layout/Layout';
import DonationForm from '../components/donation/DonationForm';
import DonationSuccess from '../components/donation/DonationSuccess';
import { useToast } from '@/components/ui/use-toast';

const DonatePage = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { plans } = useAppSelector((state) => state.funding);
  const [selectedPlan, setSelectedPlan] = useState(plans.find((p) => p.id === planId));
  const [donationComplete, setDonationComplete] = useState(false);
  const [donation, setDonation] = useState<{
    planId: string;
    amount: number;
    type: 'monthly' | 'one-time';
    paymentMethod: string;
  } | null>(null);
  
  useEffect(() => {
    if (!planId) {
      navigate('/plans');
      return;
    }
    
    const plan = plans.find((p) => p.id === planId);
    if (!plan) {
      toast({
        title: "Plan Not Found",
        description: "The donation plan you selected could not be found.",
        variant: "destructive",
      });
      navigate('/plans');
      return;
    }
    
    setSelectedPlan(plan);
  }, [planId, plans, navigate, toast]);
  
  const handleDonationComplete = (donationData: {
    planId: string;
    amount: number;
    type: 'monthly' | 'one-time';
    paymentMethod: string;
  }) => {
    setDonation(donationData);
    setDonationComplete(true);
  };
  
  if (!selectedPlan) {
    return null;
  }
  
  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="section-title text-center mb-2">
            {donationComplete ? 'Donation Complete' : 'Complete Your Donation'}
          </h1>
          
          {!donationComplete && (
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              You're donating to: <strong>{selectedPlan.name}</strong>
            </p>
          )}
          
          <div className="max-w-md mx-auto">
            {donationComplete && donation ? (
              <DonationSuccess donation={donation} />
            ) : (
              <DonationForm plan={selectedPlan} onComplete={handleDonationComplete} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonatePage;
