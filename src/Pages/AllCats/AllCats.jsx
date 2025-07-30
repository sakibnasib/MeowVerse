import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import CatCard from '../../Components/CatCard/CatCard';
import Loaer from '../../Components/Loaer/Loaer';

const AllCats = () => {

    const {data , isLoading}=useQuery({
        queryKey:['allcats'],
        queryFn:async()=>{
            const {data} = await axios.get('http://localhost:3000/allcats');
            return data;
        },
    })
    console.log(data)
if(isLoading) return <Loaer/>
    return (
        <div className='w-11/12 mx-auto '>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data.map(cat=><CatCard cat={cat} key={cat._id} />)}
            </div>
        </div>
    );
};

export default AllCats;