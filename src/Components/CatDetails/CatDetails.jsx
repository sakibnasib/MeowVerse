import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router';
import Loaer from '../Loaer/Loaer';
import CatAdopt from '../Modal/CatAdopt';

const CatDetails = () => {
  const { id } = useParams();

    const [isOpen, setIsOpen] = useState(false)
  const { data: cat, isLoading, error } = useQuery({
    queryKey: ['cat', id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/cats/${id}`);
      return res.data;
    },
  });
  const [mainImg, setMainImg] = useState(cat?.imageUrls?.[0] || '');
  const galleryImgs = cat?.imageUrls?.filter(img => img !== mainImg) || [];

  if (isLoading) return <Loaer />;
  if (error) return <div className="text-center text-red-500">Something went wrong!</div>;
  if (!cat) return <div className="text-center text-gray-500">No cat found!</div>;

    const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <div className="w-full max-w-2xl mx-auto min-h-screen bg-gradient-to-br from-pink-50 to-white pb-16 px-4">
      {/* Main Image */}
      <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow mb-6 flex items-center justify-center bg-white">
        <img src={mainImg || cat.imageUrls?.[0]} alt={cat.name} className="w-full h-full object-cover" />
      </div>
      {/* Gallery Thumbnails */}
      {cat.imageUrls?.length > 1 && (
        <div className="flex gap-2 overflow-x-auto mb-6">
          {cat.imageUrls.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`cat-img-${i+1}`}
              onClick={() => setMainImg(img)}
              className={`w-16 h-14 object-cover rounded shadow cursor-pointer border-2 ${mainImg === img ? 'border-pink-500' : 'border-gray-200'}`}
            />
          ))}
        </div>
      )}
      {/* Basic Info */}
      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <h1 className="text-2xl font-bold text-pink-700 mb-2">{cat.name} <span className="text-lg text-gray-400 font-normal">({cat.breed})</span></h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
          <span>Gender: <span className="font-semibold text-gray-800">{cat.gender}</span></span>
          <span>Age: <span className="font-semibold text-gray-800">{cat.age}m</span></span>
          <span>Color: <span className="font-semibold text-gray-800">{cat.color}</span></span>
          <span>Weight: <span className="font-semibold text-gray-800">{cat.weight}kg</span></span>
          <span>Vaccinated: <span className="font-semibold text-gray-800">{cat.vaccinated ? 'Yes' : 'No'}</span></span>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-xl font-bold text-pink-600">৳{cat.price}</span>
          <span className="text-xs text-gray-500">Adoption Fee</span>
        </div>
      </div>
      {/* Description */}
      <div className="bg-pink-50 rounded-xl shadow p-5 mb-6">
        <h2 className="text-lg font-semibold text-pink-700 mb-2">About</h2>
        <p className="text-gray-700 text-sm leading-relaxed">{cat.description}</p>
      </div>
      {/* Seller Info */}
      <div className="bg-white rounded-xl shadow p-5 mb-8">
        <h2 className="text-lg font-semibold text-pink-700 mb-2">Seller Info</h2>
        <div className="text-sm text-gray-600 space-y-1">
          <div>Name: <span className="font-semibold text-gray-800">{cat.sellerName}</span></div>
          <div>Email: <span className="font-semibold text-gray-800">{cat.sellerEmail}</span></div>
          {cat.sellerPhone && <div>Phone: <span className="font-semibold text-gray-800">{cat.sellerPhone}</span></div>}
          {cat.sellerAddress && <div>Address: <span className="font-semibold text-gray-800">{cat.sellerAddress}</span></div>}
        </div>
      </div>
      {/* CTA Button */}
      <div className="flex justify-center">
        <button
        onClick={() => setIsOpen(true)} className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow transition-colors duration-200">
          Adopt Now
        </button>
      </div>
      <CatAdopt
                cat={cat}
                closeModal={closeModal}
               isOpen={isOpen}
              />
    </div>
  );
};

export default CatDetails;
