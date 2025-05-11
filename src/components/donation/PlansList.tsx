
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux-hooks';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PlansList = () => {
  const { plans } = useAppSelector(state => state.funding);
  
  const monthlyPlans = plans.filter(plan => plan.type === 'monthly');
  const oneTimePlans = plans.filter(plan => plan.type === 'one-time');
  
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <h1 className="section-title text-center">Choose Your Donation Plan</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
        Your donation helps us continue our mission and create lasting impact in communities around the world.
      </p>
      
      <Tabs defaultValue="monthly" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="monthly">Monthly Donations</TabsTrigger>
          <TabsTrigger value="one-time">One-Time Donations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monthlyPlans.map(plan => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    ${plan.amount}
                    <span className="text-base font-normal text-gray-500">/month</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Monthly recurring donation
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to={`/donate/${plan.id}`} className="w-full">
                    <Button className="w-full btn-primary">
                      Select Plan
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="one-time">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {oneTimePlans.map(plan => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">
                    ${plan.amount}
                  </div>
                  <p className="text-sm text-gray-500">
                    One-time donation
                  </p>
                </CardContent>
                <CardFooter>
                  <Link to={`/donate/${plan.id}`} className="w-full">
                    <Button className="w-full btn-primary">
                      Select Plan
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          Need help choosing a donation plan? Contact us for assistance.
        </p>
        <p className="text-sm text-gray-500">
          All donations are tax-deductible to the extent allowed by law.
        </p>
      </div>
    </div>
  );
};

export default PlansList;
