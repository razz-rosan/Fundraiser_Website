
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();
  
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
          <h1 className="section-title text-center mb-8">Login to Your Account</h1>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
