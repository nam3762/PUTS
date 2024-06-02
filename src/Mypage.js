import React from "react";
import { Link } from "react-router-dom";
import userImage from "./public/d.jpg";
import timetableImage from "./public/professor_schedules.png";

function MyPage() {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  // Example functionality for handling button clicks
  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
  };

  const handleManageTimetable = () => {
    console.log("Timetable Management clicked");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-white shadow-lg mt-10">
        <aside className="flex flex-col items-center bg-gray-100 p-6 md:w-1/4">
          <img
            src={userImage}
            alt="User"
            className="rounded-full w-32 h-32 object-cover mb-6"
          />
          <h2 className="text-xl font-semibold mb-2">
            <Link to="/mypage" className="text-gray-800">
              {nickname}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">{email}</p>
          <Link to="/editprofile" className="w-full">
            <button
              onClick={handleEditProfile}
              className="bg-indigo-500 text-white py-2 w-full rounded-md mb-2 hover:bg-indigo-700 transition duration-200"
            >
              개인 정보 수정
            </button>
          </Link>
          <Link to="/timetablemanage" className="w-full">
            <button
              onClick={handleManageTimetable}
              className="bg-purple-500 text-white py-2 w-full rounded-md hover:bg-purple-700 transition duration-200"
            >
              시간표 관리
            </button>
          </Link>
        </aside>
        <section className="flex-1 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">2024-1학기</h2>
            <div>
              <button className="bg-green-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-green-700 transition duration-200">
                수정
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200">
                삭제
              </button>
            </div>
          </div>
          <div>
            <p className="text-gray-700">소프트웨어학과 전체 시간표</p>
            <img
              src={timetableImage}
              alt="User"
              className="object-cover my-6"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyPage;
