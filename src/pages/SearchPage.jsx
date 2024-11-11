import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const searchRef = useRef(""); // 검색 값을 관리
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState(""); // 입력된 비밀번호를 관리
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 오류 여부
  const [filteredData, setFilteredData] = useState([]); // 필터된 데이터를 저장
  const [data, setData] = useState([]); // 백엔드에서 불러온 전체 데이터를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 페이지네이션 관련 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 5; // 한 페이지에 보여줄 데이터 수

  // 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    fetchAllTimetables();
  }, []);

  const fetchAllTimetables = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://125.251.212.92/timetables");
      if (!response.ok) {
        throw new Error("데이터를 불러오는데 실패했습니다.");
      }
      const result = await response.json();
      setData(result);
      setFilteredData(result);
      setCurrentPage(1);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = () => {
    const searchTerm = searchRef.current.value.trim().toLowerCase();
    if (searchTerm === "") {
      // 검색어가 없으면 모든 시간표를 불러옴
      setFilteredData(data);
      setError(null);
    } else {
      // 검색어로 ID 및 이름에서 부분 검색
      const filtered = data.filter(
        (item) =>
          item.id.toString().includes(searchTerm) ||
          (item.timetableName || "").toLowerCase().includes(searchTerm)
      );
      if (filtered.length > 0) {
        setFilteredData(filtered);
        setError(null);
      } else {
        setFilteredData([]);
        setError("검색 결과가 없습니다.");
      }
    }
    setCurrentPage(1); // 검색 후 페이지를 첫 페이지로 초기화
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

  // 로딩 중일 때
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-base-content">로딩 중...</div>
      </div>
    );
  }

  // 데이터 로딩 에러 발생 시
  if (error && data.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 justify-center">
      <div className="flex flex-col justify-center items-center mx-auto w-full max-w-4xl p-5">
        <h1 className="text-base-content text-2xl font-bold mb-6">
          시간표 검색
        </h1>

        {/* 검색 입력 필드 */}
        <div className="flex items-center mb-5">
          <input
            type="text"
            ref={searchRef} // useRef로 input 값을 참조
            placeholder="시간표 ID 또는 이름을 입력하세요"
            className="input input-bordered w-full max-w-xs text-base-content"
          />
          <button
            className="btn btn-primary ml-2"
            onClick={handleSearch} // 검색 버튼 클릭 시
          >
            검색
          </button>
        </div>

        {/* 에러 메시지 (검색 결과 없음 등) */}
        {error && data.length > 0 && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}

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
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr key={item.id} className="text-base-content">
                  <td className="border-b border-b-content">{item.id}</td>
                  <td className="border-b border-b-content">
                    {item.timetableName || "이름 없음"}
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
                      <span
                        className="material-icons"
                        style={{ fontSize: "1.2rem" }}
                      >
                        lock
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-base-content">
                  검색 결과가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        {filteredData.length > 0 && (
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
        )}

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
