import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loaer from '../../../Components/Loaer/Loaer';


const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const Allsellers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const sellersPerPage = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['sellerAll', currentPage, searchTerm],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/admin/seller`, {
        params: { page: currentPage, limit: sellersPerPage, search: searchTerm },
      });
      return data;
    },
    keepPreviousData: true,
  });

  const sellers = data?.sellers || [];
  const totalPages = Math.ceil((data?.total || 0) / sellersPerPage);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-4">
         <h2 className="text-2xl font-semibold text-center mb-6">All Registered Sellers</h2>
      {/* Search */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search sellers by name"
          className="input input-bordered w-full md:w-1/2 mx-auto rounded-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Loading / Error */}
      {isLoading && <Loaer/>}
      {isError && <p className="text-red-600 text-center">Failed to fetch sellers.</p>}
      {!isLoading && sellers.length === 0 && (
        <p className="text-gray-600 text-center">No sellers found.</p>
      )}

      {/* Seller Table */}
      {!isLoading && sellers.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="table w-full table-zebra text-sm mb-4">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Created</th>
                  <th>Last Login</th>
                  <th>Seller Since</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((user, idx) => (
                  <tr key={user._id}>
                    <td>{(currentPage - 1) * sellersPerPage + idx + 1}</td>
                    <td>
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    {/* <td>{user.phone}</td> */}
                    <td>
                      {user.district}, {user.division}
                    </td>
                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                    <td>{user.last_loggedIn ? formatDateTime(user.last_loggedIn) : 'Unknown'}</td>
                    <td>{user.seller_at ? formatDateTime(user.seller_at) : '—'}</td>
                    <td className="capitalize">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            <button
              className="px-3 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              ⬅ Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                className={`btn btn-sm rounded-full ${
                  currentPage === idx + 1 ? 'btn-primary' : ''
                }`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button
              className="px-3 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Allsellers;
