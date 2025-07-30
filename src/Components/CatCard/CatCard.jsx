import React from 'react';
import { Link } from 'react-router';
import { FaHeart, FaEye, FaPaw, FaVenus, FaMars } from 'react-icons/fa';

const CatCard = ({ cat }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={cat.imageUrls?.[0]}
          alt={cat.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gender Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            cat.gender === 'Male' 
              ? 'bg-blue-500 text-white' 
              : 'bg-pink-500 text-white'
          }`}>
            {cat.gender === 'Male' ? <FaMars className="w-2 h-2 inline mr-1" /> : <FaVenus className="w-2 h-2 inline mr-1" />}
            {cat.gender}
          </span>
        </div>
        
        {/* Age Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
            <FaPaw className="w-2 h-2 inline mr-1" />
            {cat.age}m
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {cat.name}
          </h3>
          <p className="text-sm text-gray-500">{cat.breed}</p>
        </div>
  {/* quinty */}
             {/* {cat.quantity > 0 ? (
          <span className=" bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            In Stock
          </span>
        ) : (
          <span className=" bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Out of Stock
          </span>
        )} */}
        {/* Cat Details */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Color:</span>
            <span className="text-gray-800 font-medium">{cat.color}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Age:</span>
            <span className="text-gray-800 font-medium">{cat.age} months</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Temperament:</span>
            <span className="text-gray-800 font-medium text-right max-w-24">{cat.temperament}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-pink-600 ">৳{cat.price}</span>
          </div>
          
          <Link
            to={`/cats/${cat._id}`}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-1"
          >
            <FaEye className="w-3 h-3" />
            View
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default CatCard;
