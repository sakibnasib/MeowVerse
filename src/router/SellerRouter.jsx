import React from 'react';
import useRole from '../hook/useRole';
import { Navigate } from 'react-router';

const SellerRouter = ({children}) => {
   const [role ,isRoleLoading]=useRole();
 if (isRoleLoading) return <Loader/>
    if (role === 'seller') return children
  return <Navigate to='/' replace='true' />
};

export default SellerRouter;