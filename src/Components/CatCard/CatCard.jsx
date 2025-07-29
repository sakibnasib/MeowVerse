import React from 'react';
import { Link } from 'react-router';

const CatCard = ({ cat }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={cat.imageUrls?.[0]}
        alt={cat.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{cat.name}</h2>
        <p className="text-sm text-gray-500 mb-2">{cat.breed} • {cat.gender}</p>

        <div className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">Age:</span> {cat.age} months
        </div>
        <div className="text-sm text-gray-700 mb-1">
          <span className="font-semibold">Color:</span> {cat.color}
        </div>
        <div className="text-sm text-gray-700 mb-2">
          <span className="font-semibold">Temperament:</span> {cat.temperament}
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-pink-600">৳ {cat.price}</span>
          <Link
            to={`/cats/${cat._id}`}
            className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-full transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CatCard;
