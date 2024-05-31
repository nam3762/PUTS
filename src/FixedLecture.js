import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";
import "tailwindcss/tailwind.css";

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];
const periods = Array.from({ length: 9 }, (_, i) => `${i + 1}교시`);

const FixedLecture = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const [lecture, setLecture] = useState({
    lectureName: "",
    lectureYear: "",
    lectureDay: [],
    lectureTime: [],
    division: "",
    professor: "",
    building: "",
    classroomNo: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, fixedLecture: lecture });

    try {
      const response = await axios.post(
        "http://localhost:4000/create/FixedLectureProcess",
        {
          lecture,
        }
      );

      sessionStorage.setItem(
        "fixedLecture",
        JSON.stringify(response.data.lecture)
      );

      navigate("/NextStep"); // 다음 스텝 페이지로 이동
    } catch (error) {
      console.error("폼 데이터 제출 실패", error); // 오류 로그
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLecture({ ...lecture, [name]: value });
  };

  const toggleCell = (timeType, day, period) => {
    const currentTimes = lecture[timeType];
    const time = { day, period };

    if (currentTimes.some((t) => t.day === day && t.period === period)) {
      setLecture({
        ...lecture,
        [timeType]: currentTimes.filter(
          (t) => !(t.day === day && t.period === period)
        ),
      });
    } else {
      setLecture({
        ...lecture,
        [timeType]: [...currentTimes, time],
      });
    }
  };

  const toggleAllDay = (timeType, day, checked) => {
    if (checked) {
      periods.forEach((period) => {
        const time = { day, period };
        if (
          !lecture[timeType].some((t) => t.day === day && t.period === period)
        ) {
          lecture[timeType].push(time);
        }
      });
    } else {
      lecture[timeType] = lecture[timeType].filter((t) => t.day !== day);
    }
    setLecture({ ...lecture });
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
          <h2 className="text-2xl font-bold mb-4">STEP 0</h2>
          <h2 className="text-xl font-semibold mb-6">고정된 강의 입력</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-group">
                <label htmlFor="lectureName" className="block font-medium">
                  강의명:
                </label>
                <input
                  type="text"
                  id="lectureName"
                  name="lectureName"
                  value={lecture.lectureName}
                  onChange={handleChange}
                  placeholder="강의명"
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lectureYear" className="block font-medium">
                  학년:
                </label>
                <input
                  type="number"
                  id="lectureYear"
                  name="lectureYear"
                  value={lecture.lectureYear}
                  onChange={handleChange}
                  placeholder="학년"
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="form-group">
                <label htmlFor="division" className="block font-medium">
                  분반:
                </label>
                <input
                  type="text"
                  id="division"
                  name="division"
                  value={lecture.division}
                  onChange={handleChange}
                  placeholder="분반"
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="form-group">
                <label htmlFor="professor" className="block font-medium">
                  교수명:
                </label>
                <input
                  type="text"
                  id="professor"
                  name="professor"
                  value={lecture.professor}
                  onChange={handleChange}
                  placeholder="교수명"
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="form-group">
                <label htmlFor="building" className="block font-medium">
                  건물명:
                </label>
                <input
                  type="text"
                  id="building"
                  name="building"
                  value={lecture.building}
                  onChange={handleChange}
                  placeholder="건물명"
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="form-group">
                <label htmlFor="classroomNo" className="block font-medium">
                  강의실 번호:
                </label>
                <input
                  type="text"
                  id="classroomNo"
                  name="classroomNo"
                  value={lecture.classroomNo}
                  onChange={handleChange}
                  placeholder="강의실 번호"
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row mb-6">
              <fieldset className="mb-4 md:w-1/2 md:pr-2">
                <legend className="block font-medium mb-2">
                  요일 및 시간:
                </legend>
                <div className="grid grid-cols-5 gap-2">
                  {weekdays.map((day, dayIndex) => (
                    <div key={dayIndex} className="flex flex-col">
                      <div className="flex items-center justify-center mb-2">
                        <span className="font-semibold">{day}</span>
                      </div>
                      {periods.map((period, periodIndex) => (
                        <div
                          key={periodIndex}
                          onClick={() => toggleCell("lectureDay", day, period)}
                          className={`w-full h-12 flex items-center justify-center cursor-pointer border rounded ${
                            lecture.lectureDay.some(
                              (t) => t.day === day && t.period === period
                            )
                              ? "bg-blue-500"
                              : "bg-white"
                          }`}
                        >
                          {period}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded"
            >
              제출
            </button>
          </form>
          <Link
            to="/previousPage"
            className="block mt-4 text-blue-500 underline"
          >
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

export default FixedLecture;
