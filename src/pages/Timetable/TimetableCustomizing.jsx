import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Form from "../../components/form/Form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const days = ["월", "화", "수", "목", "금"];
const times = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

export default function TimetableCustomizing() {
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const navigate = useNavigate();

  const [selectedLecture, setSelectedLecture] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedTimetableSections, setSelectedTimetableSections] = useState(
    []
  );

  // 섹션에 id를 부여하는 함수
  const assignIdsToLectures = (lectures) => {
    return lectures.map((lecture) => ({
      ...lecture,
      id: lecture.id || uuidv4(), // 강의에 id 추가
      divisionGroup: lecture.divisionGroup.map((division) => ({
        ...division,
        id: division.id || uuidv4(), // 분반에 id 추가
        sectionGroup: division.sectionGroup.map((section) => ({
          ...section,
          id: section.id || uuidv4(), // 섹션에 id 추가
        })),
      })),
    }));
  };

  // 로컬 상태로 lectures와 postgraduateLectures를 관리
  const [localLectures, setLocalLectures] = useState(
    assignIdsToLectures(watch("lectures") || [])
  );
  const [localPostgraduateLectures, setLocalPostgraduateLectures] = useState(
    assignIdsToLectures(watch("postgraduateLectures") || [])
  );
  const combinedLectures = [...localLectures, ...localPostgraduateLectures];

  const timetableName = watch("timetableName");

  // Initialize timetable from form context
  const timetableFromContext = watch("timetable") || null;

  const [timetable, setTimetable] = useState(
    timetableFromContext ||
      Array(5)
        .fill()
        .map(() => Array(13).fill([]))
  );

  useEffect(() => {
    if (!timetableName) navigate("/");
  }, [timetableName, navigate]);

  // lectures나 postgraduateLectures가 변경되면 폼 컨텍스트에 반영
  useEffect(() => {
    setValue("lectures", localLectures);
  }, [localLectures, setValue]);

  useEffect(() => {
    setValue("postgraduateLectures", localPostgraduateLectures);
  }, [localPostgraduateLectures, setValue]);

  // Update timetable in form context whenever it changes
  useEffect(() => {
    setValue("timetable", timetable);
  }, [timetable, setValue]);

  const resetSelection = () => {
    setSelectedLecture(null);
    setSelectedDivision(null);
    setSelectedSection(null);
  };

  const handleLectureSelect = (lecture) => {
    if (selectedLecture && selectedLecture.id === lecture.id) {
      resetSelection();
    } else {
      setSelectedLecture(lecture);
      setSelectedDivision(null);
      setSelectedSection(null);
    }
  };

  const handleDivisionSelect = (division) => {
    if (selectedDivision && selectedDivision.id === division.id) {
      setSelectedDivision(null);
      setSelectedSection(null);
    } else {
      setSelectedDivision(division);
      setSelectedSection(null);
    }
  };

  const handleSectionSelect = (section) => {
    if (selectedSection && selectedSection.id === section.id) {
      setSelectedSection(null);
    } else {
      setSelectedSection(section);
    }
  };

  const handleTimetableClick = (dayIndex, timeIndex) => {
    if (selectedLecture && selectedDivision && selectedSection) {
      if (selectedSection.isFixedTime) {
        setErrorMessage("이미 등록된 TP입니다.");
        return;
      }

      const sectionTime = parseInt(selectedSection.sectionTime, 10);
      const endTimeIndex = timeIndex + sectionTime - 1;

      if (endTimeIndex >= times.length) {
        setErrorMessage("22:00를 초과하여 배정할 수 없습니다.");
        return;
      }

      const newTimetable = [...timetable];
      const selectedLectureName =
        selectedLecture.lectureName || selectedLecture.postgraduateLectureName;

      const fixedTimes = [];
      for (let i = timeIndex; i <= endTimeIndex; i++) {
        newTimetable[dayIndex][i] = [
          ...newTimetable[dayIndex][i],
          {
            lectureName: selectedLectureName,
            divisionName:
              selectedDivision.divisionNumber !== undefined
                ? `${selectedDivision.divisionNumber + 1}번`
                : "Unnamed",
            professorCode: selectedDivision.professor || "",
            capacity: selectedDivision.capacity || "",
            period: selectedSection.period,
            sectionTime,
            classroom: selectedSection.classroom || "미지정",
            isGrad: selectedLecture.isGrad,
            startTimeIndex: timeIndex, // 시작 시간 인덱스 저장
            FixedTime: [], // 나중에 설정
            originalLecture: selectedLecture,
            originalDivision: selectedDivision,
            originalSection: selectedSection,
          },
        ];
        fixedTimes.push([dayIndex, i]);
      }

      // FixedTime 설정
      for (let i = timeIndex; i <= endTimeIndex; i++) {
        newTimetable[dayIndex][i] = newTimetable[dayIndex][i].map((section) => {
          if (
            section.lectureName === selectedLectureName &&
            section.divisionName ===
              (selectedDivision.divisionNumber !== undefined
                ? `${selectedDivision.divisionNumber + 1}번`
                : "Unnamed") &&
            section.startTimeIndex === timeIndex
          ) {
            return { ...section, FixedTime: fixedTimes };
          }
          return section;
        });
      }

      setTimetable(newTimetable);

      // 선택된 TP의 isFixedTime을 true로 설정하고 FixedTime에 시간 정보 추가
      const updateSection = (s) =>
        s.id === selectedSection.id
          ? {
              ...s,
              isFixedTime: true,
              FixedTime: fixedTimes,
            }
          : s;

      if (selectedLecture.isGrad) {
        const updatedPostgraduateLectures = localPostgraduateLectures.map(
          (lecture) =>
            lecture.id === selectedLecture.id
              ? {
                  ...lecture,
                  divisionGroup: lecture.divisionGroup.map((division) =>
                    division.id === selectedDivision.id
                      ? {
                          ...division,
                          sectionGroup:
                            division.sectionGroup.map(updateSection),
                        }
                      : division
                  ),
                }
              : lecture
        );
        setLocalPostgraduateLectures(updatedPostgraduateLectures);
        console.log(
          "Updated Postgraduate Lectures:",
          updatedPostgraduateLectures
        );
      } else {
        const updatedLectures = localLectures.map((lecture) =>
          lecture.id === selectedLecture.id
            ? {
                ...lecture,
                divisionGroup: lecture.divisionGroup.map((division) =>
                  division.id === selectedDivision.id
                    ? {
                        ...division,
                        sectionGroup: division.sectionGroup.map(updateSection),
                      }
                    : division
                ),
              }
            : lecture
        );
        setLocalLectures(updatedLectures);
        console.log("Updated Lectures:", updatedLectures);
      }

      resetSelection();
    } else if (timetable[dayIndex][timeIndex].length > 0) {
      // TP 선택 없이 채워진 시간표 칸을 클릭한 경우
      const sectionsAtTime = timetable[dayIndex][timeIndex];

      // 각 섹션을 고유하게 식별하기 위한 키 생성
      const uniqueSectionsMap = new Map();

      sectionsAtTime.forEach((section) => {
        const key = `${section.lectureName}-${section.divisionName}-${section.startTimeIndex}`;
        if (!uniqueSectionsMap.has(key)) {
          uniqueSectionsMap.set(key, section);
        }
      });

      const uniqueSections = Array.from(uniqueSectionsMap.values());
      setSelectedTimetableSections(uniqueSections);
    }
  };

  const handleUnregisterTP = (section) => {
    // 시간표에서 해당 TP 제거
    const newTimetable = [...timetable];
    const fixedTimes = section.FixedTime; // [ [dayIndex, timeIndex], ... ]

    for (const [dayIdx, timeIdx] of fixedTimes) {
      newTimetable[dayIdx][timeIdx] = newTimetable[dayIdx][timeIdx].filter(
        (s) =>
          !(
            s.lectureName === section.lectureName &&
            s.divisionName === section.divisionName &&
            s.period === section.period &&
            s.startTimeIndex === section.startTimeIndex
          )
      );
    }
    setTimetable(newTimetable);

    // 해당 TP의 isFixedTime을 false로 설정하고 FixedTime을 빈 배열로 초기화
    const updateSection = (s) =>
      s.id === section.originalSection.id
        ? {
            ...s,
            isFixedTime: false,
            FixedTime: [],
          }
        : s;

    if (section.isGrad) {
      const updatedPostgraduateLectures = localPostgraduateLectures.map(
        (lecture) =>
          lecture.id === section.originalLecture.id
            ? {
                ...lecture,
                divisionGroup: lecture.divisionGroup.map((division) =>
                  division.id === section.originalDivision.id
                    ? {
                        ...division,
                        sectionGroup: division.sectionGroup.map(updateSection),
                      }
                    : division
                ),
              }
            : lecture
      );
      setLocalPostgraduateLectures(updatedPostgraduateLectures);
      console.log(
        "Updated Postgraduate Lectures:",
        updatedPostgraduateLectures
      );
    } else {
      const updatedLectures = localLectures.map((lecture) =>
        lecture.id === section.originalLecture.id
          ? {
              ...lecture,
              divisionGroup: lecture.divisionGroup.map((division) =>
                division.id === section.originalDivision.id
                  ? {
                      ...division,
                      sectionGroup: division.sectionGroup.map(updateSection),
                    }
                  : division
              ),
            }
          : lecture
      );
      setLocalLectures(updatedLectures);
      console.log("Updated Lectures:", updatedLectures);
    }

    // 모달 닫기
    setSelectedTimetableSections([]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 시간표 설정 모달 상태

  // 설정 모달에서 사용할 상태 변수들
  const [timetableResult, setTimetableResult] = useState(
    watch("timetableResult") || 1
  );
  const [timetableLunchTimeConstraint, setTimetableLunchTimeConstraint] =
    useState(watch("timetableLunchTimeConstraint") ?? true);
  const [timetable4daysConstraint, setTimetable4daysConstraint] = useState(
    watch("timetable4daysConstraint") ?? true
  );
  const [settingsErrors, setSettingsErrors] = useState({}); // 설정 모달의 에러 메시지

  // 시간표 설정 모달을 열고 닫는 함수
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setSettingsErrors({});
    setIsModalOpen(false);
  };

  // 시간표 설정 모달 저장 핸들러
  const handleSaveOptions = () => {
    // 유효성 검사
    let errors = {};
    if (timetableResult < 1 || timetableResult > 10) {
      errors.timetableResult = "시간표 수는 1에서 10 사이여야 합니다.";
    }
    if (Object.keys(errors).length > 0) {
      setSettingsErrors(errors);
    } else {
      setSettingsErrors({});
      setValue("timetableResult", timetableResult);
      setValue("timetableLunchTimeConstraint", timetableLunchTimeConstraint);
      setValue("timetable4daysConstraint", timetable4daysConstraint);
      closeModal();
    }
  };

  const helpContent = (
    <div className="flex flex-col gap-4 text-sm">
      <p>
        <span className="font-bold">
          1. 특정 교과목을 미리 특정 시간에 배치할 수 있는 기능입니다.
        </span>
        <p className="indent-2">
          • 교과목명 선택 → 분반 선택 → 시간 선택 후 원하는 시간대 클릭
        </p>
        <p className="indent-2">
          • 여러 강의가 한 시간에 중복되어 배치될 수 있습니다.
          <p className="indent-4"> 예시 - 월요일 1교시에 여러 강의 배치</p>
        </p>
        <p className="indent-2">
          • 한 번 배치된 강의의 시간은 중복 배치될 수 없습니다.
          <p className="indent-4">
            예시 - 자료구조 1분반 3시간을 미리 배치했다면 남은 1시간만 배치 가능
          </p>
        </p>
      </p>
      <p>
        <span className="font-bold">
          2. 배치된 강의가 있는 시간을 클릭하면 강의의 정보가 표시됩니다.
        </span>
        <p className="indent-2">• 강의 배치를 해제할 수 있습니다.</p>
      </p>
    </div>
  );

  return (
    <Form
      title="STEP 6: 커스터마이징"
      prev="/timetable/postgraduatelectures"
      next="/timetable/timetableresult"
      helpContent={helpContent}
    >
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">시간표</h2>
        {/* 톱니바퀴 모양 옵션 버튼 */}
        <button
          type="button"
          className="btn btn-sm btn-ghost"
          onClick={openModal}
        >
          ⚙️
        </button>
      </div>
      <div className="flex w-full h-screen text-base-content">
        {/* 시간표 영역 */}
        <div className="w-3/4 p-4 overflow-auto">
          <table className="table-fixed border-collapse border border-gray-300 w-full">
            <thead>
              <tr>
                <th className="border border-gray-300 w-16 h-12 text-center">
                  시간
                </th>
                {days.map((day, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 h-12 text-center"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, timeIndex) => (
                <tr key={timeIndex}>
                  <td className="border border-gray-300 h-12 text-center">
                    {time}
                  </td>
                  {days.map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      className="border border-gray-300 cursor-pointer h-12 text-center"
                      onClick={() => handleTimetableClick(dayIndex, timeIndex)}
                    >
                      {timetable[dayIndex][timeIndex].length === 1 ? (
                        <div className="bg-blue-200 rounded p-1">
                          <span>
                            {`${timetable[dayIndex][timeIndex][0].lectureName} (${timetable[dayIndex][timeIndex][0].divisionName})`}
                          </span>
                        </div>
                      ) : timetable[dayIndex][timeIndex].length > 1 ? (
                        <div className="bg-blue-200 rounded p-1">
                          <span>
                            {`${timetable[dayIndex][timeIndex].length}개 배치됨`}
                          </span>
                        </div>
                      ) : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 교과목 및 분반 선택 영역 */}
        <div className="w-1/4 p-4 border-l-2 border-gray-200 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">교과목 및 분반 선택</h2>

          {/* 교과목 선택 */}
          <div className="space-y-4">
            {combinedLectures.map((lecture) => (
              <div key={lecture.id}>
                <div
                  className={`p-2 border rounded cursor-pointer ${
                    selectedLecture && selectedLecture.id === lecture.id
                      ? "bg-blue-200"
                      : "bg-white"
                  }`}
                  onClick={() => handleLectureSelect(lecture)}
                >
                  {lecture.lectureName || lecture.postgraduateLectureName}
                </div>
                {selectedLecture && selectedLecture.id === lecture.id && (
                  // Render divisions
                  <div className="mt-2 ml-4 space-y-2">
                    {lecture.divisionGroup.map((division) => (
                      <div key={division.id}>
                        <div
                          className={`p-2 border rounded cursor-pointer ${
                            selectedDivision &&
                            selectedDivision.id === division.id
                              ? "bg-blue-200"
                              : "bg-white"
                          }`}
                          onClick={() => handleDivisionSelect(division)}
                        >
                          {division.divisionNumber !== undefined
                            ? `${division.divisionNumber + 1}번`
                            : "Unnamed"}
                        </div>
                        {selectedDivision &&
                          selectedDivision.id === division.id && (
                            // Render sections
                            <div className="mt-2 ml-4 space-y-2">
                              {division.sectionGroup.map((section) => (
                                <div
                                  key={section.id}
                                  className={`p-2 border rounded cursor-pointer ${
                                    selectedSection &&
                                    selectedSection.id === section.id
                                      ? "bg-yellow-200"
                                      : "bg-white"
                                  }`}
                                  onClick={() => handleSectionSelect(section)}
                                >
                                  {`강의 시간: ${
                                    section.sectionTime || "미지정"
                                  } ${
                                    section.isFixedTime ? "(이미 등록됨)" : ""
                                  }`}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 설정 모달 */}
      {isModalOpen && (
        <div className="modal modal-open text-base-content">
          <div className="modal-box">
            <h3 className="font-bold text-lg">시간표 제약 조건 설정</h3>
            <div className="py-4">
              <label className="flex justify-between items-center">
                <span className="text-base">생성 할 시간표 수 (1 ~ 10)</span>
                <input
                  type="number"
                  className="input input-sm input-bordered ml-4"
                  value={timetableResult}
                  onChange={(e) => setTimetableResult(Number(e.target.value))}
                />
              </label>
              {settingsErrors.timetableResult && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {settingsErrors.timetableResult}
                </p>
              )}

              <label className="flex justify-between items-center mt-4">
                <span className="text-base">점심 시간 고려 (11 ~ 2시)</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary ml-4"
                  checked={timetableLunchTimeConstraint}
                  onChange={(e) =>
                    setTimetableLunchTimeConstraint(e.target.checked)
                  }
                />
              </label>

              <label className="flex justify-between items-center mt-4">
                <span className="text-base">교원 주 4회 강의</span>
                <input
                  type="checkbox"
                  className="toggle toggle-primary ml-4"
                  checked={timetable4daysConstraint}
                  onChange={(e) =>
                    setTimetable4daysConstraint(e.target.checked)
                  }
                />
              </label>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveOptions}
                >
                  저장
                </button>
                <button type="button" className="btn" onClick={closeModal}>
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 오류 모달 */}
      {errorMessage && (
        <div className="modal modal-open text-base-content">
          <div className="modal-box">
            <h3 className="font-bold text-lg">오류</h3>
            <p>{errorMessage}</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setErrorMessage(null)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TP 정보 모달 */}
      {selectedTimetableSections.length > 0 && (
        <div className="modal modal-open text-base-content">
          <div className="modal-box">
            <h3 className="font-bold text-lg">강의 상세 정보</h3>
            {selectedTimetableSections.map((section, index) => (
              <div key={index} className="p-2 border-b">
                <p>강의명: {section.lectureName}</p>
                <p>분반 번호: {section.divisionName}</p>
                <p>교원 코드: {section.professorCode}</p>
                <p>수용인원: {section.capacity}</p>
                <p>
                  강의 시간: {times[section.startTimeIndex]} ~{" "}
                  {times[section.startTimeIndex + section.sectionTime - 1]}
                </p>
                <button
                  className="btn btn-sm btn-error mt-2"
                  onClick={() => handleUnregisterTP(section)}
                >
                  배치 해제
                </button>
              </div>
            ))}
            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setSelectedTimetableSections([])}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </Form>
  );
}
