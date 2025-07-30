import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../Components/Logo/Logo';

const AuthLayout = () => {
    return (
        <>
        <div className='bg-cover bg-center' style={{
    backgroundImage:
      "url(https://i.ibb.co/KpPHLJsd/view-adorable-3d-cats.jpg)",
  }}>
           <div className="flex justify-start ">
               <Logo />
           </div>
            <Outlet/>
        </div>
            
        
        </>
        
    );
};

export default AuthLayout;