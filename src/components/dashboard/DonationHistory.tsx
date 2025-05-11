
import { useAppSelector } from '@/hooks/redux-hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DonationHistory = () => {
  // Mock donation history for demonstration
  const donations = [
    { id: '1', date: '2023-05-01', amount: 50, type: 'Monthly Friend', status: 'Completed' },
    { id: '2', date: '2023-04-01', amount: 50, type: 'Monthly Friend', status: 'Completed' },
    { id: '3', date: '2023-03-01', amount: 50, type: 'Monthly Friend', status: 'Completed' },
    { id: '4', date: '2023-02-01', amount: 50, type: 'Monthly Friend', status: 'Completed' },
    { id: '5', date: '2023-01-01', amount: 50, type: 'Monthly Friend', status: 'Completed' },
    { id: '6', date: '2023-01-15', amount: 250, type: 'One-Time Gift', status: 'Completed' },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="pb-2 text-left font-medium">Date</th>
                <th className="pb-2 text-left font-medium">Amount</th>
                <th className="pb-2 text-left font-medium">Type</th>
                <th className="pb-2 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b last:border-0">
                  <td className="py-3">
                    {new Date(donation.date).toLocaleDateString()}
                  </td>
                  <td className="py-3">${donation.amount}</td>
                  <td className="py-3">{donation.type}</td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {donation.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationHistory;
