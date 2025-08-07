import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hook/useAuth';
import { Loader } from 'lucide-react';

const PrivateRouter = ({ children }) => {
    const {user,loading}=useAuth()
    const location =useLocation()
    if(loading) return <Loader/>
    if(user)return children
    return <Navigate to="/auth/login" state={{ from: location }} replace='true'/>
};

export default PrivateRouter;