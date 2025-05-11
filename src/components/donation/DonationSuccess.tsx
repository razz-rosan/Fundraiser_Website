
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowDown, Check } from 'lucide-react';

interface DonationSuccessProps {
  donation: {
    planId: string;
    amount: number;
    type: 'monthly' | 'one-time';
    paymentMethod: string;
  };
}

const DonationSuccess = ({ donation }: DonationSuccessProps) => {
  // Generate a random transaction ID for demo purposes
  const transactionId = `TR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  
  return (
    <div className="text-center max-w-md mx-auto">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
        <Check className="h-8 w-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-serif font-bold mb-2">Thank You for Your Donation!</h2>
      <p className="text-gray-600 mb-8">
        Your {donation.type === 'monthly' ? 'monthly' : 'one-time'} donation of ${donation.amount}{donation.type === 'monthly' ? '/month' : ''} has been successfully processed.
      </p>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-500">Amount:</div>
          <div className="font-medium">${donation.amount}{donation.type === 'monthly' ? '/month' : ''}</div>
          
          <div className="text-gray-500">Type:</div>
          <div className="font-medium">{donation.type === 'monthly' ? 'Monthly recurring' : 'One-time'}</div>
          
          <div className="text-gray-500">Payment Method:</div>
          <div className="font-medium capitalize">{donation.paymentMethod}</div>
          
          <div className="text-gray-500">Transaction ID:</div>
          <div className="font-medium">{transactionId}</div>
          
          <div className="text-gray-500">Date:</div>
          <div className="font-medium">{new Date().toLocaleDateString()}</div>
        </div>
      </div>
      
      <div className="space-y-4">
        <Button asChild className="w-full">
          <Link to="/dashboard">View My Dashboard</Link>
        </Button>
        
        <Button asChild variant="outline" className="w-full">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
      
      <p className="mt-8 text-sm text-gray-500">
        A receipt has been sent to your email address. Thank you for your support!
      </p>
    </div>
  );
};

export default DonationSuccess;
