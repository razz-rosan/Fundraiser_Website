
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import Layout from '../components/layout/Layout';
import SignupForm from '../components/auth/SignupForm';

const SignupPage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  // If user is already authenticated, redirect to appropriate page
  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <Layout>
      <div className="py-12 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="section-title text-center mb-8">Create an Account</h1>
          <SignupForm />
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
