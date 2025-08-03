import React from 'react';
import { Link } from 'react-router';
import { FaHeart, FaEye, FaPaw, FaVenus, FaMars } from 'react-icons/fa';

const CatCard = ({ cat }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative h-40">
        <img
          src={cat.imageUrls?.[0]}
          alt={cat.name}
          className="w-full h-full object-cover"
        />

        {/* Gender */}
        <div className="absolute top-2 left-2">
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm ${
            cat.gender === 'Male' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'
          }`}>
            {cat.gender === 'Male' ? <FaMars className="w-3 h-3" /> : <FaVenus className="w-3 h-3" />}
            {cat.gender}
          </span>
        </div>

        {/* Age */}
        <div className="absolute top-2 right-2">
          <span className="flex items-center gap-1 bg-white/80 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm">
            <FaPaw className="w-3 h-3" />
            {cat.age}m
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-800">{cat.name}</h3>
        <p className="text-xs text-gray-500 mb-1">{cat.breed}</p>

        {/* Stock */}
        <div className="mb-2">
          {cat.quantity > 0 ? (
            <span className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">In Stock</span>
          ) : (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-semibold">Out of Stock</span>
          )}
        </div>

        {/* Details */}
        <div className="text-xs text-gray-700 space-y-1 mb-3">
          <div className="flex justify-between">
            <span>Color:</span>
            <span className="font-medium">{cat.color}</span>
          </div>
          <div className="flex justify-between">
            <span>Age:</span>
            <span className="font-medium">{cat.age}m</span>
          </div>
          <div className="flex justify-between">
            <span>Temperament:</span>
            <span className="font-medium truncate max-w-[100px] text-right">{cat.temperament}</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between border-t pt-2 border-gray-100">
          <div className="text-pink-600 font-bold text-sm">৳{cat.price}</div>
          <Link
            to={`/cats/${cat._id}`}
            className="flex items-center gap-1 bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-md text-xs font-semibold transition"
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
