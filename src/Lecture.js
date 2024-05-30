import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "./FormContext";
import userImage from "./public/d.jpg";

const Lecture = () => {
  const email = localStorage.getItem("email");
  const nickname = localStorage.getItem("nickname");

  const { formData, setFormData } = useContext(FormContext);
  const navigate = useNavigate();

  const [lectures, setLectures] = useState(formData.lectures);
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    // STEP 4에서 입력된 강의실 그룹 이름을 드롭다운 메뉴에 전달
    setGroupOptions([formData.groupName]);
  }, [formData.groupName]);

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
      console.error("폼 데이터 제출 실패", error); // 오류 로그
    }
  };

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
      sectionTime: "",
      enrollment: "",
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
        lectureName: "",
        lectureTime: "",
        groupName: "",
        sections: [{ division: "", sectionTime: "", enrollment: "" }],
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
          <h2 className="text-2xl font-bold mb-4">STEP 5</h2>
          <h2 className="text-xl font-semibold mb-6">강의 정보 입력</h2>
          <form onSubmit={handleSubmit}>
            {lectures.map((lecture, lectureIndex) => (
              <div
                key={lectureIndex}
                className="mb-6 p-4 border-2 border-green-400 rounded"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="form-group">
                    <label
                      htmlFor={`lectureName-${lectureIndex}`}
                      className="block font-medium"
                    >
                      강의명:
                    </label>
                    <input
                      type="text"
                      id={`lectureName-${lectureIndex}`}
                      name="lectureName"
                      value={lecture.lectureName}
                      onChange={(e) => handleLectureChange(lectureIndex, e)}
                      placeholder="강의명"
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor={`lectureTime-${lectureIndex}`}
                      className="block font-medium"
                    >
                      강의 시간:
                    </label>
                    <input
                      type="number"
                      id={`lectureTime-${lectureIndex}`}
                      name="lectureTime"
                      value={lecture.lectureTime}
                      onChange={(e) => handleLectureChange(lectureIndex, e)}
                      placeholder="강의 시간"
                      className="mt-1 p-2 border rounded w-full"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor={`groupName-${lectureIndex}`}
                      className="block font-medium"
                    >
                      강의실 그룹:
                    </label>
                    <select
                      id={`groupName-${lectureIndex}`}
                      name="groupName"
                      value={lecture.groupName}
                      onChange={(e) => handleLectureChange(lectureIndex, e)}
                      className="mt-1 p-2 border rounded w-full"
                    >
                      {groupOptions.map((group, idx) => (
                        <option key={idx} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
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
                      value={lecture.lectureTime}
                      onChange={(e) => handleLectureChange(lectureIndex, e)}
                      placeholder="학년"
                      className="mt-1 p-2 border rounded w-full"
                    />
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
                    <div className="form-group">
                      <label
                        htmlFor={`sectionTime-${lectureIndex}-${sectionIndex}`}
                        className="block font-medium"
                      >
                        섹션 시간:
                      </label>
                      <input
                        type="number"
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
                        htmlFor={`enrollment-${lectureIndex}-${sectionIndex}`}
                        className="block font-medium"
                      >
                        수강 인원:
                      </label>
                      <input
                        type="number"
                        id={`enrollment-${lectureIndex}-${sectionIndex}`}
                        name="enrollment"
                        value={section.enrollment}
                        onChange={(e) =>
                          handleSectionChange(lectureIndex, sectionIndex, e)
                        }
                        placeholder="수강 인원"
                        className="mt-1 p-2 border rounded w-full"
                      />
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
