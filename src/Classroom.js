import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";

const Classroom = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState(
    formData.classrooms || [
      {
        buildingName: "",
        classroomID: "",
      },
    ]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, classrooms });
    navigate("/ClassroomGroup");
  };

  const handleClassroomChange = (index, event) => {
    const { name, value } = event.target;
    const newClassrooms = [...classrooms];
    newClassrooms[index][name] = value;
    setClassrooms(newClassrooms);
  };

  const addClassroom = () => {
    setClassrooms([...classrooms, { buildingName: "", classroomID: "" }]);
  };

  const removeClassroom = (index) => {
    const newClassrooms = [...classrooms];
    newClassrooms.splice(index, 1);
    setClassrooms(newClassrooms);
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
          <h2 className="text-2xl font-bold mb-4">STEP 3</h2>
          <h2 className="text-xl font-semibold mb-6">강의실 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            {classrooms.map((classroom, index) => (
              <div
                key={index}
                className="mb-6 p-4 border-2 border-green-400 rounded"
              >
                <div className="mb-4">
                  <label
                    htmlFor={`buildingName-${index}`}
                    className="block font-medium"
                  >
                    건물명:
                  </label>
                  <input
                    type="text"
                    id={`buildingName-${index}`}
                    name="buildingName"
                    value={classroom.buildingName}
                    onChange={(e) => handleClassroomChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor={`classroomID-${index}`}
                    className="block font-medium"
                  >
                    강의실 번호:
                  </label>
                  <input
                    type="text"
                    id={`classroomID-${index}`}
                    name="classroomID"
                    value={classroom.classroomID}
                    onChange={(e) => handleClassroomChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                {classrooms.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeClassroom(index)}
                    className="py-2 px-4 bg-red-500 text-white rounded"
                  >
                    강의실 삭제
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addClassroom}
              className="py-2 px-4 bg-blue-500 text-white rounded mb-4"
            >
              강의실 추가
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded"
            >
              정보 제출
            </button>
          </form>
          <Link to="/Professor" className="block mt-4 text-blue-500 underline">
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

export default Classroom;
