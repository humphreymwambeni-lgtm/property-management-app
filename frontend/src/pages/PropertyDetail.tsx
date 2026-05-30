import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setSelectedProperty } from '../store/propertySlice';
import { addBooking } from '../store/bookingSlice';
import { propertyService, bookingService } from '../services/api';
import { MapPin, DollarSign, Home, AlertCircle, Calendar } from 'lucide-react';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { selectedProperty } = useAppSelector((state) => state.property);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
  });

  useEffect(() => {
    if (id) {
      fetchProperty(parseInt(id));
    }
  }, [id]);

  const fetchProperty = async (propertyId: number) => {
    try {
      setLoading(true);
      const response = await propertyService.getById(propertyId);
      dispatch(setSelectedProperty(response.data.property));
    } catch (err) {
      setError('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!bookingData.checkIn || !bookingData.checkOut) {
      setError('Please select both check-in and check-out dates');
      return;
    }

    setBookingLoading(true);
    setError(null);

    try {
      const response = await bookingService.create({
        propertyId: parseInt(id || '0'),
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
      });
      dispatch(addBooking(response.data.booking));
      navigate('/my-bookings');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading property details...</p>
      </div>
    );
  }

  if (!selectedProperty) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property not found</h2>
          <button
            onClick={() => navigate('/properties')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate('/properties')}
          className="mb-6 text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Properties
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-200 h-96 flex items-center justify-center">
                {selectedProperty.images && selectedProperty.images.length > 0 ? (
                  <img
                    src={selectedProperty.images[0]}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Home size={64} className="text-gray-400" />
                )}
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-4xl font-bold text-gray-900">{selectedProperty.title}</h1>
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded">
                    {selectedProperty.propertyType}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-700 mb-6">
                  <MapPin size={20} className="text-blue-600" />
                  <span className="text-lg">{selectedProperty.location}</span>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About this property</h2>
                  <p className="text-gray-700 leading-relaxed">{selectedProperty.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Price per Night</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">${selectedProperty.price}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Availability</p>
                    <p className={`text-2xl font-bold mt-2 ${
                      selectedProperty.availability ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedProperty.availability ? 'Available' : 'Booked'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Book This Property</h3>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3">
                  <AlertCircle className="text-red-600 mt-0.5" size={20} />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-in</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="date"
                      name="checkIn"
                      value={bookingData.checkIn}
                      onChange={handleBookingChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Check-out</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="date"
                      name="checkOut"
                      value={bookingData.checkOut}
                      onChange={handleBookingChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={bookingLoading || !selectedProperty.availability}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {bookingLoading ? 'Booking...' : !selectedProperty.availability ? 'Not Available' : 'Book Now'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                {isAuthenticated ? 'Ready to book?' : 'Sign in to book this property'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
