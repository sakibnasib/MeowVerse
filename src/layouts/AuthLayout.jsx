import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';

const AuthLayout = () => {
    return (
        <>
        <div className="">
           <div className="flex justify-start ">
               <Logo />
           </div>
            <Outlet/>
        </div>
            
        
        </>
        
    );
};

export default AuthLayout;