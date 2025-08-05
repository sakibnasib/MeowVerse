// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useState } from 'react';
// import Loaer from '../../Components/Loaer/Loaer';
// import {
//   FaSearch,
//   FaTags,
//   FaChevronLeft,
//   FaChevronRight,
// } from 'react-icons/fa';
// import CatFoodCard from '../../Components/CatFoodCard/CatFoodCard';

// const AllFoods = () => {
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('');
//   const [page, setPage] = useState(1);

//   const limit = 8;

//   const {
//     data: responseData,
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ['allfoods', search, sort, page],
//     queryFn: async () => {
//       const { data } = await axios.get('http://localhost:3000/allfoods', {
//         params: { search, sort, page, limit },
//       });
//       return data; // { data: [...], total: number }
//     },
//     keepPreviousData: true,
//   });

//   const foods = responseData?.data || [];
//   const totalPages = Math.ceil((responseData?.total || 0) / limit);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     refetch();
//   };

//   return (
//     <div className="w-11/12 mx-auto mb-10">
//       <div className="text-center my-8 bg-[url('https://i.ibb.co/7JpdjKbq/10454317.png')]">
//         <h2 className="text-4xl font-bold text-gray-800 mb-2">🍽️ Explore All Cat Foods</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Find the best food for your feline friend. Search by name or category and sort by price.
//         </p>
//       </div>

//       {/* Filter Section */}
//       <form
//         onSubmit={handleSearch}
//         className=" shadow-md p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
//       >
//         {/* Search Input */}
//         <div className="relative">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
//             <FaSearch className="w-4 h-4 text-gray-500" />
//             Search by Name or Category
//           </label>
//           <input
//             type="text"
//             placeholder="e.g., Tuna, Dry Food, Treats"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="block w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//         </div>

//         {/* Sort Dropdown */}
//         <div className="relative">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
//             <FaTags className="w-4 h-4 text-gray-500" />
//             Sort by Price
//           </label>
//           <select
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             className="block w-full appearance-none rounded-md border border-gray-300  px-4 py-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//           >
//             <option value="">Select Sorting</option>
//             <option value="asc">Price: Low to High</option>
//             <option value="desc">Price: High to Low</option>
//           </select>

//           {/* Dropdown Icon */}
//           <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
//             <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path
//                 fillRule="evenodd"
//                 d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//         </div>
//       </form>

//       {/* Results */}
//       {isLoading ? (
//         <Loaer />
//       ) : (
//         <>
//           {foods.length ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {foods.map((food) => (
//                   <CatFoodCard key={food._id} food={food} />
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center items-center gap-4 mt-4">
//                 <button
//                   disabled={page === 1}
//                   onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                   className="btn btn-sm btn-outline flex items-center gap-1"
//                 >
//                   <FaChevronLeft /> Prev
//                 </button>
//                 <span className="btn btn-sm btn-disabled">
//                   Page {page} of {totalPages}
//                 </span>
//                 <button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//                   className="btn btn-sm btn-outline flex items-center gap-1"
//                 >
//                   Next <FaChevronRight />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p className="text-center text-gray-500 font-medium text-lg mt-10">
//               No food items found for "{search}".
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AllFoods;

// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useState } from 'react';
// import Loaer from '../../Components/Loaer/Loaer';
// import {
//   FaSearch,
//   FaTags,
//   FaChevronLeft,
//   FaChevronRight,
// } from 'react-icons/fa';
// import CatFoodCard from '../../Components/CatFoodCard/CatFoodCard';

// const AllFoods = () => {
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('');
//   const [page, setPage] = useState(1);

//   const limit = 8;

//   const {
//     data: responseData,
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ['allfoods', search, sort, page],
//     queryFn: async () => {
//       const { data } = await axios.get('http://localhost:3000/allfoods', {
//         params: { search, sort, page, limit },
//       });
//       return data; // { data: [...], total: number }
//     },
//     keepPreviousData: true,
//   });

//   const foods = responseData?.data || [];
//   const totalPages = Math.ceil((responseData?.total || 0) / limit);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     refetch();
//   };

//   return (
//     <div className="w-11/12 mx-auto mb-10">
//       {/* Banner with background image */}
//       <div
//         className="relative text-center my-8 rounded-xl overflow-hidden"
//         style={{
//           backgroundImage: `url('https://i.ibb.co/7JpdjKbq/10454317.png')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           minHeight: '250px',
//         }}
//       >
//         {/* Dark overlay for text readability */}
//         <div className="absolute inset-0  bg-opacity-50 flex flex-col items-center justify-center px-4 py-8">
//           <h2 className="text-4xl font-bold text-pink-600 mb-2 drop-shadow-lg">
//             🍽️ Explore All Cat Foods
//           </h2>
//           <p className="text-pink-400 text-lg max-w-2xl mx-auto drop-shadow-sm">
//             Find the best food for your feline friend. Search by name or category and sort by price.
//           </p>
//         </div>
//       </div>

