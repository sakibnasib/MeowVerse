import React, { useState } from 'react';
import useAuth from '../../../hook/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditCatModal from '../../../Components/Modal/EditCatModal';

const SellerAllCats = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [editingCat, setEditingCat] = useState(null);
  const limit = 10;
  const queryClient = useQueryClient();

  // Fetch cats 
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

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (catId) => {
      return axios.delete(`http://localhost:3000/seller/cats/${catId}`);
    },
    onSuccess: () => {
      Swal.fire('Deleted!', 'The cat has been deleted.', 'success');
      queryClient.invalidateQueries(['seller-cats', user?.email]);
    },
    onError: () => {
      Swal.fire('Failed!', 'Failed to delete the cat.', 'error');
    },
  });

  const handleDelete = (catId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this cat!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(catId);
      }
    });
  };
const updateCatMutation = useMutation({
  mutationFn: async ({ catId, updatedData }) => {
    const res = await axios.patch(`http://localhost:3000/seller/cats/${catId}`, updatedData);
    return res.data;
  },
  onSuccess: () => {
    Swal.fire('Success!', 'Cat updated successfully.', 'success');
    queryClient.invalidateQueries({ queryKey: ['seller-cats', user?.email] });
  },
  onError: () => {
    Swal.fire('Failed!', 'Failed to update cat.', 'error');
  },
});
 const handleUpdateCat = async (updatedCat) => {
  console.log(updatedCat)
  updateCatMutation.mutate({ catId: editingCat._id, updatedData: updatedCat });
};
const handleEdit = (cat) => {
  setEditingCat(cat);
};
const handleModalClose = () => {
  setEditingCat(null);
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
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Breed</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Color</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Price (৳)</th>
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
                  <td className="px-4 flex py-3 text-center space-x-2">
                    <button
                     onClick={() => handleEdit(cat)}
                      className="px-3  py-1 text-xs text-white bg-blue-500 hover:bg-blue-600 rounded"
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
      <EditCatModal
  isOpen={!!editingCat}
  onClose={handleModalClose}
  cat={editingCat}
  onSubmit={handleUpdateCat}
/>

    </div>
  );
};

export default SellerAllCats;
