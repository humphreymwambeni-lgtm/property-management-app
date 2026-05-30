import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { BarChart3, Users, Home, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-600 mt-2">Account Type: <span className="font-medium">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</span></p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Properties</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <Home size={32} className="text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <Users size={32} className="text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">$0</p>
              </div>
              <TrendingUp size={32} className="text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Occupancy Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0%</p>
              </div>
              <BarChart3 size={32} className="text-orange-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user?.role === 'owner' && (
              <button
                onClick={() => navigate('/add-property')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
              >
                + Add New Property
              </button>
            )}
            <button
              onClick={() => navigate('/properties')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Browse Properties
            </button>
            <button
              onClick={() => navigate('/my-bookings')}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-medium"
            >
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
