
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import Layout from '../components/layout/Layout';
import PlanManagement from '../components/admin/PlanManagement';
import GoalManagement from '../components/admin/GoalManagement';
import AdManagement from '../components/admin/AdManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('plans');
  
  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is not an admin, redirect to user dashboard
  if (user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Layout>
      <div className="py-12">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="section-title mb-8">Admin Dashboard</h1>
          
          <Tabs defaultValue="plans" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="plans">Funding Plans</TabsTrigger>
              <TabsTrigger value="goals">Funding Goals</TabsTrigger>
              <TabsTrigger value="ads">Campaign Ads</TabsTrigger>
            </TabsList>
            
            <TabsContent value="plans">
              <PlanManagement />
            </TabsContent>
            
            <TabsContent value="goals">
              <GoalManagement />
            </TabsContent>
            
            <TabsContent value="ads">
              <AdManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
