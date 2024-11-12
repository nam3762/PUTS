import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // state와 페이지 이동을 위한 훅

export default function TimetableInfo() {
  const location = useLocation(); // location에서 state를 통해 전달된 값 받음
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate
  const { timetableId } = location.state || {}; // state에서 timetableId 추출

  const [timetable, setTimetable] = useState(null); // 시간표 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태

  // 컴포넌트 마운트 시 시간표 데이터 가져오기
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await fetch(
          `https://125.251.212.92/timetables/${timetableId}`
        );
        if (!response.ok) {
          throw new Error("시간표 데이터를 불러오는데 실패했습니다.");
        }
        const data = await response.json();
        setTimetable(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (timetableId) {
      fetchTimetable();
    } else {
      setError("유효하지 않은 시간표 ID입니다.");
      setLoading(false);
    }
  }, [timetableId]);

  // 삭제 모달 열기
  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://125.251.212.92/timetables/${timetableId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("시간표 삭제에 실패했습니다.");
      }
      alert(`시간표 ID ${timetableId}가 삭제되었습니다.`);
      setIsModalOpen(false); // 모달 닫기
      navigate("/search"); // 삭제 후 목록으로 이동
    } catch (err) {
      console.error(err);
      alert("시간표 삭제에 실패했습니다.");
    }
  };

  // 재구성 버튼 클릭 핸들러 (필요에 따라 구현)
  const handleRegenerate = () => {
    alert(`시간표 ID ${timetableId}를 재구성합니다.`);
    // 재구성 로직을 여기에 추가
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center h-screen -mt-12">
        <div className="flex flex-col justify-center items-center">
          <div className="text-center text-base-content text-sm my-4">
            시간표 정보 로딩 중...
          </div>
          <span className="loading loading-spinner loading-lg text-base-content"></span>
        </div>
      </div>
    );
  }

  // 에러가 발생했을 때
  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center h-screen -mt-12">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-4xl p-5">
      <h1 className="text-base-content text-2xl font-bold mb-6">시간표 정보</h1>
      <div className="card w-full bg-base-100 shadow-xl mb-8 text-base-content">
        <div className="card-body">
          <p>
            <span className="font-bold">ID:</span> {timetable.id}
          </p>
          <p>
            <span className="font-bold">이름:</span> {timetable.timetableName}
          </p>
          <p>
            <span className="font-bold">설명:</span>{" "}
            {timetable.timetableDescription}
          </p>
          <div className="card-actions justify-end mt-4">
            <a
              href={`https://125.251.212.92/downloads/timetable_${timetableId}.xlsx`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success"
            >
              다운로드
            </a>
            <button className="btn btn-error" onClick={openDeleteModal}>
              삭제
            </button>
          </div>
        </div>
      </div>

      <div className="card w-full bg-base-100 shadow-xl text-base-content">
        <div className="card-body">
          <h2 className="card-title">입력 수정 / 시간표 재구성</h2>
          <p>입력된 정보를 수정하고 새로운 시간표를 만들 수 있습니다.</p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary" onClick={handleRegenerate}>
              재구성
            </button>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {isModalOpen && (
        <div className="modal modal-open text-base-content">
          <div className="modal-box">
            <h3 className="font-bold text-lg">시간표 삭제</h3>
            <p className="py-4">정말로 이 시간표를 삭제하시겠습니까?</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>
                삭제
              </button>
              <button className="btn" onClick={closeModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
