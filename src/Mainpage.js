import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import previewIcon from "./public/timetable-i3.png"; // 실제 이미지 파일 경로에 맞게 조정하세요

const MainPage = () => {
  useEffect(() => {
    // Navbar.js의 높이에 해당하는 값을 스크롤 다운합니다.
    // 64px는 Navbar.js의 대략적인 높이입니다.
    // 정확한 높이를 알고 있다면 그 값을 사용하세요.
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex items-center flex-col min-h-screen w-full px-24 pt-24">
      {/* Navbar */}

      {/* Hero Section */}
      <div className="flex items-start w-full px-6 pb-40 md:g-8 md:pt-6 md:pb-6">
        <div className="flex item-start flex-col w-1/2">
          <h1 className="text-neutral-900 text-3xl max-w-5xl font-normal pb-64 leading-loose">
            Do not need to
            <br />
            Schedule timetable
            <br />
            <br />
            <span className="text-sky-700">PUTS</span>
            <br />
            Makes easy for you
          </h1>
        </div>
        <div className="flex relative w-4/5 md:w-full items-center flex-col bg-neutral-300 rounded-xl max-w-xl">
          <img
            alt="Preview"
            src={previewIcon}
            className="object-cover w-full"
          />
        </div>
      </div>
      <div>
        <Link to="/signup">
          <button className="flex items-center justify-center cursor-pointer transition duration-300 py-4 px-8 rounded-full bg-green-400 hover:opacity-70 text-neutral-900 hover:text-white">
            <span className="text-2xl">Let’s start</span>
          </button>
        </Link>
      </div>
      {/* <div className="flex flex-col justify-center items-center w-full pt-48 pb-16">
        <div className="flex w-full justify-center items-center">
          <div className="flex relative w-4/5 md:w-full items-center flex-col bg-neutral-300 rounded-xl max-w-2xl">
            <img
              alt="Preview"
              src={previewIcon}
              className="object-cover w-full"
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default MainPage;
