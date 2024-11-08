import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// 더미 데이터
const data = [
  {
    id: 100963,
    timetableName: "2023-2학기",
    timetableDescription: "소프트웨어학과 2023년도 2학기 시간표",
    password: "1234",
  },
  {
    id: 100874,
    timetableName: "2024-1학기",
    timetableDescription: "소웨 2024-1학기",
    password: "1234",
  },
  {
    id: 100356,
    timetableName: "2024-2학기",
    timetableDescription: "소프트웨어학과 2024년 2학기",
    password: "1234",
  },
  {
    id: 100357,
    timetableName: "2025-1학기",
    timetableDescription: "소프트웨어학과 2025년 1학기",
    password: "1234",
  },
  {
    id: 100358,
    timetableName: "2025-2학기",
    timetableDescription: "소프트웨어학과 2025년 2학기",
    password: "1234",
  },
  {
    id: 100359,
    timetableName: "2026-1학기",
    timetableDescription: "소프트웨어학과 2026년 1학기",
    password: "1234",
  },
  {
    id: 100360,
    timetableName: "2026-2학기",
    timetableDescription: "소프트웨어학과 2026년 2학기",
    password: "1234",
  },
  {
    id: 100361,
    timetableName: "2027-1학기",
    timetableDescription: "소프트웨어학과 2027년 1학기",
    password: "1234",
  },
  {
    id: 100362,
    timetableName: "2027-2학기",
    timetableDescription: "소프트웨어학과 2027년 2학기",
    password: "1234",
  },
  {
    id: 100363,
    timetableName: "2028-1학기",
    timetableDescription: "소프트웨어학과 2028년 1학기",
    password: "1234",
  },
  {
    id: 100364,
    timetableName: "2028-2학기",
    timetableDescription: "소프트웨어학과 2028년 2학기",
    password: "1234",
  },
  {
    id: 100365,
    timetableName: "2029-1학기",
    timetableDescription: "소프트웨어학과 2029년 1학기",
    password: "1234",
  },
  {
    id: 100366,
    timetableName: "2029-2학기",
    timetableDescription: "소프트웨어학과 2029년 2학기",
    password: "1234",
  },
  {
    id: 100367,
    timetableName: "2030-1학기",
    timetableDescription: "소프트웨어학과 2030년 1학기",
    password: "1234",
  },
  {
    id: 100368,
    timetableName: "2030-2학기",
    timetableDescription: "소프트웨어학과 2030년 2학기",
    password: "1234",
  },
  {
    id: 100369,
    timetableName: "2031-1학기",
    timetableDescription: "소프트웨어학과 2031년 1학기",
    password: "1234",
  },
  {
    id: 100370,
    timetableName: "2031-2학기",
    timetableDescription: "소프트웨어학과 2031년 2학기",
    password: "1234",
  },
  {
    id: 100371,
    timetableName: "2032-1학기",
    timetableDescription: "소프트웨어학과 2032년 1학기",
    password: "1234",
  },
  {
    id: 100372,
    timetableName: "2032-2학기",
    timetableDescription: "소프트웨어학과 2032년 2학기",
    password: "1234",
  },
  {
    id: 100373,
    timetableName: "2033-1학기",
    timetableDescription: "소프트웨어학과 2033년 1학기",
    password: "1234",
  },
  {
    id: 100374,
    timetableName: "2033-2학기",
    timetableDescription: "소프트웨어학과 2033년 2학기",
    password: "1234",
  },
  {
    id: 100375,
    timetableName: "2034-1학기",
    timetableDescription: "소프트웨어학과 2034년 1학기",
    password: "1234",
  },
  {
    id: 100376,
    timetableName: "2034-2학기",
    timetableDescription: "소프트웨어학과 2034년 2학기",
    password: "1234",
  },
  {
    id: 100377,
    timetableName: "2035-1학기",
    timetableDescription: "소프트웨어학과 2035년 1학기",
    password: "1234",
  },
  {
    id: 100378,
    timetableName: "2035-2학기",
    timetableDescription: "소프트웨어학과 2035년 2학기",
    password: "1234",
  },
  {
    id: 100379,
    timetableName: "2036-1학기",
    timetableDescription: "소프트웨어학과 2036년 1학기",
    password: "1234",
  },
  {
    id: 100380,
    timetableName: "2036-2학기",
    timetableDescription: "소프트웨어학과 2036년 2학기",
    password: "1234",
  },
  {
    id: 100381,
    timetableName: "2037-1학기",
    timetableDescription: "소프트웨어학과 2037년 1학기",
    password: "1234",
  },
  {
    id: 100382,
    timetableName: "2037-2학기",
    timetableDescription: "소프트웨어학과 2037년 2학기",
    password: "1234",
  },
  {
    id: 100383,
    timetableName: "2038-1학기",
    timetableDescription: "소프트웨어학과 2038년 1학기",
    password: "1234",
  },
];
export default function SearchPage() {
  const searchRef = useRef(""); // useRef로 검색 값을 관리
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState(""); // 입력된 비밀번호를 관리
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 오류 여부
  const [filteredData, setFilteredData] = useState(data); // 초기 데이터로 설정
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 5; // 한 페이지에 보여줄 데이터 수

  // 검색 필터링 함수: ID 또는 이름으로 검색 가능
  const handleSearchChange = () => {
    const searchTerm = searchRef.current.value.toLowerCase(); // 검색어를 소문자로 변환
    const filtered = data.filter(
      (item) =>
        item.timetableName.toLowerCase().includes(searchTerm) || // 이름으로 검색
        item.id.toString().includes(searchTerm) // ID로 검색
    );
    setFilteredData(filtered); // 필터된 데이터를 상태로 설정
    setCurrentPage(1); // 검색 시 페이지를 첫 번째 페이지로 리셋
  };

  // 모달 열기
  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
    setPasswordInput(""); // 입력된 비밀번호 초기화
    setPasswordError(false); // 오류 상태 초기화
  };

  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  // 비밀번호 검증 및 페이지 이동
  const handlePasswordSubmit = () => {
    if (passwordInput === selectedItem.password) {
      // 비밀번호가 맞으면 TimetableInfo 페이지로 이동하면서 state에 ID를 넘김
      navigate("/timetableinfo", {
        state: { timetableId: selectedItem.id },
      });
    } else {
      setPasswordError(true); // 비밀번호가 틀리면 오류 메시지 표시
    }
  };

  // 페이지네이션 관련 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지에 보여줄 데이터

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="flex flex-1 justify-center">
      <div className="flex flex-col justify-center items-center mx-auto w-full max-w-4xl p-5">
        <h1 className="text-base-content text-2xl font-bold mb-6">
          시간표 검색
        </h1>

        {/* 검색 입력 필드 */}
        <input
          type="text"
          ref={searchRef} // useRef로 input 값을 참조
          placeholder="시간표 ID 또는 이름"
          className="input input-bordered w-full max-w-xs mb-5 text-base-content"
          onChange={handleSearchChange} // 입력 변화 시 필터링 함수 실행
        />

        {/* 목록 테이블 */}
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th className="border-b border-b-content">ID</th>
              <th className="border-b border-b-content">이름</th>
              <th className="border-b border-b-content">세부 정보</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.id} className="text-base-content">
                <td className="border-b border-b-content">{item.id}</td>
                <td className="border-b border-b-content">
                  {item.timetableName}
                </td>
                <td className="border-b border-b-content">
                  <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                  ></link>
                  <button
                    className="btn btn-ghost"
                    onClick={() => openModal(item)}
                  >
                    <span class="material-icons" style={{ fontSize: "1.2rem" }}>
                      lock
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div className="mt-4">
          <div className="join">
            {/* 이전 페이지 버튼 */}
            <button
              className="join-item btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              «
            </button>
            {/* 페이지 번호 */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${
                  currentPage === index + 1 ? "btn-active btn-primary" : ""
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            {/* 다음 페이지 버튼 */}
            <button
              className="join-item btn"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            >
              »
            </button>
          </div>
        </div>

        {/* 비밀번호 입력 모달 */}
        {modalOpen && (
          <div className="modal modal-open text-base-content">
            <div className="modal-box">
              <h3 className="font-bold text-lg">
                {selectedItem?.timetableName}에 대한 비밀번호를 입력하세요.
              </h3>
              <div className="py-4">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={handlePasswordChange}
                  className="input input-bordered w-full max-w-xs"
                  placeholder="비밀번호 입력"
                />
                {passwordError && (
                  <p className="text-sm text-red-500 mt-2">
                    비밀번호가 틀렸습니다.
                  </p>
                )}
              </div>
              <div className="modal-action">
                {/* 닫기 버튼 */}
                <button className="btn" onClick={closeModal}>
                  닫기
                </button>
                {/* 제출 버튼 */}
                <button
                  className="btn btn-primary"
                  onClick={handlePasswordSubmit}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
