// import React from 'react';
// import { Link } from 'react-router';

// const CatFoodCard = ({ food }) => {
//   return (
//     <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
//       {/* Image */}
//       <div className="relative">
//         <img
//           src={food.imageUrls?.[0]}
//           alt={food.name}
//           className="w-full h-40 object-cover rounded-t-lg"
//         />
        
//         {/* Stock Badge */}
//         {food.quantity > 0 ? (
//           <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//             In Stock
//           </span>
//         ) : (
//           <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
//             Out of Stock
//           </span>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         {/* Name & Brand */}
//         <div className="mb-3">
//           <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
//             {food.name}
//           </h3>
//           <p className="text-sm text-gray-500">
//             {food.brand} • {food.category}
//           </p>
//         </div>

//         {/* Price & Weight */}
//         <div className="flex items-center justify-between mb-3">
//           <div>
//             <span className="text-xl font-bold text-pink-600">৳{food.price}</span>
//             <p className="text-xs text-gray-500">Price</p>
//           </div>
//           <div className="text-right">
//             <span className="text-sm font-medium text-gray-700">{food.weight} kg</span>
//             <p className="text-xs text-gray-500">Weight</p>
//           </div>
//         </div>

//         {/* Stock Info */}
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-sm text-gray-600">
//             Available: {food.quantity} units
//           </span>
//         </div>

//         {/* View Button */}
//         <Link
//           to={`/catfood/${food._id}`}
//           className="w-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-300 text-center block"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default CatFoodCard;

import React from 'react';
import { Link } from 'react-router';
import { FaWeightHanging, FaBoxOpen } from 'react-icons/fa';

const CatFoodCard = ({ food }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
      {/* Image Section */}
      <div className="relative h-40">
        <img
          src={food.imageUrls?.[0]}
          alt={food.name}
          className="w-full h-full object-cover"
        />

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${
            food.quantity > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {food.quantity > 0 ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Name and Brand */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
            {food.name}
          </h3>
          <p className="text-sm text-gray-500">{food.brand} • {food.category}</p>
        </div>

        {/* Food Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="flex items-center gap-1 text-gray-600">
              <FaWeightHanging className="w-3 h-3" />
              Weight:
            </span>
            <span className="font-medium">{food.weight} kg</span>
          </div>

          <div className="flex justify-between">
            <span className="flex items-center gap-1 text-gray-600">
              <FaBoxOpen className="w-3 h-3" />
              Quantity:
            </span>
            <span className="font-medium">{food.quantity} units</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-xl font-bold text-pink-600">৳{food.price}</span>
          </div>

          <Link
            to={`/catfood/${food._id}`}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-1"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CatFoodCard;
