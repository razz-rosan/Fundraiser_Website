
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux-hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { FundingPlan } from '@/store/slices/fundingSlice';

interface DonationFormProps {
  plan: FundingPlan;
  onComplete: (donation: {
    planId: string;
    amount: number;
    type: 'monthly' | 'one-time';
    paymentMethod: string;
  }) => void;
}

const DonationForm = ({ plan, onComplete }: DonationFormProps) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    amount: plan.amount,
    paymentMethod: 'credit-card',
    isCustomAmount: false,
    isRecurring: plan.type === 'monthly',
    agreeTerms: false,
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const suggestedAmounts = [
    plan.amount,
    plan.amount * 2,
    plan.amount * 5,
  ];
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setFormData(prev => ({
      ...prev,
      amount: isNaN(value) ? 0 : value,
      isCustomAmount: true,
    }));
  };
  
  const handleSuggestedAmount = (amount: number) => {
    setFormData(prev => ({
      ...prev,
      amount,
      isCustomAmount: false,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to complete your donation.",
        variant: "destructive",
      });
      navigate('/login', { state: { returnUrl: `/donate/${plan.id}` } });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onComplete({
        planId: plan.id,
        amount: formData.amount,
        type: formData.isRecurring ? 'monthly' : 'one-time',
        paymentMethod: formData.paymentMethod,
      });
      
      toast({
        title: "Payment Successful",
        description: "Thank you for your donation!",
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Donation</CardTitle>
        <CardDescription>
          {plan.type === 'monthly' 
            ? 'Your donation will recur monthly until canceled.' 
            : 'This is a one-time donation.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Donation Amount</Label>
            
            <div className="flex flex-wrap gap-2">
              {suggestedAmounts.map(amount => (
                <Button
                  key={amount}
                  type="button"
                  variant={formData.amount === amount && !formData.isCustomAmount ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => handleSuggestedAmount(amount)}
                >
                  ${amount}
                </Button>
              ))}
              <Button
                type="button"
                variant={formData.isCustomAmount ? "default" : "outline"}
                className="flex-1"
                onClick={() => setFormData(prev => ({ ...prev, isCustomAmount: true }))}
              >
                Custom
              </Button>
            </div>
            
            {formData.isCustomAmount && (
              <div className="mt-3">
                <Label htmlFor="customAmount">Enter Amount</Label>
                <div className="flex items-center">
                  <span className="mr-2 text-lg">$</span>
                  <Input
                    id="customAmount"
                    type="number"
                    min="1"
                    value={formData.amount}
                    onChange={handleAmountChange}
                    className="flex-1"
                    autoFocus
                  />
                </div>
              </div>
            )}
          </div>
          
          {plan.type === 'one-time' && (
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isRecurring"
                  checked={formData.isRecurring}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isRecurring: checked === true }))
                  }
                />
                <Label htmlFor="isRecurring">
                  Make this a monthly recurring donation
                </Label>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <Label>Payment Method</Label>
            <RadioGroup 
              defaultValue={formData.paymentMethod}
              onValueChange={(value) => setFormData(prev => ({ ...prev, paymentMethod: value }))}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card">Credit/Debit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, agreeTerms: checked === true }))
              }
              required
            />
            <Label htmlFor="agreeTerms" className="text-sm">
              I agree to the terms and conditions and authorize this donation
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full btn-primary"
            disabled={isProcessing}
          >
            {isProcessing 
              ? 'Processing...' 
              : `Donate $${formData.amount}${formData.isRecurring ? '/month' : ''}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default DonationForm;
