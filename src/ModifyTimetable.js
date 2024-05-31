import React, { useState, useEffect } from "react";

const days = ["월요일", "화요일", "수요일", "목요일", "금요일"];
const colors = [
  "bg-red-300",
  "bg-yellow-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-purple-300",
];

const ModifyTimetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    // 임의의 예시 데이터
    const exampleData = {
      output_input_no: 1,
      schedule: [
        {
          day: 1,
          period: 1,
          duration: 1,
          code: "CS101",
          lecture: "객체지향 프로그래밍",
          division: 1,
          professor: "최경주",
          classroom: { building: "S4-1", classroom_no: "102" },
          year: 2,
        },
        {
          day: 1,
          period: 2,
          duration: 1,
          code: "CS101",
          lecture: "객체지향 프로그래밍",
          division: 1,
          professor: "최경주",
          classroom: { building: "S4-1", classroom_no: "102" },
          year: 2,
        },
        {
          day: 2,
          period: 2,
          duration: 1,
          code: "MA202",
          lecture: "자료구조",
          division: 1,
          professor: "노서영",
          classroom: { building: "S4-1", classroom_no: "106" },
          year: 2,
        },
        {
          day: 2,
          period: 3,
          duration: 1,
          code: "MA202",
          lecture: "자료구조",
          division: 1,
          professor: "노서영",
          classroom: { building: "S4-1", classroom_no: "106" },
          year: 2,
        },
        {
          day: 3,
          period: 3,
          duration: 1,
          code: "PH303",
          lecture: "기계학습",
          division: 1,
          professor: "정지훈",
          classroom: { building: "S4-1", classroom_no: "201" },
          year: 4,
        },
        {
          day: 5,
          period: 1,
          duration: 1,
          code: "MS303",
          lecture: "오픈소스기초프로젝트",
          division: 1,
          professor: "강재구",
          classroom: { building: "S4-1", classroom_no: "205" },
          year: 2,
        },
        {
          day: 5,
          period: 2,
          duration: 1,
          code: "MS303",
          lecture: "오픈소스기초프로젝트",
          division: 1,
          professor: "강재구",
          classroom: { building: "S4-1", classroom_no: "205" },
          year: 2,
        },
        {
          day: 5,
          period: 3,
          duration: 1,
          code: "MS303",
          lecture: "오픈소스기초프로젝트",
          division: 1,
          professor: "강재구",
          classroom: { building: "S4-1", classroom_no: "205" },
          year: 2,
        },
        {
          day: 5,
          period: 4,
          duration: 1,
          code: "MS303",
          lecture: "오픈소스기초프로젝트",
          division: 1,
          professor: "강재구",
          classroom: { building: "S4-1", classroom_no: "205" },
          year: 2,
        },
      ],
    };

    setTimetable(exampleData.schedule);
  }, []);

  const handleScheduleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTimetable = [...timetable];
    updatedTimetable[index][name] = value;
    setTimetable(updatedTimetable);
  };

  const handleClassroomChange = (index, event) => {
    const { name, value } = event.target;
    const updatedTimetable = [...timetable];
    updatedTimetable[index].classroom[name] = value;
    setTimetable(updatedTimetable);
  };

  const handleEdit = (index) => {
    setSelectedSchedule(index);
  };

  const handleSave = () => {
    // 저장 로직 구현 (예: 서버에 데이터 전송)
    console.log("저장된 데이터:", timetable);
    setSelectedSchedule(null);
  };

  const handleCancel = () => {
    setSelectedSchedule(null);
    // 데이터를 다시 불러와서 수정 취소
    const exampleData = {
      output_input_no: 1,
      schedule: [
        {
          day: 1,
          period: 1,
          duration: 1,
          code: "CS101",
          lecture: "Introduction to Computer Science",
          division: 1,
          professor: "Dr. John Doe",
          classroom: { building: "Engineering", classroom_no: "101" },
          year: 2024,
        },
        {
          day: 2,
          period: 2,
          duration: 2,
          code: "MA202",
          lecture: "Calculus II",
          division: 1,
          professor: "Dr. Jane Smith",
          classroom: { building: "Math", classroom_no: "201" },
          year: 2024,
        },
        {
          day: 3,
          period: 3,
          duration: 1,
          code: "PH303",
          lecture: "Modern Physics",
          division: 1,
          professor: "Dr. Albert Einstein",
          classroom: { building: "Physics", classroom_no: "301" },
          year: 2024,
        },
      ],
    };

    setTimetable(exampleData.schedule);
  };

  const renderTimetable = () => {
    const rows = [];
    for (let period = 1; period <= 9; period++) {
      rows.push(
        <div className="grid grid-cols-6 gap-2" key={period}>
          <div className="p-2 border text-center">{period}</div>
          {days.map((day, dayIndex) => {
            const scheduleItem = timetable.find(
              (item) => item.day === dayIndex + 1 && item.period === period
            );

            if (scheduleItem) {
              const color = colors[dayIndex % colors.length];
              return (
                <div
                  key={dayIndex}
                  className={`p-2 border text-center cursor-pointer ${color}`}
                  onClick={() => handleEdit(timetable.indexOf(scheduleItem))}
                  style={{ gridRowEnd: `span ${scheduleItem.duration}` }}
                >
                  <div>{scheduleItem.lecture}</div>
                  <div>{scheduleItem.professor}</div>
                  <div>
                    {scheduleItem.classroom.building}{" "}
                    {scheduleItem.classroom.classroom_no}
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={dayIndex}
                  className="p-2 border text-center h-24"
                ></div>
              );
            }
          })}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">시간표 수정</h2>
      <div className="grid grid-cols-6 gap-2 mb-4">
        <div></div>
        {days.map((day, index) => (
          <div key={index} className="p-2 border text-center font-bold">
            {day}
          </div>
        ))}
      </div>
      {renderTimetable()}
      {selectedSchedule !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-4xl">
            <h3 className="text-xl font-bold mb-4">Edit Schedule</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="mb-2 col-span-2">
                <label className="block font-medium">Day:</label>
                <select
                  name="day"
                  value={timetable[selectedSchedule].day}
                  onChange={(e) => handleScheduleChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                >
                  {days.map((day, index) => (
                    <option key={index} value={index + 1}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block font-medium">Period:</label>
                <input
                  type="number"
                  name="period"
                  value={timetable[selectedSchedule].period}
                  onChange={(e) => handleScheduleChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium">Duration:</label>
                <input
                  type="number"
                  name="duration"
                  value={timetable[selectedSchedule].duration}
                  onChange={(e) => handleScheduleChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2 col-span-2">
                <label className="block font-medium">Code:</label>
                <input
                  type="text"
                  name="code"
                  value={timetable[selectedSchedule].code}
                  onChange={(e) => handleScheduleChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2 col-span-2">
                <label className="block font-medium">Lecture:</label>
                <input
                  type="text"
                  name="lecture"
                  value={timetable[selectedSchedule].lecture}
                  onChange={(e) => handleScheduleChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium">Division:</label>
                <input
                  type="number"
                  name="division"
                  value={timetable[selectedSchedule].division}
                  onChange={(e) => handleScheduleChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium">Professor:</label>
                <input
                  type="text"
                  name="professor"
                  value={timetable[selectedSchedule].professor}
                  onChange={(e) => handleScheduleChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium">Building:</label>
                <input
                  type="text"
                  name="building"
                  value={timetable[selectedSchedule].classroom.building}
                  onChange={(e) => handleClassroomChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-medium">Classroom No:</label>
                <input
                  type="text"
                  name="classroom_no"
                  value={timetable[selectedSchedule].classroom.classroom_no}
                  onChange={(e) => handleClassroomChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2 col-span-2">
                <label className="block font-medium">Year:</label>
                <input
                  type="number"
                  name="year"
                  value={timetable[selectedSchedule].year}
                  onChange={(e) => handleScheduleChange(selectedSchedule, e)}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-4 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="py-2 px-4 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModifyTimetable;
