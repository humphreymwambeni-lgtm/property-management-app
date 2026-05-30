import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setBookings } from '../store/bookingSlice';
import { bookingService } from '../services/api';
import { Calendar, MapPin, DollarSign, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const MyBookings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bookings, loading } = useAppSelector((state) => state.booking);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingService.getAll();
      dispatch(setBookings(response.data.bookings));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load bookings');
    }
  };

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await bookingService.cancel(bookingId);
      fetchBookings();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Bookings</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded flex items-start gap-3">
            <AlertCircle className="text-red-600 mt-0.5" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading your bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">You don't have any bookings yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Price</p>
                    <p className="text-lg font-semibold text-green-600">${booking.totalPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-block text-sm font-medium px-3 py-1 rounded mt-1 ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
