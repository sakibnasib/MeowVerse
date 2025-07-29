
import React from "react";
import Logo from "../Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../hook/useAuth";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import Loaer from "../Loaer/Loaer";

const Navbar = () => {
  const {user,loading}=useAuth()
    const menu=<>
    <li><NavLink to=''>Home</NavLink></li>
     <li><NavLink to='/about'>About</NavLink></li>
     <li><NavLink to='/blogPage'>Blog</NavLink></li>
    </>
    if(loading) return <Loaer/>
    return (
       <div className="navbar bg-rose-100 shadow-sm">
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
    <a className=" text-xl"><Logo/></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      { menu}
    </ul>
  </div>
  <div className="navbar-end">
    {user ? <ProfileDropdown/> :<>
    <Link to='/auth/login' className="">Login</Link>
    <Link to='/auth/register' className="ml-2">Register</Link>
    </>}
    
  </div>
</div>
    );
};

export default Navbar;