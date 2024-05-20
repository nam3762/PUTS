import React from "react";
import "./Mainpage.css";
import "./TimetableManage.css";
import { Link } from "react-router-dom";
import "./Mypage.css"; // Ensure the CSS file path is correct
import timetableImage from "./public/timetable.jpg"; // Update the path as necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const FinishInsert = () => (
  <div className="max-w-3xl mx-auto my-20 p-5 shadow-xl rounded-sm">
    <h2 className="text-center mb-5">입력 끝</h2>
    <div className="flex items-center flex-col">
      <img
        src={timetableImage}
        alt="User"
        className="inline-block w-[360px] h-[180px] object-cover mb-5"
      />
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
    <Link to="/" className="text-rose-500">
      이미지 저장
    </Link>
  </div>
);

export default FinishInsert;