//       {/* Filter Form */}
//       <form
//         onSubmit={handleSearch}
//         className="shadow-md p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white"
//       >
//         {/* Search Input */}
//         <div className="relative">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
//             <FaSearch className="w-4 h-4 text-gray-500" />
//             Search by Name or Category
//           </label>
//           <input
//             type="text"
//             placeholder="e.g., Tuna, Dry Food, Treats"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="block w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//           />
//         </div>

//         {/* Sort Dropdown */}
//         <div className="relative">
//           <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
//             <FaTags className="w-4 h-4 text-gray-500" />
//             Sort by Price
//           </label>
//           <select
//             value={sort}
//             onChange={(e) => setSort(e.target.value)}
//             className="block w-full appearance-none rounded-md border border-gray-300 px-4 py-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//           >
//             <option value="">Select Sorting</option>
//             <option value="asc">Price: Low to High</option>
//             <option value="desc">Price: High to Low</option>
//           </select>

//           {/* Dropdown Icon */}
//           <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
//             <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//               <path
//                 fillRule="evenodd"
//                 d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//         </div>
//       </form>

//       {/* Results */}
//       {isLoading ? (
//         <Loaer />
//       ) : (
//         <>
//           {foods.length ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 {foods.map((food) => (
//                   <CatFoodCard key={food._id} food={food} />
//                 ))}
//               </div>

//               {/* Pagination Controls */}
//               <div className="flex justify-center items-center gap-4 mt-6">
//                 <button
//                   disabled={page === 1}
//                   onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                   className="btn btn-sm btn-outline flex items-center gap-1 disabled:opacity-50"
//                 >
//                   <FaChevronLeft /> Prev
//                 </button>
//                 <span className="btn btn-sm btn-disabled">
//                   Page {page} of {totalPages}
//                 </span>
//                 <button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//                   className="btn btn-sm btn-outline flex items-center gap-1 disabled:opacity-50"
//                 >
//                   Next <FaChevronRight />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p className="text-center text-gray-500 font-medium text-lg mt-10">
//               No food items found for "{search}".
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AllFoods;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import Loaer from '../../Components/Loaer/Loaer';
import {
  FaSearch,
  FaTags,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import CatFoodCard from '../../Components/CatFoodCard/CatFoodCard';

const AllFoods = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);

  const limit = 8;

  const {
    data: responseData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['allfoods', search, sort, page],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3000/allfoods', {
        params: { search, sort, page, limit },
      });
      return data;
    },
    keepPreviousData: true,
  });

  const foods = responseData?.data || [];
  const totalPages = Math.ceil((responseData?.total || 0) / limit);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  return (
    <div className="w-11/12 mx-auto mb-10">
      {/* Banner */}
    <div
  className="relative mb-8 rounded-xl overflow-hidden"
  style={{
    backgroundImage: `url('https://i.ibb.co/qYJn05dy/still-life-pet-food-assortment.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '350px',
  }}
>
  {/* Dark overlay for text readability */}
  <div className="absolute inset-0  flex flex-col items-center justify-center px-4 py-10 space-y-4">
    <h2 className="text-4xl font-bold text-pink-600 drop-shadow-lg">
      🍽️ Explore All Cat Foods
    </h2>
    <p className="text-pink-400 text-lg max-w-2xl mx-auto text-center drop-shadow">
      Find the best food for your feline friend. Search by name or category and sort by price.
    </p>

    {/* Embedded Filter Form */}
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl mt-6 bg-white/90 backdrop-blur-md shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Search Field */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <FaSearch className="w-4 h-4 text-gray-600" />
          Search by Name or Category
        </label>
        <input
          type="text"
          placeholder="e.g., Tuna, Dry Food, Treats"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Sort Field */}
      <div className="relative">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-2">
          <FaTags className="w-4 h-4 text-gray-600" />
          Sort by Price
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">Select Sorting</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        {/* Dropdown Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 top-[42px] flex items-center text-gray-500">
          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </form>
  </div>
</div>


      {/* Results */}
      {isLoading ? (
        <Loaer />
      ) : (
        <>
          {foods.length ? (
            <>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {foods.map((food) => (
                  <CatFoodCard key={food._id} food={food} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="btn btn-sm btn-outline flex items-center gap-1 disabled:opacity-50"
                >
                  <FaChevronLeft /> Prev
                </button>
                <span className="btn btn-sm btn-disabled">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className="btn btn-sm btn-outline flex items-center gap-1 disabled:opacity-50"
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 font-medium text-lg mt-10">
              No food items found for "{search}".
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AllFoods;
