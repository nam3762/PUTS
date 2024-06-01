import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";
import "tailwindcss/tailwind.css";

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];
const periodLabels = Array.from({ length: 9 }, (_, i) => `${i + 1}교시`);

const dayMapping = {
  월요일: 1,
  화요일: 2,
  수요일: 3,
  목요일: 4,
  금요일: 5,
};

const periodMapping = periodLabels.reduce((acc, label, index) => {
  acc[label] = index + 1;
  return acc;
}, {});

const Professor = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const [professors, setProfessors] = useState(
    formData.professors || [
      {
        professorName: "",
        isProfessor: true,
        offTimes: [],
        hopeTimes: [],
      },
    ]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const mappedProfessors = professors.map((professor) => ({
      ...professor,
      offTimes: professor.offTimes.map((time) => ({
        day: dayMapping[time.day],
        period: parseInt(time.period.replace("교시", ""), 10),
      })),
      hopeTimes: professor.hopeTimes.map((time) => ({
        day: dayMapping[time.day],
        period: parseInt(time.period.replace("교시", ""), 10),
      })),
    }));

    try {
      sessionStorage.setItem(
        "professors",
        JSON.stringify(mappedProfessors,null,2)
      );
      const Data = sessionStorage.getItem("professors");
      console.log(Data);

      const response = await axios.post(
        "http://localhost:4000/create/ProfessorProcess",  
        {
          professors: Data,
        }
      );

      navigate("/Classroom");
    } catch (error) {
      console.log("실패");
    }
  };

  const handleProfessorChange = (index, event) => {
    const { name, value, checked, type } = event.target;
    const newProfessors = [...professors];

    if (type === "checkbox") {
      newProfessors[index][name] = checked;
    } else {
      newProfessors[index][name] = value;
    }

    setProfessors(newProfessors);
  };

  const toggleCell = (index, timeType, day, period) => {
    const newProfessors = [...professors];
    const currentTimes = newProfessors[index][timeType];
    const time = { day, period };

    if (currentTimes.some((t) => t.day === day && t.period === period)) {
      newProfessors[index][timeType] = currentTimes.filter(
        (t) => !(t.day === day && t.period === period)
      );
    } else {
      newProfessors[index][timeType] = [...currentTimes, time];
    }

    setProfessors(newProfessors);
  };

  const toggleAllDay = (index, timeType, day, checked) => {
    const newProfessors = [...professors];
    if (checked) {
      periodLabels.forEach((period) => {
        const time = { day, period };
        if (
          !newProfessors[index][timeType].some(
            (t) => t.day === day && t.period === period
          )
        ) {
          newProfessors[index][timeType].push(time);
        }
      });
    } else {
      newProfessors[index][timeType] = newProfessors[index][timeType].filter(
        (t) => t.day !== day
      );
    }
    setProfessors(newProfessors);
  };

  const addProfessor = (event) => {
    event.preventDefault();

    setProfessors([
      ...professors,
      { professorName: "", isProfessor: true, offTimes: [], hopeTimes: [] },
    ]);
  };

  const removeProfessor = (index) => {
    const newProfessors = [...professors];
    newProfessors.splice(index, 1);
    setProfessors(newProfessors);
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
          <h2 className="text-2xl font-bold mb-4">STEP 2</h2>
          <h2 className="text-xl font-semibold mb-6">교수 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            {professors.map((professor, index) => (
              <div
                key={index}
                className="mb-6 p-4 border-2 border-green-400 rounded"
              >
                <div className="mb-4">
                  <label
                    htmlFor={`professorName-${index}`}
                    className="block font-medium"
                  >
                    이름:
                  </label>
                  <input
                    type="text"
                    id={`professorName-${index}`}
                    name="professorName"
                    value={professor.professorName}
                    onChange={(e) => handleProfessorChange(index, e)}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium mb-2">
                    <input
                      type="checkbox"
                      name="isProfessor"
                      checked={professor.isProfessor}
                      onChange={(e) => handleProfessorChange(index, e)}
                      className="mr-2"
                    />
                    교수 여부 (미체크시 강사)
                  </label>
                </div>
                <div className="flex">
                  <div className="w-1/2 pr-2">
                    <fieldset className="mb-4">
                      <legend className="block font-medium mb-2 bg-red-500 rounded-md p-1 text-white">
                        강의 불가능한 시간
                      </legend>
                      <div className="grid grid-cols-5 gap-2">
                        {weekdays.map((day, dayIndex) => (
                          <div key={dayIndex} className="flex flex-col">
                            <div className="flex items-center justify-center mb-2">
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  toggleAllDay(
                                    index,
                                    "offTimes",
                                    day,
                                    e.target.checked
                                  )
                                }
                                className="mr-2"
                              />
                              <span className="font-semibold">{day}</span>
                            </div>
                            {periodLabels.map((period, periodIndex) => (
                              <div
                                key={periodIndex}
                                onClick={() =>
                                  toggleCell(index, "offTimes", day, period)
                                }
                                className={`w-full h-12 flex items-center justify-center cursor-pointer border rounded 
                                hover:bg-red-400 transition duration-200 ${
                                  professor.offTimes.some(
                                    (t) => t.day === day && t.period === period
                                  )
                                    ? "bg-red-500"
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
                  <div className="w-1/2 pl-2">
                    <fieldset className="mb-4">
                      <legend className="block font-medium mb-2 bg-green-500 rounded-md p-1 text-white">
                        선호 시간
                      </legend>
                      <div className="grid grid-cols-5 gap-2">
                        {weekdays.map((day, dayIndex) => (
                          <div key={dayIndex} className="flex flex-col">
                            <div className="flex items-center justify-center mb-2">
                              <input
                                type="checkbox"
                                onChange={(e) =>
                                  toggleAllDay(
                                    index,
                                    "hopeTimes",
                                    day,
                                    e.target.checked
                                  )
                                }
                                className="mr-2"
                              />
                              <span className="font-semibold">{day}</span>
                            </div>
                            {periodLabels.map((period, periodIndex) => (
                              <div
                                key={periodIndex}
                                onClick={() =>
                                  toggleCell(index, "hopeTimes", day, period)
                                }
                                className={`w-full h-12 flex items-center justify-center cursor-pointer border rounded 
                                hover:bg-green-400 transition duration-200 ${
                                  professor.hopeTimes.some(
                                    (t) => t.day === day && t.period === period
                                  )
                                    ? "bg-green-500"
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
                </div>
                {professors.length > 1 && (
                  <button
                    onClick={() => removeProfessor(index)}
                    className="py-2 px-4 bg-red-500 text-white rounded mb-4"
                  >
                    교수 삭제
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addProfessor}
              className="py-2 px-4 bg-blue-500 text-white rounded mb-4"
            >
              교수 추가
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded"
            >
              정보 제출
            </button>
          </form>
          <Link
            to="/TimetableManage"
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

export default Professor;
