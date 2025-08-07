import React, { useState } from 'react';
import useAdminapi from '../../../api/useAdminapi';
import Loaer from '../../../Components/Loaer/Loaer';
import TableAdmin from '../../../Components/Tableadmin/TableAdmin';

const AdminapprovedOrder = () => {
    const [page, setPage] = useState(1);
  const limit = 10;
     const { data =[], isLoading } = useAdminapi( 'approved', page, limit);
   const totalPages = Math.ceil((data?.totalCount || 0) / limit);
   if(isLoading) return <Loaer/>
    return (
      <div className="w-11/12 mx-auto my-10">
      <h2 className="text-3xl font-bold text-center mb-4">All User Approved Orders</h2>

     {/*  */}
<TableAdmin data={data} page={page} limit={limit} />

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

export default AdminapprovedOrder;