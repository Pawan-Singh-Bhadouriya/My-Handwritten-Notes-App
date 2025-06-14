import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Moon, Sun, Bookmark, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false); // for hamburger menu

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Failed to logout", err);
    }
  };

  const username = user?.email?.split("@")[0];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center gap-3 text-xl font-semibold text-gray-800 dark:text-gray-100 hover:text-[#ff004f] dark:hover:text-blue-400 transition"
            >
              <img src="/images/favicon.png" alt="Notes App Logo" className="w-10 h-10" />
              Notes App
            </Link>
          </div>

          {/* Right: Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-[#ff004f] dark:hover:text-[#ff004f] transition"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Links for logged in user */}
            {user && (
              <>
                <Link
                  to="/notes"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#ff004f] dark:hover:text-[#ff004f] transition text-sm"
                  title="Notes"
                >
                  Notes
                </Link>

                <Link to="/my-courses" title="My Courses">
                  <Bookmark
                    className="text-gray-600 dark:text-gray-300 hover:text-[#ff004f] dark:hover:text-[#ff004f] transition"
                    size={22}
                  />
                </Link>
              </>
            )}

            {/* Auth Buttons */}
            {user ? (
              <>
                <span className="text-gray-700 dark:text-gray-300 text-sm">
                  Hello,
                  <span className="text-xl text-[#ff004f] font-bold"> {username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-[#f62164] hover:bg-[#ff004f] text-white px-4 py-2 rounded-md transition text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-blue-600 hover:underline text-sm">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-[#ff004f] dark:hover:text-[#ff004f] transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-gray-900 shadow-inner text-center
               transition-all duration-300 ease-in-out opacity-100 scale-100">
          {/* Theme Toggle */}
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false); // close menu on toggle
            }}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-[#ff004f] dark:hover:text-[#ff004f] transition"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />} Theme
          </button>

          {/* Links */}
          {user && (
            <>
              <Link
                to="/notes"
                onClick={() => setIsOpen(false)}
                className="block text-gray-600 dark:text-gray-300 hover:text-[#ff004f] dark:hover:text-[#ff004f] transition text-sm"
              >
                Notes
              </Link>
              <Link
                to="/my-courses"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-[#ff004f] dark:hover:text-[#ff004f] transition"
                title="My Courses"
              >
                <Bookmark size={22} /> My Courses
              </Link>
            </>
          )}

          {/* Auth Buttons */}
          {user ? (
            <>
              <span className="block text-gray-700 dark:text-gray-300 text-sm">
                Hello,
                <span className="text-xl text-[#ff004f] font-bold"> {username}</span>
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full bg-[#f62164] hover:bg-[#ff004f] text-white px-4 py-2 rounded-md transition text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-blue-600 hover:underline text-sm"
            >
              Login
            </Link>
          )}
        </div>
        
      )}
    </nav>
  );
}
