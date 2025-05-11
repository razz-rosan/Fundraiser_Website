
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks';
import { logout } from '../../store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-serif text-2xl font-bold text-primary-blue">Hope Foundation</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="font-medium hover:text-primary-blue transition-colors">
            Home
          </Link>
          <Link to="/plans" className="font-medium hover:text-primary-blue transition-colors">
            Donation Plans
          </Link>
          {isAuthenticated ? (
            <>
              <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="font-medium hover:text-primary-blue transition-colors">
                {user?.role === 'admin' ? 'Admin' : 'Dashboard'}
              </Link>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-primary-blue">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" className="font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/plans" className="font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                Donation Plans
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="font-medium py-2" onClick={() => setIsMenuOpen(false)}>
                    {user?.role === 'admin' ? 'Admin' : 'Dashboard'}
                  </Link>
                  <Button onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant="outline" className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full bg-primary-blue">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
