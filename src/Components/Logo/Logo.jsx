import React from 'react';
import icon  from '../../../public/icon.png'
const Logo = () => {
    return (
        <div className='flex justify-center items-center'>
             <img src={icon} className='w-12 h-12 rounded-full' alt="" />
            <p className='text-pink-600 font-bold text-xl'>MeowVerse</p>
        </div>
    );
};

export default Logo;