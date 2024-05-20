// Firstpage.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TimetableImage from "./public/fulltimetable.png";

const FirstPage = () => {
  useEffect(() => {
    // Navbar.js의 높이에 해당하는 값을 스크롤 다운합니다.
    // 64px는 Navbar.js의 대략적인 높이입니다.
    // 정확한 높이를 알고 있다면 그 값을 사용하세요.
    window.scrollTo(0, 124);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-100">
        <Link to="/" className="text-6xl font-bold text-gray-700 mb-16">
          PUTS
        </Link>
        <img
          src={TimetableImage}
          alt="Timetable"
          className="w-4/5 h-64 object-cover"
        />
      </div>

      {/* Right side */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white">
        <Link
          to="/signup"
          className="w-1/4 text-center mb-8 py-4 px-8 text-3xl bg-blue-500 text-white rounded-lg transform transition duration-300 hover:scale-105"
        >
          Sign Up
        </Link>
        <Link
          to="/signin"
          className="w-1/4 text-center py-4 px-8 text-3xl bg-green-500 text-white rounded-lg transform transition duration-300 hover:scale-105"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default FirstPage;
