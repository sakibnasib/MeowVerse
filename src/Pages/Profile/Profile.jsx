import React from 'react';
import useRole from '../../hook/useRole';
import Loaer from '../../Components/Loaer/Loaer';
import SellerDashboard from '../Seller/SellerDashboard/SellerDashboard';
import UserDashboard from '../Dasboard/userPage/UserDashboard/UserDashboard';
import AdminDashboard from '../Admin/AdminDashboard/AdminDashboard';

const Profile = () => {
    const [role ,isRoleLoading]=useRole()
        if (isRoleLoading) return <Loaer />;

   if (role === 'seller') {
  return <SellerDashboard/>;
  }
  if (role === 'user') {
  return <UserDashboard/>;
  }
  if (role === 'admin') {
  return <AdminDashboard/>;
  }

};

export default Profile;