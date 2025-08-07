import React from 'react';
import { NavLink } from 'react-router';
import {
  UserCircle,
  Clock,
  CheckCircle,
  ClipboardCheck,
  Users,
  Store,
  BadgeCheck
} from 'lucide-react';

const AdminMenu = () => {
    const linkClass = ({ isActive }) =>
       `flex items-center space-x-2 p-2 rounded hover:bg-pink-100 ${
    isActive ?  'block px-4 py-2 rounded  transition text-gray-700 bg-pink-200 font-semibold text-pink-700' : 'text-gray-700'
  }`;

    return (
        <nav className="space-y-2  w-full max-w-xs  ">
            <NavLink to="/dashboard" end className={linkClass}>
                <UserCircle size={20} />
                <span>Profile</span>
            </NavLink>
            <NavLink to="/dashboard/sellersapprove" className={linkClass}>
                <BadgeCheck size={20} />
                <span>Seller Approve</span>
            </NavLink>
             <NavLink to="/dashboard/allUsers" className={linkClass}>
                <Users size={20} />
                <span>All Users</span>
            </NavLink>

            <NavLink to="/dashboard/allsellers" className={linkClass}>
                <Store size={20} />
                <span>All Sellers</span>
            </NavLink>
<NavLink to="/dashboard/adminpending" className={linkClass}>
                <Clock size={20} />
                <span>All Pending Orders</span>
            </NavLink>

            <NavLink to="/dashboard/adminapproved" className={linkClass}>
                <CheckCircle size={20} />
                <span>All Approved Orders</span>
            </NavLink>

            <NavLink to="/dashboard/adminconfirmed" className={linkClass}>
                <ClipboardCheck size={20} />
                <span>All Confirmed</span>
            </NavLink>

           

        </nav>
    );
};

export default AdminMenu;
