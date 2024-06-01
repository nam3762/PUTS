import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Lecture = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const [lectures, setLectures] = useState(
    formData.lectures.map((lecture) => ({
      name: lecture.name || "",
      code: lecture.code || "",
      year: lecture.year || "",
      group: lecture.group || "",
      major_required: lecture.major_required || false,
      sections: lecture.sections.map((section) => ({
        division: section.division || "",
        sectionTime: section.sectionTime || "",
        capacity: section.capacity || "",
        professorCode: section.professorCode || "", // 교수 코드 추가
      })),
    }))
  );
  const [groupOptions, setGroupOptions] = useState([]);
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    const groups = formData.groups || [];
    setGroupOptions(groups.map((group) => group.groupName));

    // 세션에서 교수 목록 가져오기
    const storedProfessors =
      JSON.parse(sessionStorage.getItem("professors")) || [];
    setProfessors(storedProfessors);
  }, [formData.groups]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, lectures });

    try {
      const response = await axios.post(
        "http://localhost:4000/create/LectureProcess",
        {
          lectures,
        }
      );

      sessionStorage.setItem(
        "lectures",
        JSON.stringify(response.data.lectures)
      );

      navigate("/FinishInsert");
    } catch (error) {
      console.error("폼 데이터 제출 실패", error);
    }
  };

  const handleLectureChange = (index, event) => {
    const newLectures = [...lectures];
    const { name, value, type, checked } = event.target;
    newLectures[index][name] = type === "checkbox" ? checked : value;
    if (name === "year") {
      newLectures[index][name] = parseInt(value, 10);
    }
    setLectures(newLectures);
  };

  const handleSectionChange = (lectureIndex, sectionIndex, event) => {
    const newLectures = [...lectures];
    const { name, value } = event.target;
    if (name === "sectionTime" || name === "capacity") {
      newLectures[lectureIndex].sections[sectionIndex][name] = parseInt(
        value,
        10
      );
    } else {
      newLectures[lectureIndex].sections[sectionIndex][name] = value;
    }
    setLectures(newLectures);
  };

  const handleProfessorChange = (lectureIndex, sectionIndex, event) => {
    const newLectures = [...lectures];
    newLectures[lectureIndex].sections[sectionIndex].professorCode =
      event.target.value;
    setLectures(newLectures);
  };

  const handleGroupRadioChange = (lectureIndex, group) => {
    const newLectures = [...lectures];
    newLectures[lectureIndex].group = group;
    setLectures(newLectures);
  };

  const addSection = (lectureIndex) => {
    const newLectures = [...lectures];
    newLectures[lectureIndex].sections.push({
      division: "",
      sectionTime: "",
      capacity: "",
      professorCode: "", // 교수 코드 추가
    });
    setLectures(newLectures);
  };

  const removeSection = (lectureIndex, sectionIndex) => {
    if (lectures[lectureIndex].sections.length > 1) {
      const newLectures = [...lectures];
      newLectures[lectureIndex].sections.splice(sectionIndex, 1);
      setLectures(newLectures);
    }
  };

  const addLecture = () => {
    setLectures([
      ...lectures,
      {
        name: "",
        code: "",
        year: "",
        group: "",
        major_required: false,
        sections: [
          { division: "", sectionTime: "", capacity: "", professorCode: "" },
        ],
      },
    ]);
  };

  const removeLecture = (lectureIndex) => {
    if (lectures.length > 1) {
      const newLectures = [...lectures];
      newLectures.splice(lectureIndex, 1);
      setLectures(newLectures);
    }
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
          <h2 className="text-2xl font-bold mb-4">STEP 5</h2>
          <h2 className="text-xl font-semibold mb-6">교과목 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            {lectures.map((lecture, lectureIndex) => (
              <div
                key={lectureIndex}
                className="mb-6 p-4 border-2 border-green-400 rounded"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="form-group">
                    <label
                      htmlFor={`name-${lectureIndex}`}
                      className="block font-medium"
                    >
                      교과목명:
                    </label>
                    <input
                      type="text"
                      id={`name-${lectureIndex}`}
                      name="name"
                      value={lecture.name}
                      onChange={(e) => handleLectureChange(lectureIndex, e)}
                      placeholder="교과목명"
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor={`code-${lectureIndex}`}
                      className="block font-medium"
                    >
                      교과목 코드:
                    </label>
                    <input
                      type="text"
                      id={`code-${lectureIndex}`}
                      name="code"
                      value={lecture.code}
                      onChange={(e) => handleLectureChange(lectureIndex, e)}
                      placeholder="교과목 코드"
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor={`year-${lectureIndex}`}
                      className="block font-medium"
                    >
                      학년:
                    </label>
                    <input
                      type="number"
                      id={`year-${lectureIndex}`}
                      name="year"
                      value={lecture.year}
                      onChange={(e) => handleLectureChange(lectureIndex, e)}
                      placeholder="학년"
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <div className="form-group md:col-span-3 flex items-center mb-2">
                    <label className="block font-medium mr-4">
                      강의실 그룹:
                    </label>
                    <div className="flex flex-wrap mr-4">
                      {groupOptions.map((group, idx) => (
                        <div key={idx} className="mr-4">
                          <label>
                            <input
                              type="radio"
                              name={`group-${lectureIndex}`}
                              value={group}
                              checked={lecture.group === group}
                              onChange={() =>
                                handleGroupRadioChange(lectureIndex, group)
                              }
                              className="mr-2"
                            />
                            {group}
                          </label>
                        </div>
                      ))}
                    </div>
                    <label className="block font-medium">
                      <input
                        type="checkbox"
                        name="major_required"
                        checked={lecture.major_required}
                        onChange={(e) => handleLectureChange(lectureIndex, e)}
                        className="mr-2"
                      />
                      전공 필수
                    </label>
                  </div>
                </div>
                {lecture.sections.map((section, sectionIndex) => (
                  <div
                    key={`${lectureIndex}-${sectionIndex}`}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 border rounded"
                  >
                    <div className="form-group">
                      <label
                        htmlFor={`division-${lectureIndex}-${sectionIndex}`}
                        className="block font-medium"
                      >
                        분반:
                      </label>
                      <input
                        type="text"
                        id={`division-${lectureIndex}-${sectionIndex}`}
                        name="division"
                        value={section.division}
                        onChange={(e) =>
                          handleSectionChange(lectureIndex, sectionIndex, e)
                        }
                        placeholder="분반"
                        className="mt-1 p-2 border rounded w-full"
                      />
                    </div>
                    <div className="form-group relative">
                      <label
                        htmlFor={`sectionTime-${lectureIndex}-${sectionIndex}`}
                        className="block font-medium flex items-center"
                      >
                        섹션 시간:
                        <span
                          className="ml-2 text-rose-500 cursor-pointer border border-black w-4 h-4 rounded-full flex items-center justify-center text-xs"
                          data-tooltip-id={`tooltip-${lectureIndex}-${sectionIndex}`}
                          data-tooltip-content="총 강의시간이 아닌 몇 시간씩 나누어 강의할지를 의미함"
                        >
                          ?
                        </span>
                      </label>
                      <Tooltip id={`tooltip-${lectureIndex}-${sectionIndex}`} />
                      <input
                        type="text"
                        id={`sectionTime-${lectureIndex}-${sectionIndex}`}
                        name="sectionTime"
                        value={section.sectionTime}
                        onChange={(e) =>
                          handleSectionChange(lectureIndex, sectionIndex, e)
                        }
                        placeholder="섹션 시간"
                        className="mt-1 p-2 border rounded w-full"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor={`capacity-${lectureIndex}-${sectionIndex}`}
                        className="block font-medium"
                      >
                        수강 인원:
                      </label>
                      <input
                        type="number"
                        id={`capacity-${lectureIndex}-${sectionIndex}`}
                        name="capacity"
                        value={section.capacity}
                        onChange={(e) =>
                          handleSectionChange(lectureIndex, sectionIndex, e)
                        }
                        placeholder="수강 인원"
                        className="mt-1 p-2 border rounded w-full"
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor={`professor-${lectureIndex}-${sectionIndex}`}
                        className="block font-medium"
                      >
                        교수:
                      </label>
                      <select
                        id={`professor-${lectureIndex}-${sectionIndex}`}
                        name="professor"
                        value={section.professorCode}
                        onChange={(e) =>
                          handleProfessorChange(lectureIndex, sectionIndex, e)
                        }
                        className="mt-1 p-2 border rounded w-full"
                      >
                        <option value="">교수 선택</option>
                        {professors.map((professor, idx) => (
                          <option key={idx} value={professor.professorCode}>
                            {professor.professorName}-{professor.professorCode}
                          </option>
                        ))}
                      </select>
                    </div>
                    {lecture.sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeSection(lectureIndex, sectionIndex)
                        }
                        className="md:col-span-3 py-2 px-4 bg-red-500 text-white rounded"
                      >
                        분반 삭제
                      </button>
                    )}
                  </div>
                ))}
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => addSection(lectureIndex)}
                    className="py-2 px-4 bg-blue-500 text-white rounded"
                  >
                    분반 추가
                  </button>
                  {lectures.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLecture(lectureIndex)}
                      className="py-2 px-4 bg-red-500 text-white rounded"
                    >
                      강의 삭제
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={addLecture}
                className="py-2 px-4 bg-blue-500 text-white rounded"
              >
                강의 추가
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-green-500 text-white rounded"
              >
                제출
              </button>
            </div>
          </form>
          <Link
            to="/ClassroomGroup"
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

export default Lecture;
