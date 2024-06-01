import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";

const ClassroomGroup = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();
  const initialGroupInfo = formData.groups || [
    {
      groupName: "",
      classrooms: [],
    },
  ];

  const [groupInfo, setGroupInfo] = useState(initialGroupInfo);
  const [selectedClassrooms, setSelectedClassrooms] = useState(
    new Array(initialGroupInfo.length).fill("")
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, groups: groupInfo });

    sessionStorage.setItem("groupInfo", JSON.stringify(groupInfo, null, 2));
    const Data = sessionStorage.getItem("groupInfo");
    console.log(Data);

    try {
      const response = await axios.post(
        "http://localhost:4000/create/ClassroomGroupProcess",
        {
          groupInfo: groupInfo,
        }
      );

      navigate("/Lecture");
    } catch (error) {
      console.error("폼 데이터 제출 실패", error); // 오류 로그
    }
  };

  const handleGroupChange = (index, event) => {
    const { name, value } = event.target;
    const newGroups = [...groupInfo];
    newGroups[index][name] = value;
    setGroupInfo(newGroups);
  };

  const addGroup = () => {
    setGroupInfo([...groupInfo, { groupName: "", classrooms: [] }]);
    setSelectedClassrooms([...selectedClassrooms, ""]);
  };

  const removeGroup = (index) => {
    const newGroups = [...groupInfo];
    newGroups.splice(index, 1);
    setGroupInfo(newGroups);
    const newSelectedClassrooms = [...selectedClassrooms];
    newSelectedClassrooms.splice(index, 1);
    setSelectedClassrooms(newSelectedClassrooms);
  };

  const addClassroomToGroup = (groupIndex, selectedClassroom) => {
    const newGroups = [...groupInfo];
    newGroups[groupIndex].classrooms.push(selectedClassroom);
    setGroupInfo(newGroups);
    const newSelectedClassrooms = [...selectedClassrooms];
    newSelectedClassrooms[groupIndex] = "";
    setSelectedClassrooms(newSelectedClassrooms);
  };

  const removeClassroomFromGroup = (groupIndex, classroomIndex) => {
    const newGroups = [...groupInfo];
    newGroups[groupIndex].classrooms.splice(classroomIndex, 1);
    setGroupInfo(newGroups);
  };

  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
  };

  const handleManageTimetable = () => {
    console.log("Timetable Management clicked");
  };

  const storedClassrooms =
    JSON.parse(sessionStorage.getItem("classrooms")) || [];

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full max-w-6xl mx-auto">
        <aside className="flex flex-col items-center bg-gray-100 p-6 md:w-1/4">
          <img
            src={userImage}
            alt="User"
            className="rounded-full w-32 h-32 object-cover mb-6"
          />
          <h2 className="text-xl font-semibold mb-2">
            <Link to="/mypage" className="text-gray-800">
              {nickname}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">{email}</p>
          <Link to="/editprofile" className="w-full">
            <button
              onClick={handleEditProfile}
              className="bg-indigo-500 text-white py-2 w-full rounded-md mb-2 hover:bg-indigo-700 transition duration-200"
            >
              개인 정보 수정
            </button>
          </Link>
          <Link to="/timetablemanage" className="w-full">
            <button
              onClick={handleManageTimetable}
              className="bg-purple-500 text-white py-2 w-full rounded-md hover:bg-purple-700 transition duration-200"
            >
              시간표 관리
            </button>
          </Link>
        </aside>
        <div className="flex-grow p-6">
          <h2 className="text-2xl font-bold mb-4">STEP 4</h2>
          <h2 className="text-xl font-semibold mb-6">강의실 그룹 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            {groupInfo.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="mb-6 p-4 border-2 border-blue-400 rounded"
              >
                <div className="mb-4">
                  <label
                    htmlFor={`groupName-${groupIndex}`}
                    className="block font-medium"
                  >
                    그룹 이름:
                  </label>
                  <input
                    type="text"
                    id={`groupName-${groupIndex}`}
                    name="groupName"
                    value={group.groupName}
                    onChange={(e) => handleGroupChange(groupIndex, e)}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                {group.classrooms.map((classroom, classroomIndex) => (
                  <div key={classroomIndex} className="mb-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block font-medium">건물명:</label>
                        <input
                          type="text"
                          value={classroom.buildingName}
                          className="mt-1 p-2 border rounded w-full"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block font-medium">
                          강의실 번호:
                        </label>
                        <input
                          type="text"
                          value={classroom.classroomID}
                          className="mt-1 p-2 border rounded w-full"
                          readOnly
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        removeClassroomFromGroup(groupIndex, classroomIndex)
                      }
                      className="py-2 px-4 bg-red-500 text-white rounded"
                    >
                      강의실 삭제
                    </button>
                  </div>
                ))}
                <div className="mb-4">
                  <label className="block font-medium">강의실 추가:</label>
                  <select
                    value={selectedClassrooms[groupIndex]}
                    onChange={(e) => {
                      const selectedClassroom = storedClassrooms.find(
                        (classroom) => classroom.classroomID === e.target.value
                      );
                      if (selectedClassroom) {
                        addClassroomToGroup(groupIndex, selectedClassroom);
                      }
                    }}
                    className="mt-1 p-2 border rounded w-full"
                  >
                    <option value="">강의실 선택</option>
                    {storedClassrooms
                      .filter(
                        (classroom) =>
                          !group.classrooms.some(
                            (selected) =>
                              selected.classroomID === classroom.classroomID
                          )
                      )
                      .map((classroom, index) => (
                        <option key={index} value={classroom.classroomID}>
                          {`${classroom.buildingName}-${classroom.classroomID}`}
                        </option>
                      ))}
                  </select>
                </div>
                {groupInfo.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeGroup(groupIndex)}
                    className="py-2 px-4 bg-red-500 text-white rounded"
                  >
                    그룹 삭제
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addGroup}
              className="py-2 px-4 bg-blue-500 text-white rounded mb-4"
            >
              그룹 추가
            </button>
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
