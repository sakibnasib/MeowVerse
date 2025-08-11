import { Outlet, Link } from 'react-router';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import useRole from '../hook/useRole';
import Loaer from '../Components/Loaer/Loaer';
import Logo from '../Components/Logo/Logo';
import AdminMenu from '../Components/Menu/AdminMenu/AdminMenu';
import SellerMenu from '../Components/Menu/SellerMenu/SellerMenu';
import UserMenu from '../Components/Menu/UserMenu/UserMenu';



const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const [role , isRoleLoading]=useRole()
if(isRoleLoading) return <Loaer/>
 

  return (
    <div className="flex flex-col  md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 md:static top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-gradient-to-br from-pink-50 via-white to-purple-50 backdrop-blur-md ">
          <Link to="/" className="text-2xl font-bold">
            <Logo />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="p-3 space-y-1 overflow-y-auto h-[calc(100%-100px)]">
          {role === "admin" && <AdminMenu />}
          {role === "seller" && <SellerMenu />}
           {role === "user" && <UserMenu />}
        </div>

       
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 focus:outline-none"
          >
            <Menu size={30} />
          </button>
          <Link to="/" className="font-semibold text-gray-800 text-lg">
            <Logo />
          </Link>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

// dshlkjfdhsl

// import React, { useState } from "react";
// import {
//   AiOutlineMenu,
//   AiOutlineClose,
// } from "react-icons/ai";
// import Logo from "../Components/Logo/Logo";
// import UserMenu from "../Components/Menu/UserMenu/UserMenu";
// import AdminMenu from "../Components/Menu/AdminMenu/AdminMenu";
// import SellerMenu from "../Components/Menu/SellerMenu/SellerMenu";
// import { Outlet } from "react-router";
// import useRole from "../hook/useRole";
// import Loaer from "../Components/Loaer/Loaer";


// const DashboardLayout = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [role, isRoleLoading] = useRole();

//   if (isRoleLoading)  return <Loaer  />
    
   
  

//   return (
//     <div className="flex min-h-screen ">
//       {/* Sidebar */}
//       <div
//         className={`bg-gradient-to-br from-pink-50 via-white to-purple-50 backdrop-blur-md shadow-md w-64 p-6 space-y-6 fixed top-0 left-0 h-full z-30 transform transition-transform duration-300 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0`}
//       >
//         <div className="">
//           <Logo />
//         </div>
//         <hr className="border-pink-600" />
//         <nav className="space-y-2">
//           {role === "admin" && <AdminMenu />}
//           {role === "seller" && <SellerMenu />}
//           {role === "user" && <UserMenu />}
//         </nav>
//       </div>

//       {/* Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-30 z-20  md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main content */}
//       <div className="flex-1 flex flex-col md:ml-64">
//         {/* Topbar for Mobile */}
//         <header className="shadow-md flex items-center justify-between px-2 md:hidden">
//           <button
//             className="text-2xl text-pink-600"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             {sidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//           </button>
//           <Logo />
//         </header>

//         {/* Main Page Outlet */}
//         <main className="flex-1 overflow-y-auto ">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
