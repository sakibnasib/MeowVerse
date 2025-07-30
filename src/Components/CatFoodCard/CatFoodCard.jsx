import React from 'react';
import { Link } from 'react-router';

const CatFoodCard = ({ food }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      {/* Image */}
      <div className="relative">
        <img
          src={food.imageUrls?.[0]}
          alt={food.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        
        {/* Stock Badge */}
        {food.quantity > 0 ? (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            In Stock
          </span>
        ) : (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name & Brand */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
            {food.name}
          </h3>
          <p className="text-sm text-gray-500">
            {food.brand} • {food.category}
          </p>
        </div>

        {/* Price & Weight */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-pink-600">৳{food.price}</span>
            <p className="text-xs text-gray-500">Price</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-gray-700">{food.weight} kg</span>
            <p className="text-xs text-gray-500">Weight</p>
          </div>
        </div>

        {/* Stock Info */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            Available: {food.quantity} units
          </span>
        </div>

        {/* View Button */}
        <Link
          to={`/catfood/${food._id}`}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CatFoodCard;

