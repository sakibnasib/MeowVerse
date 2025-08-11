import React from 'react';
import { Navigate } from 'react-router';
import useRole from '../hook/useRole';
import Loaer from '../Components/Loaer/Loaer';

const UserRouter = ({children}) => {
   const [role ,isRoleLoading]=useRole();
 if (isRoleLoading) return <Loaer/>
    if (role === 'user') return children
  return <Navigate to='/' replace='true' />
};

export default UserRouter;