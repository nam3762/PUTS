import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import usePreventBackNavigation from "../../hooks/usePreventBackNavigation";
import { useFormContext } from "react-hook-form";
import Form from "../../components/form/Form";
import { v4 as uuidv4 } from "uuid";

export default function TimetableResult() {
  const { watch, handleSubmit } = useFormContext();
  const navigate = useNavigate();

  // Prevent back navigation
  usePreventBackNavigation();

  // Redirect users who skipped STEP 1
  const timetableName = watch("timetableName");
  useEffect(() => {
    if (!timetableName) {
      navigate("/");
    }
  }, [timetableName, navigate]);

  // State variables
  const [status, setStatus] = useState("initial"); // 'initial', 'processing', 'completed'
  const [timetableData, setTimetableData] = useState(null);
  const [fileUrl, setFileUrl] = useState(""); // 추가: 파일 URL을 저장할 상태
  const ws = useRef(null);

  // Tab state
  const [activeTab, setActiveTab] = useState("timetable"); // 'timetable', 'professors', 'classrooms', 'lectures'

  // Day names mapping
  const dayNames = ["월", "화", "수", "목", "금"];

  // Transform lectures to TPs function
  const transformLecturesToTPs = (lectures, postgraduateLectures) => {
    const transformLecture = (lecture, isGradLecture = false) => {
      return lecture.divisionGroup.flatMap((division, divisionIndex) => {
        const sortedSections = [...division.sectionGroup].sort((a, b) => {
          const aTime = parseInt(a.sectionTime, 10);
          const bTime = parseInt(b.sectionTime, 10);
          return bTime - aTime;
        });

        return sortedSections
          .filter((section) => parseInt(section.sectionTime, 10) > 0)
          .map((section, tpIndex) => {
            return {
              lectureName: isGradLecture
                ? lecture.postgraduateLectureName
                : lecture.lectureName,
              lectureCode: isGradLecture
                ? lecture.postgraduateLectureCode
                : lecture.lectureCode,
              year: lecture.year || 1,
              group: lecture.group || 1,
              professorCode: division.professor || "",
              capacity: division.capacity || 0,
              majorRequired: lecture.majorRequired || false,
              isGrad: isGradLecture,
              atNight: isGradLecture ? lecture.atNight : false,
              gradClassrooms: isGradLecture ? lecture.gradClassrooms : [],
              divisionNumber:
                division.divisionNumber !== undefined
                  ? division.divisionNumber
                  : divisionIndex,
              TPNumber: tpIndex,
              duration: parseInt(section.sectionTime, 10),
              isTPGroup: section.isTPGroup1 || section.isTPGroup2 || false,
              isFixedTime: section.isFixedTime || false,
              FixedTime: section.FixedTime || [],
            };
          });
      });
    };

    const undergraduateTPs = lectures.flatMap((lecture) =>
      transformLecture(lecture)
    );
    const postgraduateTPs = postgraduateLectures.flatMap((postLecture) =>
      transformLecture(postLecture, true)
    );

    const allTPs = [...undergraduateTPs, ...postgraduateTPs];

    const sortedTPs = allTPs.sort((a, b) => {
      if (
        a.lectureCode === b.lectureCode &&
        a.divisionNumber === b.divisionNumber
      ) {
        return b.duration - a.duration;
      } else {
        return 0;
      }
    });

    return sortedTPs;
  };

  // Handle final submit
  const handleFinalSubmit = async (data) => {
    setStatus("processing");

    // 새로운 UUID 생성
    const newId = uuidv4();

    // Remove unnecessary fields
    const sanitizedData = { ...data };
    delete sanitizedData.classroomGroups;
    delete sanitizedData.postgraduateLectures;
    delete sanitizedData.timetable;

    // 새로운 ID를 데이터에 설정
    sanitizedData.id = newId;

    // Transform lectures
    const transformedData = {
      ...sanitizedData,
      lectures: transformLecturesToTPs(
        sanitizedData.lectures,
        data.postgraduateLectures
      ),
    };

    console.log("Final Transformed Data:", transformedData);

    try {
      // Send data to backend
      const response = await fetch("https://125.251.212.92:443/timetables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to backend");
      }

      const result = await response.json();
      console.log("Successfully sent data to backend:", result);

      // Set up WebSocket connection
      ws.current = new WebSocket(
        `wss://125.251.212.92:443/ws/timetables/${newId}`
      );

      ws.current.onopen = () => {
        console.log("WebSocket connection opened");
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received data from WebSocket:", data);

        if (data.status === "FileReady") {
          // 파일 URL을 상태에 저장
          setFileUrl(data.file_url);
          setStatus("completed");
        }
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Error sending data to backend:", error);
      setStatus("initial"); // Reset to initial state on error
    }
  };

  // Component unmount cleanup
  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Retrieve form data
  const lectures = watch("lectures") || [];
  const postgraduateLectures = watch("postgraduateLectures") || [];
  const professors = watch("professors") || [];
  const classrooms = watch("classrooms") || [];
  const classroomGroups = watch("classroomGroups") || [];
  const timetableInfo = {
    id: watch("id") || "",
    timetableName: watch("timetableName") || "",
    password: watch("password") || "",
    timetableDescription: watch("timetableDescription") || "",
    timetableResult: watch("timetableResult") || "",
    timetableLunchTimeConstraint: watch("timetableLunchTimeConstraint"),
    timetable4daysConstraint: watch("timetable4daysConstraint"),
  };

  // Tab content rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case "timetable":
        return (
          <div className="card bg-base-100 shadow-xl text-base-content">
            <div className="card-body">
              <h2 className="card-title">시간표 정보</h2>
              <div className="divider"></div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <tbody>
                    <tr>
                      <th>이름</th>
                      <td>{timetableInfo.timetableName}</td>
                    </tr>
                    <tr>
                      <th>비밀번호</th>
                      <td>{timetableInfo.password}</td>
                    </tr>
                    <tr>
                      <th>설명</th>
                      <td>{timetableInfo.timetableDescription}</td>
                    </tr>
                    <tr>
                      <th>생성할 시간표 개수</th>
                      <td>{timetableInfo.timetableResult}</td>
                    </tr>
                    <tr>
                      <th>점심시간 제약조건 설정 여부</th>
                      <td>
                        {timetableInfo.timetableLunchTimeConstraint
                          ? "예"
                          : "아니오"}
                      </td>
                    </tr>
                    <tr>
                      <th>교원 주 4일 강의 제약조건 설정 여부</th>
                      <td>
                        {timetableInfo.timetable4daysConstraint
                          ? "예"
                          : "아니오"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "professors":
        return (
          <div className="card bg-base-100 shadow-xl text-base-content">
            <div className="card-body">
              <h2 className="card-title">교원 목록</h2>
              <div className="divider"></div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>이름</th>
                      <th>코드</th>
                      <th>직책</th>
                      <th>강의 불가 시간</th>
                      <th>강의 희망 시간</th>
                    </tr>
                  </thead>
                  <tbody>
                    {professors.map((professor, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{professor.professorName}</td>
                        <td>{professor.professorCode}</td>
                        <td>{professor.isProfessor ? "전임교원" : "강사"}</td>
                        <td>
                          {professor.offTimes && professor.offTimes.length > 0
                            ? professor.offTimes
                                .map(
                                  (time) =>
                                    `${dayNames[time[0]]}요일 ${
                                      time[1] + 1
                                    }교시`
                                )
                                .join(", ")
                            : "없음"}
                        </td>
                        <td>
                          {professor.hopeTimes && professor.hopeTimes.length > 0
                            ? professor.hopeTimes
                                .map(
                                  (time) =>
                                    `${dayNames[time[0]]}요일, ${
                                      time[1] + 1
                                    }교시`
                                )
                                .join(", ")
                            : "없음"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "classrooms":
        return (
          <div className="card bg-base-100 shadow-xl  text-base-content">
            <div className="card-body">
              <h2 className="card-title">강의실 목록</h2>
              <div className="divider"></div>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>건물명</th>
                      <th>강의실 번호</th>
                      <th>수용 인원</th>
                      <th>일반/대학원 강의실 여부</th>
                      <th>강의실 그룹</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classrooms.map((classroom, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{classroom.buildingName}</td>
                        <td>{classroom.classroomNumber}</td>
                        <td>{classroom.capacity}</td>
                        <td>
                          {classroom.forGrad === 0
                            ? "일반 교과목만"
                            : classroom.forGrad === 1
                            ? "둘 다 가능"
                            : "대학원 교과목만"}
                        </td>
                        <td>
                          {classroomGroups.find(
                            (group) => group.id === classroom.group
                          )?.groupName || "없음"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "lectures":
        return (
          <div className="card bg-base-100 shadow-xl text-base-content">
            <div className="card-body">
              <h2 className="card-title">교과목 목록</h2>
              <div className="divider"></div>
              {/* Existing lecture display code */}
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>교과목명</th>
                      <th>교과목 코드</th>
                      <th>교원 코드</th>
                      <th>분반</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lectures.map((lecture, index) => (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{lecture.lectureName}</td>
                        <td>{lecture.lectureCode}</td>
                        <td>
                          {lecture.divisionGroup
                            .map((div) => div.professor)
                            .join(", ")}
                        </td>
                        <td>
                          {lecture.divisionGroup
                            .map((div) => div.divisionNumber)
                            .join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {postgraduateLectures.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold mt-6">
                    대학원 교과목 목록
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>교과명</th>
                          <th>교과목 코드</th>
                          <th>교원 코드</th>
                          <th>분반</th>
                        </tr>
                      </thead>
                      <tbody>
                        {postgraduateLectures.map((lecture, index) => (
                          <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{lecture.postgraduateLectureName}</td>
                            <td>{lecture.postgraduateLectureCode}</td>
                            <td>
                              {lecture.divisionGroup
                                .map((div) => div.professor)
                                .join(", ")}
                            </td>
                            <td>
                              {lecture.divisionGroup
                                .map((div) => div.divisionNumber)
                                .join(", ")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Form
      title="STEP 7: 시간표 저장"
      prev="/timetable/timetablecustomizing"
      final={true}
    >
      {status === "initial" && (
        <>
          {/* Tabs */}
          <div className="tabs my-4">
            <a
              className={`tab tab-bordered ${
                activeTab === "timetable" ? "tab-active underline" : ""
              }`}
              onClick={() => setActiveTab("timetable")}
            >
              시간표 정보
            </a>
            <a
              className={`tab tab-bordered ${
                activeTab === "professors" ? "tab-active underline" : ""
              }`}
              onClick={() => setActiveTab("professors")}
            >
              교원 목록
            </a>
            <a
              className={`tab tab-bordered ${
                activeTab === "classrooms" ? "tab-active underline" : ""
              }`}
              onClick={() => setActiveTab("classrooms")}
            >
              강의실 목록
            </a>
            <a
              className={`tab tab-bordered ${
                activeTab === "lectures" ? "tab-active underline" : ""
              }`}
              onClick={() => setActiveTab("lectures")}
            >
              교과목 목록
            </a>
          </div>

          {/* Tab Content */}
          <div className="mb-6">{renderTabContent()}</div>

          <div className="mt-4 text-right">
            <button
              className="btn btn-primary"
              onClick={handleSubmit(handleFinalSubmit)}
            >
              시간표 제출하기
            </button>
          </div>
        </>
      )}

      {status === "processing" && (
        <div className="text-center my-8">
          <h1 className="text-lg font-semibold mb-4 text-base-content">
            시간표 제작 중 ...
          </h1>
          <progress className="progress w-56"></progress>
        </div>
      )}

      {status === "completed" && (
        <div className="text-center text-base-content">
          <h1 className="text-lg font-semibold mb-4">시간표 제작 완료!</h1>
          <a
            href={`https://125.251.212.92:443${fileUrl}`} // 파일 다운로드 URL
            download // 다운로드 속성 추가
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-success"
          >
            Excel 파일로 저장하기
          </a>
        </div>
      )}
    </Form>
  );
}
