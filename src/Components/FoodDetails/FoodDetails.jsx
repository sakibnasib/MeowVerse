import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router';
import Loaer from '../Loaer/Loaer';
import CatFoodAdopt from '../Modal/CatFoodAdopt';
import useRole from '../../hook/useRole';

const FoodDetails = () => {
  const { id } = useParams();
   const [role , isRoleLoading]=useRole()

  const [isOpen, setIsOpen] = useState(false)
  const { data: food, isLoading, error } = useQuery({
    queryKey: ['food', id],
    queryFn: async () => {
      const res = await axios.get(`https://meow-verse-server-side.vercel.app/foods/${id}`);
      return res.data;
    },
  });
  const [mainImg, setMainImg] = useState(food?.imageUrls?.[0] || '');

  if (isLoading) return <Loaer />;
  if (error) return <div className="text-center text-red-500">Something went wrong!</div>;
  if (!food) return <div className="text-center text-gray-500">No food found!</div>;
  const closeModal = () => {
    setIsOpen(false)
  }
  if(isRoleLoading) return <Loaer/>
  return (
    <div className="w-11/12  mx-auto min-h-screen bg-gradient-to-br from-pink-50 to-white pb-16 px-4">
      {/* Main Image */}
      <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow mb-6  flex items-center justify-center bg-white">
        <img src={mainImg || food.imageUrls?.[0]} alt={food.name} className="w-full h-full object-fit" />
      </div>
      {/* Thumbnails */}
      {food.imageUrls?.length > 1 && (
        <div className="flex gap-2 overflow-x-auto mb-6">
          {food.imageUrls.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`food-img-${i+1}`}
              onClick={() => setMainImg(img)}
              className={`w-14 h-12 object-cover rounded shadow cursor-pointer border-2 ${mainImg === img ? 'border-pink-500' : 'border-gray-200'}`}
            />
          ))}
        </div>
      )}
      {/* Basic Info */}
      <h1 className="text-2xl font-bold text-pink-700 mb-2">{food.name}</h1>
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
        <span>Brand: <span className="font-semibold text-gray-800">{food.brand}</span></span>
        <span>Category: <span className="font-semibold text-gray-800">{food.category}</span></span>
        <span>Weight: <span className="font-semibold text-gray-800">{food.weight}kg</span></span>
        <span>ExpiryDate: <span className="font-semibold text-gray-800">{food?.expiryDate}</span></span>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-xl font-bold text-pink-600">৳{food.price}</span>
        <span className="text-xs text-gray-500">Price</span>
      </div>
      <div className="mb-2 text-sm text-gray-600">
        {food.quantity > 0 ? (
          <span className="text-green-600 font-semibold">In Stock</span>
        ) : (
          <span className="text-red-500 font-semibold">Out of Stock</span>
        )}
        <span className="ml-2">Available: {food.quantity} units</span>
      </div>
      {/* Ingredients */}
      {food.ingredients && (
        <div className="bg-pink-50 rounded-lg p-3 mb-4">
          <h2 className="text-lg font-semibold text-pink-700 mb-1">Ingredients</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{food.ingredients}</p>
        </div>
      )}
      {/* Description */}
      {food.description && (
        <div className="bg-pink-50 rounded-lg p-3 mb-4">
          <h2 className="text-lg font-semibold text-pink-700 mb-1">Description</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{food.description}</p>
        </div>
      )}
      {/* Seller Info */}
      {food.sellerName && (
        <div className="bg-white rounded-lg shadow p-3 mb-4">
          <div className="text-sm text-gray-600">
            <div>Seller: <span className="font-semibold text-gray-800">{food.sellerName}</span></div>
            {food.sellerEmail && <div>Email: <span className="font-semibold text-gray-800">{food.sellerEmail}</span></div>}
            {food.sellerPhone && <div>Phone: <span className="font-semibold text-gray-800">{food.sellerPhone}</span></div>}
            {food.sellerAddress && <div>SellerAddress: <span className="font-semibold text-gray-800">{food.sellerAddress}</span></div>}
          </div>
        </div>
      )}
      {/* CTA Button */}
      <div className="flex justify-center">
         {role !== 'user' ? (
  <h1 className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow transition-colors duration-200">
    Only User Can AddToCart
  </h1>
) : food.quantity == 0 ? (
  <h1 className="bg-red-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow">
    Stock Out
  </h1>
) : (
  <button
    onClick={() => setIsOpen(true)}
    className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow transition-colors duration-200"
  >
    Adopt Now
  </button>
)}
      </div>
       <CatFoodAdopt
                food={food}
                closeModal={closeModal}
               isOpen={isOpen}
              />
    </div>
  );
};

export default FoodDetails;
