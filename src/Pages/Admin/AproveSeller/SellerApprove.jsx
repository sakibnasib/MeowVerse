// import { useQuery } from '@tanstack/react-query';
// import React, { useState } from 'react';
// import useAxiosSecure from '../../../hook/useAxiosSecure';
// import Loaer from '../../../Components/Loaer/Loaer';

// const SellerApprove = () => {
//  const axiosSecure=useAxiosSecure()
//  const [page, setPage] = useState(1);
//   const limit = 10;
//     const {data,isLoading}=useQuery({
//         queryKey:['applied'],
//         queryFn:async ()=>{
//             const res=await axiosSecure.get('/allseler/applied', {params: {  page, limit }})
//             return res.data
//         }
//     })
//      const totalPages = Math.ceil((data?.totalCount || 0) / limit);
//      if(isLoading)return <Loaer/>
//     return (
//         <div>
//            {
//             data?.data?.map(d=> <>
//             <h1>{d.email}</h1>
//             </>)
//            }
//              {totalPages > 1 && (
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
//         </div>
//     );
// };

// export default SellerApprove;

import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import Loaer from '../../../Components/Loaer/Loaer';
import Swal from 'sweetalert2';
import useAuth from '../../../hook/useAuth';

const SellerApprove = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const {user}=useAuth()
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ['applied-sellers', page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allseler/applied/${user?.email}`, {
        params: { page, limit },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/seller/approve/${id}`);
      Swal.fire('Approved!', 'Seller has been approved.', 'success');
      queryClient.invalidateQueries(['applied-sellers']);
    } catch (err) {
      Swal.fire('Error', 'Failed to approve seller', {err});
    }
  };

  const handleReject = async (id) => {
    try {
      await axiosSecure.patch(`/seller/reject/${id}`);
      Swal.fire('Rejected!', 'Seller has been rejected.', 'info');
      queryClient.invalidateQueries(['applied-sellers']);
    } catch (err) {
      Swal.fire('Error', 'Failed to reject seller',{err} );
    }
  };

  if (isLoading) return <Loaer />;

  const totalPages = Math.ceil((data?.total || 0) / limit);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Seller Applications</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra ">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Division</th>
              <th>Phone</th>
              <th>DOB</th>
              <th>Applied On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((seller, index) => (
              <tr key={seller._id}>
                <td>{(page - 1) * limit + index + 1}</td>
                <td>{seller.name}</td>
                <td>{seller.email}</td>
                <td>{seller.district}</td>
                <td>{seller.division}</td>
                <td>{seller.phone}</td>
                <td>{new Date(seller.dob).toLocaleDateString()}</td>
                <td>{new Date(seller.created_at).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(seller._id)}
                      className="btn btn-xs btn-success"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(seller._id)}
                      className="btn btn-xs btn-error"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
    </div>
  );
};

export default SellerApprove;
