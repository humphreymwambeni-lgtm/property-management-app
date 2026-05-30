import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearUser } from '../store/authSlice';
import { Home, LogOut, Menu, Plus, Calendar } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-blue-600">
            <Home size={28} /> PropertyHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/properties" className="text-gray-700 hover:text-blue-600 transition">
              Browse Properties
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'owner' && (
                  <Link
                    to="/add-property"
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    <Plus size={20} /> Add Property
                  </Link>
                )}

                <Link
                  to="/my-bookings"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
                >
                  <Calendar size={20} /> My Bookings
                </Link>

                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  {user?.name}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/properties"
              className="block text-gray-700 hover:text-blue-600 py-2"
              onClick={() => setMenuOpen(false)}
            >
              Browse Properties
            </Link>

            {isAuthenticated ? (
              <>
                {user?.role === 'owner' && (
                  <Link
                    to="/add-property"
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Plus size={20} /> Add Property
                  </Link>
                )}

                <Link
                  to="/my-bookings"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <Calendar size={20} /> My Bookings
                </Link>

                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-blue-600 py-2 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  {user?.name}
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 w-full py-2"
                >
                  <LogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block text-gray-700 hover:text-blue-600 py-2 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
