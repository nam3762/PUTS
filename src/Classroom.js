import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Classroom.css"; // CSS 파일 경로 확인
import "./Mypage.css"; // Ensure the CSS file path is correct
import userImage from "./public/d.jpg"; // Update the path as necessary
import timetableImage from "./public/timetable.jpg"; // Update the path as necessary

const Classroom = () => {
  const navigate = useNavigate();
  // 상태를 추가합니다.
  const [buildingName, setBuildingName] = useState("");
  const [classroomID, setClassroomID] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/ClassroomGroup", { state: { buildingName, classroomID } }); // 상태를 넘겨줍니다.
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
          <h2>강의실 정보 입력</h2>
          <form className="classroom-info-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="buildingName">건물명:</label>
              <input
                type="text"
                id="buildingName"
                name="buildingName"
                required
                value={buildingName}
                onChange={(e) => setBuildingName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="classroomID">강의실 번호:</label>
              <input
                type="text"
                id="classroomID"
                name="classroomID"
                required
                value={classroomID}
                onChange={(e) => setClassroomID(e.target.value)}
              />
            </div>
            <button type="submit">정보 제출</button>
          </form>
          <Link to="/TimetableManage">뒤로가기</Link>
          <br></br>
          <Link to="/Mypage">마이 페이지로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
};

export default Classroom;
