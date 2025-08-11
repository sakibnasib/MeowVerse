import { useQuery } from '@tanstack/react-query';
import React from 'react';
import CatCard from '../CatCard/CatCard';
import Loaer from '../Loaer/Loaer';
import axios from 'axios';
import { Link } from 'react-router';

const ToayAddCats = () => {
    const {data,isLoading}=useQuery({
    queryKey: ['cats'],
    queryFn: async () => {
      const {data} = await axios.get('https://meow-verse-server-side.vercel.app/cats');
      if (!data) {
        throw new Error('Network response was not ok');
      }
      return data;
    },
    })

if(isLoading) return <Loaer/>
    return (
        <div className='mt-10'>
            <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center'>Today's Added Cats</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                {data?.map(cat => (
                    <CatCard key={cat._id} cat={cat} />
                ))}
            </div>
           <div className="flex justify-center items-center">
             <Link to='/allCats' className="mt-5 bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-full transition">View All</Link>
           </div>
        </div>
    );
};

export default ToayAddCats;