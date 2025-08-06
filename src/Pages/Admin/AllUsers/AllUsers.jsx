import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useState } from 'react';
import Loaer from '../../../Components/Loaer/Loaer';

const AllUsers = () => {

     const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const axiosSecure = useAxiosSecure();
  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm.trim());
      setPage(1); // Reset to first page on search
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

    const { data, isLoading, isError } = useQuery({
    queryKey: ['users', debouncedSearch, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/users`, {
        params: {
          search: debouncedSearch || undefined,
          page,
          limit,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
    enabled: !!axiosSecure,
  });

    const users = data?.data || [];
  const totalUsers = data?.count || 0;
  const totalPages = Math.ceil(totalUsers / limit);
    return (
        <div className="max-w-5xl mx-auto pt-5 ">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-800">👥 All Users</h1>

     <div className="flex justify-center mb-4">
       <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2  mb-4 w-full max-w-md rounded-full"
      />
     </div>

      {isLoading && <Loaer/>}
      {isError && <p className="text-red-600">Failed to fetch users.</p>}

      {!isLoading && users.length === 0 && (
        <p className="text-gray-600">No users found.</p>
      )}

      {!isLoading && users.length > 0 && (
        <>
          <table className="w-full border p-2 text-sm mb-4 overflow-x-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Email</th>
 <th className="border px-4 py-2 text-left">Created</th>
  <th className="border px-4 py-2 text-left">lastLoggedIn</th>
                <th className="border px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                   <td className="border px-4 py-2">{user.created_at}</td>
                    <td className="border px-4 py-2">{user.last_loggedIn}</td>
                  <td className="border px-4 py-2 capitalize">{user.role || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-2 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
                 ⬅ Prev
            </button>
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 border rounded-full ${
                  page === idx + 1 ? 'bg-blue-500 text-white' : 'bg-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-2 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;