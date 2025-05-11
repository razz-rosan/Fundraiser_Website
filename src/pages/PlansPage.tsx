
import Layout from '../components/layout/Layout';
import PlansList from '../components/donation/PlansList';

const PlansPage = () => {
  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <PlansList />
      </div>
    </Layout>
  );
};

export default PlansPage;
