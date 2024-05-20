import React, { useState } from "react";
import "./Mainpage.css";
import "./TimetableManage.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./Mypage.css"; // Ensure the CSS file path is correct
import userImage from "./public/d.jpg"; // Update the path as necessary

const ClassroomGroup = () => {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅을 사용하여 이전 페이지에서 전달한 state를 받습니다.
  const { buildingName, classroomID } = location.state || {}; // 이전 페이지에서 받은 state를 구조 분해 할당으로 추출합니다.

  // 이제 buildingName과 classroomID를 사용하여 필요한 UI를 렌더링할 수 있습니다.
  const [groupInfo, setGroupInfo] = useState({
    groupName: "",
    groupDescription: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기서 groupInfo를 사용하여 처리할 로직을 추가합니다.
    console.log({ buildingName, classroomID, ...groupInfo }); // 콘솔에 정보 출력
    navigate("/Lecture"); // 다음 페이지 경로로 이동
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
        <div className="timetable-manage-container">
          <h2>STEP 4</h2>
          <h2>강의실 그룹 정보 입력</h2>
          <form className="classroomGroup-info-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="groupName">그룹 이름:</label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                value={groupInfo.groupName}
                onChange={(e) =>
                  setGroupInfo({ ...groupInfo, groupName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="groupDescription">그룹 설명:</label>
              <input
                type="text"
                id="groupDescription"
                name="groupDescription"
                value={groupInfo.groupDescription}
                onChange={(e) =>
                  setGroupInfo({
                    ...groupInfo,
                    groupDescription: e.target.value,
                  })
                }
              />
            </div>
            <button type="submit">정보 제출</button>
          </form>
          <Link to="/Classroom">뒤로가기</Link>
          <br />
          <Link to="/Mypage">마이 페이지로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
};

export default ClassroomGroup;
