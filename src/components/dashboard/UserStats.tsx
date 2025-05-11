
import { useAppSelector } from '@/hooks/redux-hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserStats = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { goals } = useAppSelector((state) => state.funding);
  
  if (!user) {
    return null;
  }
  
  // Mock data for demonstration
  const donationStats = {
    totalDonated: user.totalDonated || 0,
    monthsDonated: 6,
    lastDonationDate: '2023-05-01',
    contributionPercentage: user.totalDonated ? ((user.totalDonated / (goals[0]?.amount || 100000)) * 100).toFixed(2) : '0',
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Total Donated</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${donationStats.totalDonated.toLocaleString()}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Months Supported</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{donationStats.monthsDonated}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Last Donation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {new Date(donationStats.lastDonationDate).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-gray-500">Contribution to Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{donationStats.contributionPercentage}%</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
