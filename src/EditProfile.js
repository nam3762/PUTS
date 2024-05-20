import React from "react";
import "./Mainpage.css"; // Ensure the CSS file path is correct
import { Link } from "react-router-dom";
import "./Mypage.css"; // Ensure the CSS file path is correct
import userImage from "./public/d.jpg"; // Update the path as necessary

function EditProfile() {
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
          <div className="home-signup">
            <div className="home-header">
              <form className="signup-form">
                <h2>개인정보 수정</h2>
                <div className="form-field">
                  <label htmlFor="name">바꿀 닉네임</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Password</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-field">
                  <label htmlFor="password">Confirm Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                  />
                </div>
                <div className="form-field">
                  {/* Adjusted button logic for React */}
                  <button type="submit" className="signup-button">
                    변경하기
                  </button>
                </div>
                <div className="form-divider"></div>
                <div className="form-field google-signup"></div>
              </form>
            </div>
          </div>
          <div className="add-button">
            <button
              className="add-item-button"
              onClick={() => console.log("Add Item clicked")}
            >
              +
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default EditProfile;
