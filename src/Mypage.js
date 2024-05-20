import React from "react";
import { Link } from "react-router-dom";
import "./Mypage.css"; // Ensure the CSS file path is correct
import userImage from "./public/d.jpg"; // Update the path as necessary

function MyPage() {
  // Example functionality for handling button clicks
  // 댓글 박스 컴포넌트를 관리하기 위한 상태
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
          <Link to="/EditProfile">
            <button onClick={handleEditProfile} className="edit-profile-button">
              Edit Profile
            </button>
          </Link>
          <Link to="/TimetableManage">
            <button
              onClick={handleManageTimetable}
              className="timetable-management-button"
            >
              Timetable Management
            </button>
          </Link>
        </aside>
        <section className="main-content">
          <div className="date-title">
            <h2>2023-1학기</h2>
            <div className="mypage-buttons">
              <button className="add-comment-button">UPDATE</button>
              <button className="delete-button">DELETE</button>
            </div>
          </div>
          <div>
            <p>Timetable description</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyPage;
