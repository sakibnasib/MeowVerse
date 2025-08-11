// import { Link } from 'react-router';
// import useAuth from '../../hook/useAuth';

// const ProfileDropdown = () => {
//   const { user, logOut } = useAuth()

//   return (
//     <div className="dropdown dropdown-end">
//       <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
//         <div className="w-10 rounded-full">
//           <img src={user?.photoURL || '/default.png'} alt="user" />
//         </div>
//       </div>
//       <ul
//         tabIndex={0}
//         className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
//       >
//         <li className="text-sm text-gray-600 cursor-default px-3">{user?.email}</li>
//         <li>
//           <Link to="/dashboard">Dashboard</Link>
//         </li>
//         <li>
//           <button onClick={logOut}>Logout</button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default ProfileDropdown;

import { Link } from "react-router";
import { FaUserCircle, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import useAuth from "../../hook/useAuth";

const ProfileDropdown = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar Button */}
      <div
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar border-2 border-pink-300 hover:border-pink-500 transition-all"
      >
        <div className="w-10 rounded-full overflow-hidden">
          <img
            src={user?.photoURL || "/default.png"}
            alt="user"
            className="object-cover"
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-3 shadow-lg menu menu-sm dropdown-content 
        bg-white/80 backdrop-blur-md rounded-xl w-56 border border-pink-100 animate-fadeIn"
      >
        {/* User Info */}
        <li className="px-3 py-2 text-sm text-gray-700 border-b border-pink-100">
          <p className="font-semibold text-pink-700">
            {user?.displayName || "User"}
          </p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
        </li>

        {/* Dashboard Link */}
        <li>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pink-100 hover:text-pink-700 transition"
          >
            <FaTachometerAlt /> Dashboard
          </Link>
        </li>

        {/* Logout Button */}
        <li>
          <button
            onClick={logOut}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
