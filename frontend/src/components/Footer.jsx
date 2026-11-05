
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl text-blue-500">▣</span>
              <h2 className="text-2xl font-bold text-white">
                Job<span className="text-blue-500">Portal</span>
              </h2>
            </Link>

            <p className="text-sm leading-6 text-gray-400">
              Find your dream job and build your career with JobPortal.
              Connect with top companies and discover opportunities.
            </p>

            <div className="flex flex-wrap gap-4 mt-5 text-sm">
              <a href="#" className="hover:text-blue-500">Facebook</a>
              <a href="#" className="hover:text-pink-500">Instagram</a>
              <a href="#" className="hover:text-blue-500">LinkedIn</a>
              <a href="#" className="hover:text-sky-400">Twitter</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
              <li><Link to="/jobs" className="hover:text-blue-400">Browse Jobs</Link></li>
              <li><Link to="/browse" className="hover:text-blue-400">Browse Companies</Link></li>
              <li><Link to="/login" className="hover:text-blue-400">Login</Link></li>
              <li><Link to="/signup" className="hover:text-blue-400">Create Account</Link></li>
            </ul>
          </div>

          {/* Job Seekers */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              For Job Seekers
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/jobs" className="hover:text-blue-400">Search Jobs</Link></li>
              <li><Link to="/profile" className="hover:text-blue-400">My Profile</Link></li>
              <li><Link to="/applications" className="hover:text-blue-400">My Applications</Link></li>
              <li><Link to="/signup" className="hover:text-blue-400">Register</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="text-blue-500">Email: </span>
                support@jobportal.com
              </li>
              <li>
                <span className="text-blue-500">Phone: </span>
                +91 98765 43210
              </li>
              <li>
                <span className="text-blue-500">Location: </span>
                India
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
