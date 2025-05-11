
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Hope Foundation</h3>
            <p className="mb-4 text-gray-300">
              Making a difference through the power of collective giving.
            </p>
            <p className="text-gray-300">
              © {new Date().getFullYear()} Hope Foundation. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/plans" className="text-gray-300 hover:text-white transition-colors">
                  Donation Plans
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Charity Lane</li>
              <li>New York, NY 10001</li>
              <li>Email: info@hopefoundation.org</li>
              <li>Phone: (123) 456-7890</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
