import React from "react";
import "./Mainpage.css";
import "./TimetableManage.css";
import { Link, useNavigate } from "react-router-dom";
import "./Mypage.css"; // Ensure the CSS file path is correct
import userImage from "./public/d.jpg"; // Update the path as necessary
import timetableImage from "./public/timetable.jpg"; // Update the path as necessary

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];

const FinishInsert = () => (
  <div className="timetable-manage-container">
    <h2>입력 끝</h2>
    <Link to="/Lecture">뒤로가기</Link>
    <br></br>
    <Link to="/Mypage">마이 페이지로 돌아가기</Link>
  </div>
);

export default FinishInsert;
