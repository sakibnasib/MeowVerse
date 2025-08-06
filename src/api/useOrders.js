// useOrders.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosSecure from '../hook/useAxiosSecure';

const useOrders = (email, status, page, limit = 8) => {
  const axiosSecure=useAxiosSecure()
  return useQuery({
    queryKey: ['orders', email, status, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order/${email}`, {
        params: { status, page, limit },
      });
      return res.data;
    },
    enabled: !!email,
    keepPreviousData: true,
  });
};

export default useOrders;
