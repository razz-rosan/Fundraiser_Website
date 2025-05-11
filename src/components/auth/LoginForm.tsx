
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());
    setIsLoading(true);
    
    try {
      // Mimic API call - in a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }
      
      // For demo purposes: admin vs regular user login
      let user;
      let token = 'mock-jwt-token';
      
      if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
        user = {
          id: 'admin-123',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin' as const,
          totalDonated: 0,
        };
      } else if (formData.email === 'user@example.com' && formData.password === 'user123') {
        user = {
          id: 'user-123',
          name: 'Regular User',
          email: 'user@example.com',
          role: 'user' as const,
          totalDonated: 500,
        };
      } else {
        throw new Error('Invalid email or password');
      }
      
      dispatch(loginSuccess({ user, token }));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      });
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      let message = 'An error occurred during login';
      if (error instanceof Error) {
        message = error.message;
      }
      dispatch(loginFailure(message));
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-serif font-bold text-center mb-6">Login to Your Account</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full btn-primary" 
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-gray-600 mb-2">
          For demo purposes, use these credentials:
        </p>
        <p className="text-gray-600 mb-1">
          Admin: admin@example.com / admin123
        </p>
        <p className="text-gray-600">
          User: user@example.com / user123
        </p>
        <p className="text-gray-600 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary-blue hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
