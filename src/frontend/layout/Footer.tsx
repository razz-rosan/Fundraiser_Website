
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg font-bold mb-4">Hope Foundation</h3>
            <p className="text-sm text-gray-600 mb-4">
              Empowering communities and changing lives through sustainable development programs worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/plans" className="hover:underline">Donation Plans</Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">Sign Up</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:underline">Our Mission</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">Our Team</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">Impact Reports</Link>
              </li>
              <li>
                <Link to="#" className="hover:underline">Careers</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@hopefoundation.org</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Hope St, City, Country</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-500">
            © {currentYear} Hope Foundation. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className="text-gray-500 hover:text-gray-700">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-700">
              Terms of Service
            </Link>
            <Link to="#" className="text-gray-500 hover:text-gray-700">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
