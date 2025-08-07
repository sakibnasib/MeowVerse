import React from 'react';
import { Navigate } from 'react-router';
import useRole from '../hook/useRole';

const UserRouter = ({children}) => {
   const [role ,isRoleLoading]=useRole();
 if (isRoleLoading) return <Loader/>
    if (role === 'user') return children
  return <Navigate to='/' replace='true' />
};

export default UserRouter;