import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Loaer from '../Loaer/Loaer';
import CatFoodCard from '../CatFoodCard/CatFoodCard';
import { Link } from 'react-router';

const Foodsection = () => {
    const {data , isLoading}=useQuery({
        queryKey:['food'],
        queryFn:async ()=>{
            const{data}=await axios.get('https://meow-verse-server-side.vercel.app/foods')
            return data
        }
    })
    return (
        <div className='mt-10 '>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">Explore Cat Foods for Your Furry Friend</h2>
            {isLoading ? <Loaer/>: <>
            {<div className=' mt-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {data.map(food=><CatFoodCard key={food._id}  food={food}/>)}
                </div>}
            </> }
            <div className="flex justify-center items-center">
               <Link to='/allfoods' className="mt-5 bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-full transition">View All</Link>
            </div>
        </div>
    );
};

export default Foodsection;