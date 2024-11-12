import { Link } from "react-router-dom";
import putsLogo from "../assets/PUTS.png";

export default function Mainpage() {
  const handleRedirect = () => {
    window.location.href = "https://125.251.212.92/"; // 신뢰할 링크로 변경
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-base-200 min-h-screen">
      <div className="text-center w-full">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <img src={putsLogo} alt="PUTS Logo" className="h-36" />
          <p className="py-6 text-base-content">
            학과 스케쥴 관련 업계 종사자를 위한 <br />
            대학교 자동 시간표 스케쥴링 시스템
          </p>
          <Link to="/timetable" className="btn btn-primary">
            시간표 생성하기
          </Link>

          {/* 인증서 신뢰 링크로 리다이렉트 */}
          <p className="text-sm mt-4 text-base-content">
            버튼을 클릭해 인증서 신뢰를 해주셔야 시간표 생성 및 저장이
            가능합니다.
          </p>
          <button onClick={handleRedirect} className="btn btn-secondary mt-4">
            인증서 신뢰 페이지로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
