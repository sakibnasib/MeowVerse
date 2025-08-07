// useOrders.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hook/useAxiosSecure';

const useAdminapi = ( status, page, limit = 10) => {
  const axiosSecure=useAxiosSecure()
  return useQuery({
    queryKey: ['adminorder',  status, page],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/order', {params: { status, page, limit }});
     
     console.log(res) 
     return res.data;
    },
    keepPreviousData: true,
  });
};

export default useAdminapi;