
import React from "react";
import { Link, NavLink } from "react-router";
import { FaHome, FaCat, FaUtensils, FaInfoCircle, FaBlog, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Logo from "../Logo/Logo";
import useAuth from "../../hook/useAuth";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import Loaer from "../Loaer/Loaer";

const Navbar = () => {
  const { user } = useAuth();


  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/allCats", label: "All Cats", icon: <FaCat /> },
    { path: "/allfoods", label: "All CatFoods", icon: <FaUtensils /> },
    { path: "/about", label: "About", icon: <FaInfoCircle /> },
    { path: "/blogPage", label: "Blog", icon: <FaBlog /> },
  ];

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 
    hover:bg-pink-100 hover:text-pink-700 ${
      isActive ? "bg-pink-100 text-pink-700 font-semibold shadow-sm" : "text-gray-700"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md ">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Logo />
           
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-2">
            {navItems.map(({ path, label, icon }) => (
              <NavLink key={path} to={path} className={navLinkClass}>
                {icon}
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <ProfileDropdown />
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-xl font-medium hover:bg-pink-200 transition"
                >
                  <FaSignInAlt /> Login
                </Link>
                <div className="hidden md:block lg:block">
                  <Link
                  to="/auth/register"
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition"
                >
                  <FaUserPlus /> Register
                </Link>
                </div>
              </>
            )}
          

            {/* Mobile Menu Button */}
            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost p-2 rounded-lg hover:bg-pink-100 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-3 shadow-lg bg-white/95 backdrop-blur-md rounded-xl w-56 border border-pink-100"
              >
                {navItems.map(({ path, label, icon }) => (
                  <li key={path}>
                    <NavLink to={path} className={navLinkClass}>
                      {icon} {label}
                    </NavLink>
                  </li>
                ))}
                {!user && (
                  <li className="flex flex-col gap-2 mt-2 border-t pt-2">
                    <Link to="/auth/login" className="flex items-center gap-2 px-3 py-2 bg-pink-100 text-pink-700 rounded-lg">
                      <FaSignInAlt /> Login
                    </Link>
                    <Link to="/auth/register" className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg">
                      <FaUserPlus /> Register
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
