
import { useAppSelector } from '@/hooks/redux-hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ImpactSummary = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  if (!user) {
    return null;
  }
  
  // Calculate impact metrics based on total donation amount
  // These are illustrative examples
  const totalDonated = user.totalDonated || 0;
  const impactMetrics = [
    {
      title: 'Children Supported',
      value: Math.floor(totalDonated / 25),
      icon: '👧',
    },
    {
      title: 'Meals Provided',
      value: Math.floor(totalDonated * 4),
      icon: '🍲',
    },
    {
      title: 'Trees Planted',
      value: Math.floor(totalDonated / 10),
      icon: '🌳',
    },
    {
      title: 'Medical Supplies',
      value: `$${Math.floor(totalDonated * 0.3)}`,
      icon: '💊',
    },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Impact</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impactMetrics.map((metric) => (
            <div key={metric.title} className="text-center">
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-xl font-bold">{metric.value}</div>
              <div className="text-sm text-gray-500">{metric.title}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>These figures represent the estimated impact of your donations.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImpactSummary;
