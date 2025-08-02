// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import React, { useState } from 'react';
// import useAuth from '../../../hook/useAuth';
// import { Link } from 'react-router';

// const PendingOrders = () => {
//      const { user } = useAuth();
//   const [page, setPage] = useState(1);
//   const limit = 8;

//   const { data, isLoading } = useQuery({
//     queryKey: ['orders', user?.email, page],
//     queryFn: async () => {
//       const res = await axios.get(`http://localhost:3000/order/${user?.email}?status=pending`, {
//         params: {
//           page,
//           limit,
//         },
//       });
//       return res.data; 
//     },
//     enabled: !!user?.email,
//     keepPreviousData: true,
//   });

//   const totalPages = Math.ceil((data?.totalCount || 0) / limit);

//   if (isLoading) return <div className="text-center py-10">Loading orders...</div>;
//  console.log(data.bookings ,data?.totalCount)
//     return (
//     <div className="w-11/12 mx-auto my-10">
//       <h2 className="text-3xl font-bold text-center mb-4">Your Orders</h2>

//       {data?.bookings?.length === 0 ? (
//         <p className="text-center text-gray-600">No orders found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="table w-full text-sm">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th>#</th>
//                 <th>Type</th>
//                 <th>Product</th>
//                 <th>Qty</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th className="text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.bookings.map((order, index) => (
//                 <tr key={order._id}>
//                   <td>{(page - 1) * limit + index + 1}</td>
//                   <td>{order.Type}</td>
//                   <td>
//                     {order.Type === 'Cat' ? (
//                       <>
//                         <div className="font-medium">{order.catName}</div>
//                         <div className="text-xs text-gray-500">{order.catBreed}</div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="font-medium">{order.foodName}</div>
//                         <div className="text-xs text-gray-500">{order.foodBand}</div>
//                       </>
//                     )}
//                   </td>
//                   <td>{order.quantity}</td>
//                   <td>৳{order.totalAmount}</td>
//                   <td>
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         order.status === 'Pending'
//                           ? 'bg-yellow-100 text-yellow-600'
//                           : order.status === 'Approved'
//                           ? 'bg-green-100 text-green-600'
//                           : 'bg-blue-100 text-blue-600'
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </td>
//                   <td className="flex gap-2 justify-center">
//                     <Link
//                       to={`/order/${order._id}`}
//                       className="btn btn-xs btn-outline"
//                     >
//                       View
//                     </Link>
//                     {order.status === 'Pending' && (
//                       <Link
//                         to={`/payment/${order._id}`}
//                         className="btn btn-xs btn-primary"
//                       >
//                         Pay
//                       </Link>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {totalPages > 1 && (
//         <div className="flex justify-center mt-6 gap-2">
//           <button
//             disabled={page === 1}
//             onClick={() => setPage((p) => Math.max(p - 1, 1))}
//             className="btn btn-sm btn-outline"
//           >
//             ⬅ Prev
//           </button>
//           <span className="btn btn-sm btn-disabled">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page === totalPages}
//             onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//             className="btn btn-sm btn-outline"
//           >
//             Next ➡
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PendingOrders;


import React, { useState } from 'react';
import useAuth from '../../../hook/useAuth';
import {  useNavigate } from 'react-router';
import ViewOrderInfo from '../../../Components/Modal/ViewOrderInfo';
import Loaer from '../../../Components/Loaer/Loaer';
import useOrders from '../../../api/useOrders';

const ApprovedOrders = () => {
  const { user } = useAuth();
   const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 8;
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);


   const { data =[], isLoading } = useOrders(user?.email, 'approved', page, limit);
  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOrder(null);
  };
 const handlePayment = (order) => {
    navigate('/dashboard/payment', { state: { order} });
  };
  if (isLoading) return <Loaer/>
console.log(data.bookings)
  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-4">Your Approved Orders</h2>

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
                <th className="text-center">Actions</th>
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
                    <button
                      onClick={() => openModal(order)}
                      className="btn btn-xs btn-outline"
                    >
                      View
                    </button>
                      <button
                      onClick={() => handlePayment(order)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Pay
                    </button>
                    
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

   < ViewOrderInfo
   closeModal={closeModal}
   selectedOrder={selectedOrder}
   isOpen={isOpen}
   />

    </div>
  );
};

export default ApprovedOrders;
