import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CatCard from '../CatCard/CatCard';
import Loaer from '../Loaer/Loaer';
import axios from 'axios';

const ToayAddCats = () => {
    const {data,isLoading}=useQuery({
    queryKey: ['cats'],
    queryFn: async () => {
      const {data} = await axios.get('http://localhost:3000/cats');
      if (!data) {
        throw new Error('Network response was not ok');
      }
      return data;
    },
    })

if(isLoading) return <Loaer/>
    return (
        <div className='mt-10'>
            <h1 className='text-center text-[2rem] font-bold text-pink-600'>Today's Added Cats</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                {data?.map(cat => (
                    <CatCard key={cat._id} cat={cat} />
                ))}
            </div>
        </div>
    );
};

export default ToayAddCats;