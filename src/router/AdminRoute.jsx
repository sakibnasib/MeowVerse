import React from 'react';
import useRole from '../hook/useRole';
import Loaer from '../Components/Loaer/Loaer';
import { Navigate } from 'react-router';



const AdminRoute = ({children}) => {

    const [role,isRoleLoading]=useRole();
    if(isRoleLoading) return <Loaer/>
     if (role === 'admin') return children
  return <Navigate to='/' replace='true' />
};

export default AdminRoute;