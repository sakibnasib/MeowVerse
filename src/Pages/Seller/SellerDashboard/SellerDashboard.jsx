// import React from 'react';
// import useAuth from '../hook/useAuth';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hook/useAxiosSecure';
// import Loaer from '../../../Components/Loaer/Loaer';
// import OrderStatusChart from './OrderStatusChart';
// import EarningsChart from './EarningsChart';

// const SellerDashboard = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data, isLoading }=useQuery({
//     queryKey: ['seller-summary', email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/seller/summary/${email}`);
//       return res.data;
//     },
//     enabled: !!email,
//   });
// };

//   if(isLoading) return <Loaer/>

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Basic Stats */}
//       <div className="card bg-base-100 shadow">
//         <div className="card-body">
//           <h2 className="card-title">Your Listings</h2>
//           <p>🐱 Cats: {data.catCount}</p>
//           <p>🥫 Foods: {data.foodCount}</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="card bg-base-100 shadow">
//         <div className="card-body">
//           <OrderStatusChart data={data.statusCounts} />
//         </div>
//       </div>

//       <div className="card bg-base-100 shadow">
//         <div className="card-body">
//           <EarningsChart data={data.earnings} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;


import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loaer from '../../../Components/Loaer/Loaer';
import OrderStatusChart from './OrderStatusChart';
import EarningsChart from './EarningsChart';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useAuth from '../../../hook/useAuth';

const SellerDashboard = () => {
  const { user } = useAuth();
  const email = user?.email;
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['seller-summary', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller/summary/${email}`);
      return res.data;
    },
    enabled: !!email, // ensures query only runs when email is available
  });

  if (isLoading) return <Loaer />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Basic Stats */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Your Listings</h2>
          <p>🐱 Cats: {data.catCount}</p>
          <p>🥫 Foods: {data.foodCount}</p>
        </div>
      </div>

      {/* Order Status Chart */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <OrderStatusChart data={data.statusCounts} />
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <EarningsChart data={data.earnings} />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
