import React from "react";
import "./Mainpage.css";
import "./TimetableManage.css";
import { Link, useNavigate } from "react-router-dom";
import "./Mypage.css"; // Ensure the CSS file path is correct
import userImage from "./public/d.jpg"; // Update the path as necessary
import timetableImage from "./public/timetable.jpg"; // Update the path as necessary

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];

const Professor = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지
    navigate("/Classroom"); // Classroom 경로로 이동
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
          <h2>교수 정보 입력</h2>
          <form className="professor-info-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="professorName">이름:</label>
              <input
                type="text"
                id="professorName"
                name="professorName"
                required
              />
            </div>
            <fieldset className="form-group">
              <legend>Off-day:</legend>
              <div className="checkbox-container">
                {weekdays.map((day, index) => (
                  <label key={index} className="checkbox-label">
                    <input type="checkbox" id={day} name="offDay" value={day} />
                    {day}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="submit">정보 제출</button>
          </form>
          <Link to="/Mypage">마이 페이지로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
};

export default Professor;
