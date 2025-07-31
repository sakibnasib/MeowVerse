// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import CatCard from '../../Components/CatCard/CatCard';
// import Loaer from '../../Components/Loaer/Loaer';

// const AllCats = () => {

//     const {data , isLoading}=useQuery({
//         queryKey:['allcats'],
//         queryFn:async()=>{
//             const {data} = await axios.get('http://localhost:3000/allcats');
//             return data;
//         },
//     })
//     console.log(data)

//     return (
//         <div className='w-11/12 mx-auto mb-5'>
//              <div className="text-center my-8">
//     <h2 className="text-3xl font-bold text-gray-800 mb-2">Meet Our Lovely Cats</h2>
//     <p className="text-gray-600 max-w-2xl mx-auto">
//       Browse through our adorable cats available for adoption. Find your purr-fect companion today!
//     </p>
//   </div>
//   {isLoading ? <Loaer/> :<>
//   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {data.map(cat=><CatCard cat={cat} key={cat._id} />)}
//             </div>
//   </>}
            
//         </div>
//     );
// };

// export default AllCats;

// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { useState } from 'react';
// import CatCard from '../../Components/CatCard/CatCard';
// import Loaer from '../../Components/Loaer/Loaer';
// import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// const AllCats = () => {
//   const [search, setSearch] = useState('');
//   const [sort, setSort] = useState('');
//   const [page, setPage] = useState(1);

//   const limit = 8;

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ['allcats', search, sort, page],
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:3000/allcats`, {
//         params: { search, sort, page, limit },
//       });
//       return res.data;
//     },
//     keepPreviousData: true,
//   });

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     refetch();
//   };

//   const totalPages = Math.ceil((data?.total || 0) / limit);

//   return (
//     <div className="w-11/12 mx-auto mb-10">
//       <div className="text-center my-8">
//         <h2 className="text-4xl font-bold text-gray-800 mb-2">🐾 Meet Our Lovely Cats</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto">
//           Search cats by breed or color, sort them by price, and find your ideal companion!
//         </p>
//       </div>

//       {/* Filter Section */}
//       <form
//         onSubmit={handleSearch}
//         className="bg-white shadow-md p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
//       >
//         <input
//           type="text"
//           placeholder="Search by breed or color"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="input input-bordered w-full"
//         />
//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="select select-bordered w-full"
//         >
//           <option value="">Sort by Price</option>
//           <option value="asc">Price: Low to High</option>
//           <option value="desc">Price: High to Low</option>
//         </select>
        
//       </form>

//       {/* Results */}
//       {isLoading ? (
//         <Loaer />
//       ) : (
//         <>
//           {data?.data?.length ? (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
//                 {data.data.map((cat) => (
//                   <CatCard key={cat._id} cat={cat} />
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center items-center gap-4 mt-4">
//                 <button
//                   disabled={page === 1}
//                   onClick={() => setPage((p) => Math.max(p - 1, 1))}
//                   className="btn btn-sm btn-outline"
//                 >
//                   <FaChevronLeft /> Prev
//                 </button>
//                 <span className="btn btn-sm btn-disabled">
//                   Page {page} of {totalPages}
//                 </span>
//                 <button
//                   disabled={page === totalPages}
//                   onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//                   className="btn btn-sm btn-outline"
//                 >
//                   Next <FaChevronRight />
//                 </button>
//               </div>
//             </>
//           ) : (
//             <p className="text-center text-gray-500 font-medium text-lg mt-10">
//               No cats found for "{search}".
//             </p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default AllCats;


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import CatCard from '../../Components/CatCard/CatCard';
import Loaer from '../../Components/Loaer/Loaer';
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaTags,
} from 'react-icons/fa';

const AllCats = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);

  const limit = 8;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['allcats', search, sort, page],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/allcats`, {
        params: { search, sort, page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="w-11/12 mx-auto mb-10">
      <div className="text-center my-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">🐾 Meet Our Lovely Cats</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Search cats by breed or color, sort them by price, and find your ideal companion!
        </p>
      </div>

      {/* Filter Section */}
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-md p-6 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        {/* Search Input */}
        <div className="relative">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <FaSearch className="w-4 h-4 text-gray-500" />
            Search by Breed or Color
          </label>
          <input
            type="text"
            placeholder="e.g., Persian, Black, White"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <FaTags className="w-4 h-4 text-gray-500" />
            Sort by Price
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select Sorting</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>

          {/* Dropdown Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
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

      {/* Results */}
      {isLoading ? (
        <Loaer />
      ) : (
        <>
          {data?.data?.length ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                {data.data.map((cat) => (
                  <CatCard key={cat._id} cat={cat} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="btn btn-sm btn-outline flex items-center gap-1"
                >
                  <FaChevronLeft /> Prev
                </button>
                <span className="btn btn-sm btn-disabled">
                  Page {page} of {totalPages}
                </span>
                <button
                  // disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className="btn btn-sm btn-outline flex items-center gap-1"
                >
                  Next <FaChevronRight />
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 font-medium text-lg mt-10">
              No cats found for "{search}".
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default AllCats;
