// Steps.js
import { useLocation } from "react-router-dom";

export default function Steps() {
  const location = useLocation();
  const pathname = location.pathname;

  // 각 경로를 단계에 매핑
  const stepMap = {
    "/timetable": 1,
    "/timetable/professors": 2,
    "/timetable/classrooms": 3,
    "/timetable/lectures": 4,
    "/timetable/postgraduatelectures": 5,
    "/timetable/timetablecustomizing": 6,
    "/timetable/timetableresult": 7,
  };

  // 현재 경로에 해당하는 단계 계산
  const currentStep = stepMap[pathname] || 1;

  return (
    <div className="m-10 min-w-32">
      <ul className="steps steps-vertical text-base-content font-bold">
        <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>
          시간표 정보
        </li>
        <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>
          교원
        </li>
        <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>
          강의실
        </li>
        <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>
          일반 교과목
        </li>
        <li className={`step ${currentStep >= 5 ? "step-primary" : ""}`}>
          대학원 교과목
        </li>
        <li className={`step ${currentStep >= 6 ? "step-primary" : ""}`}>
          커스터마이징
        </li>
        <li className={`step ${currentStep >= 7 ? "step-primary" : ""}`}>
          저장
        </li>
      </ul>
    </div>
  );
}
