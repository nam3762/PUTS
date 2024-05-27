import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";

const Classroom = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();
  const [classrooms, setClassrooms] = useState(
    formData.classrooms || [
      {
        buildingName: "",
        classroomID: "",
        capacity: "",
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
    setClassrooms([
      ...classrooms,
      { buildingName: "", classroomID: "", capacity: "" },
    ]);
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
              Edit Profile
            </button>
          </Link>
          <Link to="/timetablemanage" className="w-full">
            <button
              onClick={handleManageTimetable}
              className="bg-purple-500 text-white py-2 w-full rounded-md hover:bg-purple-700 transition duration-200"
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
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
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
                  <div>
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
                  <div>
                    <label
                      htmlFor={`capacity-${index}`}
                      className="block font-medium"
                    >
                      수용 인원:
                    </label>
                    <input
                      type="text"
                      id={`capacity-${index}`}
                      name="capacity"
                      value={classroom.capacity}
                      onChange={(e) => handleClassroomChange(index, e)}
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
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
