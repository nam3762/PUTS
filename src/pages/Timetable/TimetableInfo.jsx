import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // state와 페이지 이동을 위한 훅

export default function TimetableInfo() {
  const location = useLocation(); // location에서 state를 통해 전달된 값 받음
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate
  const { timetableId, timetableName, timetableDescription } =
    location.state || {}; // state에서 필요한 데이터 추출

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달창 상태

  // 삭제 모달 열기
  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDelete = () => {
    // 실제 삭제 로직을 여기에 추가
    alert(`시간표 ID ${timetableId}가 삭제되었습니다.`);
    setIsModalOpen(false); // 모달 닫기
    navigate("/search"); // 삭제 후 목록으로 이동
  };

  // 수정 버튼 클릭 핸들러 (수정 페이지로 이동할 수 있음)
  const handleEdit = () => {
    alert(`시간표 ID ${timetableId}를 수정합니다.`);
    // 예시: 수정 페이지로 이동하거나 상태 관리
  };

  // 재구성 버튼 클릭 핸들러 (수정 페이지로 이동할 수 있음)
  const handleRegenerate = () => {
    alert(`시간표 ID ${timetableId}를 재구성합니다.`);
  };

  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-4xl p-5">
      <h1 className="text-base-content text-2xl font-bold mb-6">시간표 정보</h1>
      <div className="card w-full bg-base-100 shadow-xl mb-8 text-base-content">
        <div className="card-body">
          <p>
            <span className="font-bold">ID:</span> {timetableId}
          </p>
          <p>
            <span className="font-bold">이름:</span> {timetableName}
          </p>
          <p>
            <span className="font-bold">설명:</span> {timetableDescription}
          </p>
          <div className="card-actions justify-end mt-4">
            <button className="btn btn-success">다운로드</button>
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
