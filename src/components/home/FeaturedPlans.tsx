
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

const FeaturedPlans = () => {
  const { plans } = useAppSelector(state => state.funding);
  const featuredPlans = plans.filter(plan => plan.featured);
  
  if (featuredPlans.length === 0) {
    return null;
  }
  
  return (
    <section className="py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="section-title text-center mb-2">Featured Donation Plans</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose a donation plan that works for you and help us make a difference.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  ${plan.amount}
                  {plan.type === 'monthly' && <span className="text-base font-normal text-gray-500">/month</span>}
                </div>
                <div className="text-sm text-gray-500">
                  {plan.type === 'monthly' ? 'Monthly donation' : 'One-time donation'}
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/donate/${plan.id}`} className="w-full">
                  <Button className="w-full btn-primary" size="lg">
                    Donate Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/plans">
            <Button variant="outline" size="lg">
              View All Donation Plans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlans;
