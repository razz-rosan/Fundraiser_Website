
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/redux-hooks';

const Hero = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="hero-title mb-6">
              Fund Hope. <br />
              Make a Difference.
            </h1>
            <p className="text-lg mb-8 max-w-md">
              Your donation can change lives. Join our community of givers and help us reach our funding goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/plans">
                <Button size="lg" className="btn-accent">
                  Donate Now
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800">
                    Create Account
                  </Button>
                </Link>
              )}
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=2070"
              alt="Children receiving aid"
              className="rounded-lg shadow-lg w-full object-cover h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
