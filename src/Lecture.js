import React, { useState } from "react";
import "./Mainpage.css";
import "./Lecture.css";
import "./TimetableManage.css";
import { Link, useNavigate } from "react-router-dom";
import "./Mypage.css"; // Ensure the CSS file path is correct
import userImage from "./public/d.jpg"; // Update the path as necessary
import timetableImage from "./public/timetable.jpg"; // Update the path as necessary

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];

const Lecture = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
  };

  const handleManageTimetable = () => {
    console.log("Timetable Management clicked");
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼의 기본 제출 동작을 방지
    navigate("/FinishInsert"); // Classroom 경로로 이동
    console.log(lectures);
  };

  const [lectures, setLectures] = useState([
    {
      lectureName: "",
      lectureTime: "",
      sections: [{ division: "", enrollment: "", sectionTime: "" }],
    },
  ]);

  const handleLectureChange = (index, event) => {
    const newLectures = [...lectures];
    newLectures[index][event.target.name] = event.target.value;
    setLectures(newLectures);
  };

  const handleSectionChange = (lectureIndex, sectionIndex, event) => {
    const newLectures = [...lectures];
    newLectures[lectureIndex].sections[sectionIndex][event.target.name] =
      event.target.value;
    setLectures(newLectures);
  };

  const addSection = (lectureIndex) => {
    const newLectures = [...lectures];
    newLectures[lectureIndex].sections.push({
      division: "",
      enrollment: "",
      sectionTime: "",
    });
    setLectures(newLectures);
  };

  const removeSection = (lectureIndex, sectionIndex) => {
    const newLectures = [...lectures];
    newLectures[lectureIndex].sections.splice(sectionIndex, 1);
    setLectures(newLectures);
  };

  const addLecture = () => {
    setLectures([
      ...lectures,
      {
        lectureName: "",
        lectureTime: "",
        sections: [{ division: "", enrollment: "", sectionTime: "" }],
      },
    ]);
  };

  const removeLecture = (lectureIndex) => {
    const newLectures = [...lectures];
    newLectures.splice(lectureIndex, 1);
    setLectures(newLectures);
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
          <h2>강의 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            {lectures.map((lecture, lectureIndex) => (
              <div key={lectureIndex} className="lecture">
                <input
                  type="text"
                  name="lectureName"
                  value={lecture.lectureName}
                  onChange={(e) => handleLectureChange(lectureIndex, e)}
                  placeholder="강의명"
                  className="lectureName"
                />
                <input
                  type="text"
                  name="lectureTime"
                  value={lecture.lectureTime}
                  onChange={(e) => handleLectureChange(lectureIndex, e)}
                  placeholder="강의 시간"
                />
                {lecture.sections.map((section, sectionIndex) => (
                  <div
                    key={`${lectureIndex}-${sectionIndex}`}
                    className="section"
                  >
                    <input
                      type="text"
                      name="division"
                      value={section.division}
                      onChange={(e) =>
                        handleSectionChange(lectureIndex, sectionIndex, e)
                      }
                      placeholder="분반"
                    />
                    <input
                      type="number"
                      name="enrollment"
                      value={section.enrollment}
                      onChange={(e) =>
                        handleSectionChange(lectureIndex, sectionIndex, e)
                      }
                      placeholder="수강 인원"
                    />
                    <input
                      type="text"
                      name="sectionTime"
                      value={section.sectionTime}
                      onChange={(e) =>
                        handleSectionChange(lectureIndex, sectionIndex, e)
                      }
                      placeholder="섹션 시간"
                    />
                    <button
                      type="button"
                      onClick={() => removeSection(lectureIndex, sectionIndex)}
                      className="delete-button"
                    >
                      분반 삭제
                    </button>
                  </div>
                ))}
                <button type="button" onClick={() => addSection(lectureIndex)}>
                  분반 추가
                </button>
                {lectures.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeLecture(lectureIndex)}
                    className="delete-button"
                  >
                    강의 삭제
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addLecture}>
              강의 추가
            </button>
            <button type="submit">제출</button>
          </form>
          <Link to="/ClassroomGroup">뒤로가기</Link>
          <br></br>
          <Link to="/Mypage">마이 페이지로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
};

export default Lecture;
