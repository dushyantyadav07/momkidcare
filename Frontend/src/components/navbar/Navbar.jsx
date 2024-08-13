import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Update state based on token presence
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token from localStorage
    setIsLoggedIn(false); // Update state
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <NavLink to="/" className="hover:text-gray-400">
            MyApp
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white font-bold ${
                isActive ? "text-gray-400" : "hover:text-gray-400"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-white font-bold ${
                isActive ? "text-red-800" : "hover:text-gray-400"
              }`
            }
          >
            Contact
          </NavLink>
          {isLoggedIn && (
            <NavLink
              to="/session"
              className={({ isActive }) =>
                `text-white font-bold ${
                  isActive ? "text-red-800" : "hover:text-gray-400"
                }`
              }
            >
              Book Session
            </NavLink>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 font-bold text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `bg-blue-500 font-bold text-white px-4 py-2 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-blue-600"
                }`
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"} mt-4`}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block text-white ${
              isActive ? "text-gray-400" : "hover:text-gray-400"
            } py-2`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `block text-white ${
              isActive ? "text-gray-400" : "hover:text-gray-400"
            } py-2`
          }
        >
          Contact
        </NavLink>
        {isLoggedIn ? (
          <NavLink
            to="/session"
            className={({ isActive }) =>
              `block text-white ${
                isActive ? "text-gray-400" : "hover:text-gray-400"
              } py-2`
            }
          >
            Book Session
          </NavLink>
        ) : (
          ""
        )}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
          >
            Logout
          </button>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block bg-blue-500 text-white px-4 py-2 rounded ${
                isActive ? "bg-blue-600" : "hover:bg-blue-600"
              } mt-2`
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
