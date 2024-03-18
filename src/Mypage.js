import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Mypage.css"; // Ensure the CSS file path is correct
import userImage from "./public/d.jpg"; // Update the path as necessary
import timetableImage from "./public/timetable.jpg"; // Update the path as necessary
import { Fragment } from "https://cdn.skypack.dev/react";
import { render } from "https://cdn.skypack.dev/react-dom";

const ROOT_NODE = document.querySelector("#app");

const Button = ({ as, children, filled, secondary, ...rest }) => {
  const that = {
    as,
  };
  return (
    <that.as
      className={`dir-control ${secondary ? "dir-control--secondary" : ""} ${
        filled ? "dir-control--filled" : ""
      }`}
      {...rest}
    >
      {children}
      <span />
      <span />
      <span />
      <span />
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
      <b aria-hidden="true">{children}</b>
    </that.as>
  );
};
Button.defaultProps = {
  as: "button",
};

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
        <section className="main-content">
          <div className="date-title">
            <h2>2023-1학기</h2>
            <div className="mypage-buttons">
              <img
                src={timetableImage}
                alt="User"
                className="timetable-image"
              />
              <button className="add-comment-button">UPDATE</button>
              <button className="delete-button">DELETE</button>
            </div>
          </div>
          <div>
            <p>여기다가 코멘트 넣을 수 있게</p>
          </div>
          <div className="add-button">
            {/* <button
              className="add-item-button"
              onClick={() => console.log("Add Item clicked")}
            >
              +
            </button> */}
            <Fragment>
              <Button role="button">
                <Link to="/TimetableManage">+</Link>
              </Button>
            </Fragment>
          </div>
        </section>
      </div>
    </div>
  );
}

export default MyPage;
