import React, { useState } from 'react';
import useAuth from '../../../hook/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const SellerAllCats = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();

  const { data = {}, isLoading } = useQuery({
    queryKey: ['seller-cats', user?.email, page],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/seller/allcats/${user?.email}`, {
        params: { page, limit },
      });
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  const handleEdit = (cat) => {
    console.log('Edit clicked for:', cat);
    // Implement navigation or modal
  };

  const handleDelete = async (catId) => {
    const confirmed = window.confirm('Are you sure you want to delete this cat?');
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:3000/seller/cats/${catId}`);
        queryClient.invalidateQueries(['seller-cats', user?.email]);
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete. Please try again.');
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Listed Cats</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : data?.cats?.length === 0 ? (
        <p>No cats listed yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100 text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Breed</th>
                <th className="px-4 py-3 text-left">Gender</th>
                <th className="px-4 py-3 text-left">Age</th>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-left">Qty</th>
                <th className="px-4 py-3 text-left">Price (৳)</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm text-gray-700">
              {data?.cats?.map((cat, index) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1 + (page - 1) * limit}</td>
                  <td className="px-4 py-3">
                    <img
                      src={cat.imageUrls?.[0]}
                      alt={cat.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{cat.name}</td>
                  <td className="px-4 py-3">{cat.breed}</td>
                  <td className="px-4 py-3">{cat.gender}</td>
                  <td className="px-4 py-3">{cat.age}</td>
                  <td className="px-4 py-3">{cat.color}</td>
                  <td className="px-4 py-3">{cat.quantity}</td>
                  <td className="px-4 py-3">৳{cat.price}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="px-3 py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="px-3 py-1 text-xs text-white bg-red-500 hover:bg-red-600 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium">Page {page}</span>
        <button
          disabled={!data?.hasMore}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SellerAllCats;
