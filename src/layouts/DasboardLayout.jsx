import React, { useState } from "react";
import { FaCat, FaHome, FaImage, FaBlog, FaClipboardList, FaUser } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Logo from "../Components/Logo/Logo";
import UserMenu from "../Components/Menu/UserMenu/UserMenu";
import { Outlet } from "react-router";

const SidebarLink = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 text-gray-700 hover:text-pink-600 px-4 py-2 transition">
    <Icon className="text-lg" />
    <span>{label}</span>
  </div>
);

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <div
        className={`bg-gradient-to-br from-pink-50 via-white to-purple-50 backdrop-blur-md shadow-md w-64 p-6 space-y-6 fixed top-0 left-0 h-full z-30 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <div className="text-2xl font-bold text-pink-600 flex items-center gap-2">
         <Logo/>
        </div>
        <hr className=" text-pink-600"/>
        <nav className="space-y-2">
        <UserMenu/>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col">
        {/* Topbar */}
        <header className=" shadow-md flex items-center justify-between p-4 md:hidden">
 <button
            className="text-2xl md:hidden text-pink-600"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
          <Logo/>
        </header>
       

        <main className="flex-1 "><Outlet/></main>
      </div>
    </div>
  );
};

export default DashboardLayout;
