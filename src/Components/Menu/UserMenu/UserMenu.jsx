import React from 'react';
import { NavLink } from 'react-router';

const UserMenu = () => {
  const linkClass =
    'block px-4 py-2 rounded hover:bg-pink-100 transition text-gray-700';
  const activeClass = 'bg-pink-200 font-semibold text-pink-700';

  return (
    <div className="">
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          🧍 Profile
        </NavLink>
        <NavLink
          to="/dashboard/Sellerform"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          🛍️ Become a Seller
        </NavLink>
        <NavLink
          to="/dashboard/PandingOrders"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          📦 My Pending Orders
        </NavLink>
        <NavLink
          to="/dashboard/approvedOrders"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
         
         📦Approved Orders
        </NavLink>
        <NavLink
          to="/dashboard/confirm-order"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ''}`
          }
        >
          ✅ Confirm Order
        </NavLink>
      </nav>
    </div>
  );
};

export default UserMenu;
