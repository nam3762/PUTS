import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";

const TimetableManage = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { timetableName, timetableDescription } = formData;
    
    try {
      const response = await axios.post("http://localhost:4000/create/TimetableManageProcess", {
        timetableName,
        timetableDescription,
      });

      sessionStorage.setItem("timetableName", response.data.timetableName);
      sessionStorage.setItem("timetableDescription", response.data.timetableDescription);

      console.log(sessionStorage.getItem("timetableName"));
      console.log(sessionStorage.getItem("timetableDescription"));
  
      navigate("/Professor");
    } catch (error) {
      console.log("실패")
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          <h2 className="text-2xl font-bold mb-4">STEP 1</h2>
          <h2 className="text-xl font-semibold mb-6">시간표 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="timetableName" className="block font-medium">
                시간표 이름:
              </label>
              <input
                type="text"
                id="timetableName"
                name="timetableName"
                value={formData.timetableName}
                onChange={handleChange}
                required
                className="mt-1 p-2 border rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="timetableDescription"
                className="block font-medium"
              >
                시간표 설명:
              </label>
              <input
                type="text"
                id="timetableDescription"
                name="timetableDescription"
                value={formData.timetableDescription}
                onChange={handleChange}
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
          <Link to="/Mypage" className="block mt-4 text-blue-500 underline">
            마이 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimetableManage;
