import React from "react";
import "./Mainpage.css";
import "./TimetableManage.css";
import { Link, useNavigate } from "react-router-dom";
import "./Mypage.css"; // Ensure the CSS file path is correct
import userImage from "./public/d.jpg"; // Update the path as necessary
import timetableImage from "./public/timetable.jpg"; // Update the path as necessary

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];

const ClassroomGroup = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지
    navigate("/Lecture"); // Classroom 경로로 이동
  };

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
  };

  const handleManageTimetable = () => {
    console.log("Timetable Management clicked");
  };

  return (
    <div className="home-container">
      <div className="mypage-container">
        <aside className="sidebar">
          <img src={userImage} alt="User" className="user-image" />
          <h2 className="user-name">
            <Link to="/Mypage">John jong-hoon</Link>
          </h2>
          <p className="user-email">John@example.com</p>
          <button onClick={handleEditProfile} className="edit-profile-button">
            <Link to="/EditProfile">Edit Profile</Link>
          </button>
          <button
            onClick={handleManageTimetable}
            className="timetable-management-button"
          >
            <Link to="/TimetableManage">Timetable Management</Link>
          </button>
        </aside>
        <div className="timetable-manage-container">
          <h2>강의실 그룹 정보 입력</h2>
          <form className="classroomGroup-info-form" onSubmit={handleSubmit}>
            <button type="submit">정보 제출</button>
          </form>
          <Link to="/Classroom">뒤로가기</Link>
          <br></br>
          <Link to="/Mypage">마이 페이지로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
};

export default ClassroomGroup;
