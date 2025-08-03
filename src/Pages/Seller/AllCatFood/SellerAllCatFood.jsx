import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import useAuth from '../../../hook/useAuth';
import Loaer from '../../../Components/Loaer/Loaer';
import Swal from 'sweetalert2';

const SellerAllCatFood = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();

  // GET Data
  const { data = {}, isLoading } = useQuery({
    queryKey: ['seller-foods', user?.email, page],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/seller/allfood/${user?.email}`, {
        params: { page, limit },
      });
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });

  // DELETE Mutation
  const deleteMutation = useMutation({
    mutationFn: async (foodId) => {
      return await axios.delete(`http://localhost:3000/seller/catfood/${foodId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seller-foods', user?.email]);
    },
    onError: (error) => {
      console.error('Delete failed:', error);
      alert('Failed to delete. Please try again.');
    },
  });

  // EDIT Mutation (Example: for toggling name or other property)
  const editMutation = useMutation({
    mutationFn: async ({ foodId, updatedData }) => {
      return await axios.patch(`http://localhost:3000/seller/catfood/${foodId}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['seller-foods', user?.email]);
    },
    onError: (error) => {
      console.error('Edit failed:', error);
      alert('Failed to edit. Please try again.');
    },
  });

  const handleEdit = (food) => {
    const updatedData = { name: prompt("New name:", food.name) || food.name };
    editMutation.mutate({ foodId: food._id, updatedData });
  };

  const handleDelete = (foodId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteMutation.mutate(foodId, {
        onSuccess: () => {
          Swal.fire('Deleted!', 'The food item has been deleted.', 'success');
        },
        onError: () => {
          Swal.fire('Failed!', 'Something went wrong. Please try again.', 'error');
        },
      });
    }
  });
};

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const formatPrice = (amount) =>
    new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Your Cat Food Listings</h2>

      {isLoading ? <Loaer /> : data?.foods?.length === 0 ? (
        <p className="text-center text-gray-600">You haven't listed any food items yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Weight (kg)</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Expiry</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data?.foods?.map((food, index) => (
                <tr key={food._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1 + (page - 1) * limit}</td>
                  <td className="px-4 py-3">
                    <img
                      src={food.imageUrls?.[0]}
                      alt={food.name}
                      className="w-14 h-14 object-cover rounded border"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{food.name}</td>
                  <td className="px-4 py-3">{food.brand}</td>
                  <td className="px-4 py-3 capitalize">{food.category}</td>
                  <td className="px-4 py-3">{food.weight}</td>
                  <td className="px-4 py-3">{food.quantity}</td>
                  <td className="px-4 py-3">{formatPrice(food.price)}</td>
                  <td className="px-4 py-3">{formatDate(food.expiryDate)}</td>

                  <td className="px-4 flex py-3 space-x-2 text-center">
                    <button
                      onClick={() => handleEdit(food)}
                      disabled={editMutation.isLoading}
                      className="px-3 py-1 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                    >
                      {editMutation.isLoading ? 'Saving...' : 'Edit'}
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      disabled={deleteMutation.isLoading}
                      className="px-3 py-1 text-xs font-medium text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">Page {page}</span>
        <button
          disabled={!data?.hasMore}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SellerAllCatFood;
