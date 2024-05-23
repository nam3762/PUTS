import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";

const ClassroomGroup = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();
  const [groupInfo, setGroupInfo] = useState({
    groupName: formData.groupName,
    groupDescription: formData.groupDescription,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, ...groupInfo });
    navigate("/Lecture");
  };

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
  };

  const handleManageTimetable = () => {
    console.log("Timetable Management clicked");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-6xl mx-auto">
        <aside className="w-64 p-6 bg-gray-100 border-r border-gray-300">
          <img
            src={userImage}
            alt="User"
            className="w-24 h-24 rounded-full mb-4 mx-auto"
          />
          <h2 className="text-center text-xl font-semibold mb-2">
            <Link to="/Mypage">John jong-hoon</Link>
          </h2>
          <p className="text-center text-gray-600 mb-4">John@example.com</p>
          <Link to="/EditProfile">
            <button
              onClick={handleEditProfile}
              className="w-full py-2 mb-2 bg-blue-500 text-white rounded"
            >
              Edit Profile
            </button>
          </Link>
          <Link to="/TimetableManage">
            <button
              onClick={handleManageTimetable}
              className="w-full py-2 bg-blue-500 text-white rounded"
            >
              Timetable Management
            </button>
          </Link>
        </aside>
        <div className="flex-grow p-6">
          <h2 className="text-2xl font-bold mb-4">STEP 4</h2>
          <h2 className="text-xl font-semibold mb-6">강의실 그룹 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="groupName" className="block font-medium">
                그룹 이름:
              </label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                value={groupInfo.groupName}
                onChange={(e) =>
                  setGroupInfo({ ...groupInfo, groupName: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="groupDescription" className="block font-medium">
                그룹 설명:
              </label>
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
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded"
            >
              정보 제출
            </button>
          </form>
          <Link to="/Classroom" className="block mt-4 text-blue-500 underline">
            뒤로가기
          </Link>
          <br />
          <Link to="/Mypage" className="block mt-2 text-blue-500 underline">
            마이 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClassroomGroup;
