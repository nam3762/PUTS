import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import hamburgerIcon from "./public/hamburger.svg";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <div className="w-full flex justify-center">
      <header className="w-full flex relative items-center justify-between px-24 pt-16">
        <div className="w-1/2 flex items-start justify-start pb-2 border-b-2 border-neutral-500 max-w-screen-sm">
          <span className="text-3xl text-neutral-700 hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-300">
            <Link to="/">PUTS</Link>
          </span>
        </div>
        <div className="flex items-center justify-center">
          <nav className="flex items-center gap-8 p-0">
            {/* <span className="text-xl hidden md:block">
              <Link to="/FixedLecture">♥</Link>
            </span>
            <span className="text-xl hidden md:block">
              <Link to="/ModifyTimetable">♡</Link>
            </span> */}
            {isLoggedIn ? (
              <span className="text-xl hidden md:block">
                <Link to="/mypage">My Page</Link>
              </span>
            ) : (
              <span className="text-xl hidden md:block text-gray-400 cursor-not-allowed">
                My Page
              </span>
            )}
            {isLoggedIn ? (
              <button
                className="flex items-center justify-center cursor-pointer transition duration-300 py-4 px-8 rounded-full bg-sky-400 hover:opacity-70 hover:text-white"
                aria-label="Menu"
                onClick={handleLogoutClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span className="text-xl hidden md:block">Logout</span>
                <img
                  alt="Hamburger"
                  src={hamburgerIcon}
                  className="md:hidden w-4 h-4"
                />
                {isHovered && (
                  <div className="md:hidden absolute top-full mt-0 py-0 bg-white shadow-md rounded-md z-50">
                    <Link
                      to="/mypage"
                      className="block px-4 py-2 text-sm text-black hover:bg-neutral-300"
                    >
                      My Page
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-black hover:bg-neutral-300"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </button>
            ) : (
              <Link to="/login">
                <button
                  className="flex items-center justify-center cursor-pointer transition duration-300 py-4 px-8 rounded-full bg-sky-400 hover:opacity-70 hover:text-white"
                  aria-label="Menu"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="text-xl hidden md:block">Login</span>
                  <img
                    alt="Hamburger"
                    src={hamburgerIcon}
                    className="md:hidden w-4 h-4"
                  />
                  {isHovered && (
                    <div className="md:hidden absolute top-full mt-0 py-0 bg-white shadow-md rounded-md z-50">
                      <Link
                        to="/mypage"
                        className="block px-4 py-2 text-sm text-black hover:bg-neutral-300"
                      >
                        My Page
                      </Link>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-black hover:bg-neutral-300"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </button>
              </Link>
            )}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
