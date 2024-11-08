import { Link } from "react-router-dom";
import putsLogo from "../assets/PUTS.png";

export default function Mainpage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-base-200 min-h-screen">
      <div className="text-center w-full">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <img src={putsLogo} alt="PUTS Logo" className="h-36" />
          <p className="py-6 text-base-content">
            대학교 업무 관련 업계 종사자를 위한 <br></br>
            대학교 자동 시간표 스케쥴링 시스템
          </p>
          <Link to="/timetable" className="btn btn-primary">
            시간표 생성하기
          </Link>
        </div>
      </div>
    </div>
  );
}
