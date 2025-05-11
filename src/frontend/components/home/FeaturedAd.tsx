
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux-hooks';
import { Button } from '@/components/ui/button';

const FeaturedAd = () => {
  const { ads } = useAppSelector(state => state.funding);
  
  if (ads.length === 0) {
    return null;
  }
  
  // Get the first ad
  const ad = ads[0];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="md:w-1/2">
            <img 
              src={ad.imageUrl} 
              alt={ad.title} 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-serif font-bold mb-4">{ad.title}</h2>
            {ad.description && <p className="mb-6 text-gray-600">{ad.description}</p>}
            <Link to={ad.planId ? `/donate/${ad.planId}` : ad.linkTo || '/plans'}>
              <Button size="lg" className="btn-primary">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAd;
