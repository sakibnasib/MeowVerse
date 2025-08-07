import React from 'react';
import { NavLink } from 'react-router';
import {
  User,
  CheckCircle,
  PlusCircle,
  UtensilsCrossed,
  FolderOpen,
  ListOrdered
} from 'lucide-react';

const navLinkClass = ({ isActive }) =>
  `flex items-center space-x-2 p-2 rounded hover:bg-pink-100 ${
    isActive ?  'block px-4 py-2 rounded  transition text-gray-700 bg-pink-200 font-semibold text-pink-700' : 'text-gray-700'
  }`;

const SellerMenu = () => {
  return (
    <div className=" space-y-2">
      <nav className="space-y-2">
        <NavLink to="/dashboard" className={navLinkClass}>
          <User size={18} />
          <span>Profile</span>
        </NavLink>
        <NavLink to="/dashboard/sellerApproveOrde" className={navLinkClass}>
          <CheckCircle size={18} />
          <span>Order Approve</span>
        </NavLink>
        <NavLink to="/dashboard/seller/add-category" className={navLinkClass}>
          <PlusCircle size={18} />
          <span>Add Cat</span>
        </NavLink>
        <NavLink to="/dashboard/seller/add-category-food" className={navLinkClass}>
          <UtensilsCrossed size={18} />
          <span>Add CatFood</span>
        </NavLink>
        <NavLink to="/dashboard/seller/all-categories" className={navLinkClass}>
         <ListOrdered size={18} />
          <span>All Cat</span>
        </NavLink>
        <NavLink to="/dashboard/seller/all-category-food" className={navLinkClass}>
          <ListOrdered size={18} />
          <span>All CatFood</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default SellerMenu;
