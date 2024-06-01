import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import userImage from "./public/d.jpg";

function FinishInsert() {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");
  const navigate = useNavigate();

  useEffect(() => {
    const sendAllData = async () => {
      const timetableName = sessionStorage.getItem("timetableName");
      const timetableDescription = sessionStorage.getItem(
        "timetableDescription"
      );
      const professors = sessionStorage.getItem("professors");
      const classrooms = sessionStorage.getItem("classrooms");
      const groupInfo = sessionStorage.getItem("groupInfo");
      const lectures = sessionStorage.getItem("lectures");

      try {
        const response = await axios.post(
          "http://localhost:4000/generate/FinishInsertProcess",
          {
            timetableName,
            timetableDescription,
            professors,
            classrooms,
            groupInfo,
            lectures,
          }
        );

        console.log("데이터 전송 성공", response.data);
        // 필요한 경우 response.data를 사용하여 추가 작업을 수행합니다.
      } catch (error) {
        console.error("데이터 전송 실패", error);
      }
    };

    sendAllData();
  }, []);

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
        <div className="max-w-3xl mx-auto my-5 p-5 shadow-xl rounded-sm">
          <h2 className="text-center mb-5">입력 끝</h2>
          <div className="flex items-center flex-col">
            <h3>시간표를 생성중입니다...</h3>
            <br></br>
            <FontAwesomeIcon
              icon={faCircleNotch}
              className="animate-spin"
              size="xl"
            />
          </div>
          <br></br>
          <Link to="/Mypage" className="text-blue-700">
            마이 페이지로 돌아가기(돌아가도 입력은 저장됨)
          </Link>
          <br></br>
          <Link to="/ModifyTimetable" className="text-rose-500">
            시간표 수정
          </Link>
          <br></br>
          <Link to="/" className="text-green-500">
            이미지 저장
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FinishInsert;
