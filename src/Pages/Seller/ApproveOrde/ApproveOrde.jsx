import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import useAuth from '../../../hook/useAuth';
import OrderTable from '../../../Components/Table/OrderTable';
import Loaer from '../../../Components/Loaer/Loaer';
import useAxiosSecure from '../../../hook/useAxiosSecure';

const ApproveOrde = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const limit = 10;
  const queryClient = useQueryClient();
const axiosSecure=useAxiosSecure()
  const { data , isLoading } = useQuery({
    queryKey: ['orders', user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sellerorder/${user?.email}?status=Pending`, {
        params: { page, limit },
      });
      return res.data;
    },
    enabled: !!user?.email,
    keepPreviousData: true,
  });
 console.log(data)
  const approveOrRejectOrder = useMutation({
    mutationFn: async ({ orderId, status }) => {
      return axiosSecure.patch(`/orders/${orderId}`, { status });
    },
    onSuccess: () => {
      
      queryClient.invalidateQueries(['orders', user?.email, page]);
    },
  });

  const handleAction = (orderId, status) => {
    approveOrRejectOrder.mutate({ orderId, status });
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4 text-center">Pending Orders</h2>

      {isLoading ?<Loaer/> : (
        <>
          <OrderTable
            data={data?.bookings|| []}
            onAction={handleAction}
          />

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
        </>
      )}
    </div>
  );
};

export default ApproveOrde;
