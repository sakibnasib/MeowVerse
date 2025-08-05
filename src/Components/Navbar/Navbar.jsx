
import React from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hook/useAuth";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import Loaer from "../Loaer/Loaer";
import DarkMod from "../DarkMod/DarkMod";

const Navbar = () => {
  const {user,loading}=useAuth()
    const menu=<>
    <li><NavLink  className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-pink-100 hover:text-pink-700 ${
              isActive ? 'bg-pink-100 text-pink-700 font-semibold' : 'text-gray-700'
            }`
          } to=''>Home</NavLink></li>
     <li><NavLink  className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-pink-100 hover:text-pink-700 ${
              isActive ? 'bg-pink-100 text-pink-700 font-semibold' : 'text-gray-700'
            }`
          } to='/allCats'>All Cats</NavLink></li>
          <li><NavLink  to='/allfoods'  className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-pink-100 hover:text-pink-700 ${
              isActive ? 'bg-pink-100 text-pink-700 font-semibold' : 'text-gray-700'
            }`
          }>All Foods</NavLink></li>
     <li><NavLink  className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-pink-100 hover:text-pink-700 ${
              isActive ? 'bg-pink-100 text-pink-700 font-semibold' : 'text-gray-700'
            }`
          } to='/about'>About</NavLink></li>
     <li><NavLink  className={({ isActive }) => 
            `px-4 py-2 rounded-lg transition-all duration-300 hover:bg-pink-100 hover:text-pink-700 ${
              isActive ? 'bg-pink-100 text-pink-700 font-semibold' : 'text-gray-700'
            }`
          } to='/blogPage'>Blog</NavLink></li>
     
    </>
    if(loading) return <Loaer/>
    return (
       <div className="navbar sticky top-0  z-50 rounded-2xl bg-gradient-to-br from-pink-50 via-white to-purple-50 backdrop-blur-md ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       { menu}
      </ul>
    </div>
    <Logo/>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      { menu}
    </ul>
  </div>
  <div className="navbar-end">
    {user ? <ProfileDropdown/> :<>
    <Link to='/auth/login' className="btn rounded-2xl bg-pink-100 text-pink-700 font-semibold">Login</Link>
    <Link to='/auth/register' className="ml-2 btn rounded-2xl bg-pink-100 text-pink-700 font-semibold">Register</Link>
    </>}
    
  </div>
  <DarkMod/>
</div>
    );
};

export default Navbar;


