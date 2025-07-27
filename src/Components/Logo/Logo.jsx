import React from 'react';
import icon  from '../../../public/icon.png'
import { Link } from 'react-router';
const Logo = () => {
    return (
        <Link to='/' className='flex justify-center items-center'>
             <img src={icon} className='w-12 h-12 rounded-full' alt="" />
            <p className='text-pink-600 font-bold text-xl'>MeowVerse</p>
        </Link>
    );
};

export default Logo;