import { Bell, Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const initials =
    capitalize(user?.userData?.firstName?.charAt(0)) +
    capitalize(user?.userData?.lastName?.charAt(0) || "");

  const fullName = `${capitalize(user?.userData?.firstName)} ${capitalize(
    user?.userData?.lastName
  )}`.trim();

  const handleLogout = () => {
    localStorage.clear();
    setIsDropdownOpen(false);
    window.location.reload();
  };

  return (
    <header className="w-full flex items-center justify-between bg-white px-4 sm:px-6 py-3 shadow-sm border-b">
      {/* Left: Logo + Toggle (for mobile) */}
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-blue-600 leading-tight">
            AndGate
          </h1>
          <p className="text-xs text-gray-400 -mt-1">HR Management Panel</p>
        </div>
      </div>

      {/* Center: Search Bar (hidden on small screens) */}
      <div className="hidden md:flex relative w-full max-w-md mx-4">
        <span className="absolute left-3 top-2.5 text-gray-400">
          <Search size={16} />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Right: Icons + Profile */}
      {/* <div className="flex items-center gap-4">
      
        <button className="relative text-gray-600 hover:text-blue-600">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

      
        <div className="hidden sm:block w-px h-6 bg-gray-300" />

        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 hidden sm:inline">
            HR Manager
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
            <img
              src="https://i.pravatar.cc/40?u=hr-user"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div> */}

      {/* Right: User Options */}
      {user && (
        <div className="flex items-center gap-4 relative">
          {/* Notification Bell */}
          <button className="relative text-black hover:text-blue-600 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Button */}
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 text-black rounded-full font-medium shadow-sm hover:shadow transition"
          >
            {initials || <FaRegUser />}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl z-50 border border-gray-200 animate-slideDown">
              {/* User card */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-lg">
                  <FaRegUser />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">
                    {fullName}
                  </span>
                  <span className="text-xs text-gray-500">Manage Profile</span>
                </div>
              </div>

              {/* Navigation items */}
              <div className="flex flex-col py-2">
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="px-5 py-3 hover:bg-gray-50 text-gray-700 transition-all duration-200 font-medium flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.121 17.804A13.937 13.937 0 0112 15c2.686 0 5.175.79 7.121 2.137M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-3 hover:bg-gray-50 text-gray-700 transition-all duration-200 font-medium flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
export default Navbar;
