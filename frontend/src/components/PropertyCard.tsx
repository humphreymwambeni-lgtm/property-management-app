import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Home } from 'lucide-react';

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    description: string;
    propertyType: string;
    price: number;
    location: string;
    images: string[];
    availability: boolean;
  };
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Home size={64} className="text-gray-400" />
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 flex-1">{property.title}</h3>
          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
            {property.propertyType}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{property.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin size={16} className="text-blue-600" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign size={16} className="text-green-600" />
              <span className="font-bold text-lg text-gray-900">${property.price}</span>
              <span className="text-gray-600 text-sm">/night</span>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded ${
                property.availability
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {property.availability ? 'Available' : 'Booked'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
