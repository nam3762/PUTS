import { useLocation, useNavigate } from "react-router-dom";
import { useStepState } from "../context/StepContext";
import ThemeToggle from "../themes/ThemeToggle";
import putsLogoSquare from "../assets/puts_logo_square3.png";
import { useState } from "react";
import ModalConfirm from "./modal/modalConfirm";

const Navbar = () => {
  const { currentStep, setCurrentStep } = useStepState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextPath, setNextPath] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isTimetableRoute =
    location.pathname.startsWith("/timetable") &&
    location.pathname !== "/timetableinfo";

  // 기존 handleStep 유지
  function handleStep() {
    setCurrentStep(0);
  }

  // 로고 클릭 시 경로 이동을 처리하는 함수
  const handleLogoClick = () => {
    if (isTimetableRoute) {
      setNextPath("/"); // 로고 클릭 시 홈으로 이동하도록 설정
      setIsModalOpen(true); // 모달 열기
    } else {
      handleStep(); // Step 초기화
      navigate("/"); // 바로 홈으로 이동
    }
  };

  const handleSearchClick = () => {
    if (isTimetableRoute) {
      setNextPath("/search"); // 검색 클릭 시 search로 이동 설정
      setIsModalOpen(true); // 모달 열기
    } else {
      navigate("/search"); // 바로 검색 페이지로 이동
    }
  };

  const confirmNavigation = () => {
    setIsModalOpen(false);
    navigate(nextPath); // 저장된 경로로 이동
    handleStep(); // Step 초기화
  };

  const cancelNavigation = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          {/* Link 대신 onClick으로 처리 */}
          <button
            className="btn btn-ghost text-2xl text-base-content"
            onClick={handleLogoClick} // 로고 클릭 시 함수 호출
          >
            <img src={putsLogoSquare} alt="PUTS Logo" className="h-10" />
          </button>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end">
          <div className="flex justify-center items-center h-5 w-5 mr-4">
            <ThemeToggle />
          </div>
          <button
            className="btn btn-ghost btn-circle text-base-content"
            onClick={handleSearchClick} // 검색 클릭 시 함수 호출
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 모달 컴포넌트 */}
      <ModalConfirm
        isOpen={isModalOpen}
        onConfirm={confirmNavigation}
        onCancel={cancelNavigation}
      />
    </>
  );
};

export default Navbar;
