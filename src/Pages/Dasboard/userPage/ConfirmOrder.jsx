import React from 'react';
import  { useState } from 'react';
import Loaer from '../../../Components/Loaer/Loaer';
import useAuth from '../../../hook/useAuth';
import useOrders from '../../../api/useOrders';
const ConfirmOrder = () => {
    const [page, setPage] = useState(1);
    const {user}=useAuth()
  const limit = 8;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

//   const { data, isLoading } = useQuery({
//     queryKey: ['orders', user?.email, page],
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:3000/order/${user?.email}?status=confirmed`, {
//         params: { page, limit },
//       });
//       return res.data;
//     },
//     enabled: !!user?.email,
//     keepPreviousData: true,
//   });

  const { data, isLoading } = useOrders(user?.email, 'confirmed', page, limit);
const totalPages = Math.ceil((data?.totalCount || 0) / limit);
if(isLoading) return <Loaer/>
    return (
         <div className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-4">Your Confirmed Orders</h2>

      {data?.bookings?.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Type</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-center">SellerEmail</th>
              </tr>
            </thead>
            <tbody>
              {data?.bookings?.map((order, index) => (
                <tr key={order._id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{order.Type}</td>
                  <td>
                    {order.Type === 'Cat' ? (
                      <>
                        <div className="font-medium">{order.catName}</div>
                        <div className="text-xs text-gray-500">{order.catBreed}</div>
                      </>
                    ) : (
                      <>
                        <div className="font-medium">{order.foodName}</div>
                        <div className="text-xs text-gray-500">{order.foodBand}</div>
                      </>
                    )}
                  </td>
                  <td>{order.quantity}</td>
                  <td>৳{order.totalAmount}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : order.status === 'Approved'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center">
                   {/*  */}
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="btn btn-sm btn-outline"
          >
            ⬅ Prev
          </button>
          <span className="btn btn-sm btn-disabled">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="btn btn-sm btn-outline"
          >
            Next ➡
          </button>
        </div>
      )}

  

    </div>
  );
};
export default ConfirmOrder;