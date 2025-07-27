import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Fotter from '../Components/Footer/Fotter';

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-412px)]">
 <Outlet/>
            </div>
           
            <Fotter/>
        </div>
    );
};

export default MainLayout;