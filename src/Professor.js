import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";

const weekdays = ["월요일", "화요일", "수요일", "목요일", "금요일"];

const Professor = () => {
  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const [professors, setProfessors] = useState(
    formData.professors || [
      {
        professorName: "",
        offDays: [],
      },
    ]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, professors });
    navigate("/Classroom");
  };

  const handleProfessorChange = (index, event) => {
    const { name, value, checked } = event.target;
    const newProfessors = [...professors];

    if (name === "offDays") {
      const newOffDays = checked
        ? [...newProfessors[index].offDays, value]
        : newProfessors[index].offDays.filter((day) => day !== value);
      newProfessors[index].offDays = newOffDays;
    } else {
      newProfessors[index][name] = value;
    }

    setProfessors(newProfessors);
  };

  const addProfessor = () => {
    setProfessors([...professors, { professorName: "", offDays: [] }]);
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
                <fieldset className="mb-4">
                  <legend className="block font-medium mb-2">Off-day:</legend>
                  <div className="flex flex-wrap">
                    {weekdays.map((day, dayIndex) => (
                      <label key={dayIndex} className="mr-4">
                        <input
                          type="checkbox"
                          name="offDays"
                          value={day}
                          checked={professor.offDays.includes(day)}
                          onChange={(e) => handleProfessorChange(index, e)}
                          className="mr-1"
                        />
                        {day}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {professors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProfessor(index)}
                    className="py-2 px-4 bg-red-500 text-white rounded"
                  >
                    교수 삭제
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
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
