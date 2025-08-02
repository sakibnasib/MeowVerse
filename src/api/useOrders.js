// useOrders.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useOrders = (email, status, page, limit = 8) => {
  return useQuery({
    queryKey: ['orders', email, status, page],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/order/${email}`, {
        params: { status, page, limit },
      });
      return res.data;
    },
    enabled: !!email,
    keepPreviousData: true,
  });
};

export default useOrders;
