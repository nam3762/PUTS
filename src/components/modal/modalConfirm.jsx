import React from "react";

const ModalConfirm = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* 다크 배경 */}
      <div className="modal modal-open z-50">
        <div className="modal-box relative">
          <h3 className="font-bold text-lg text-base-content">
            이 페이지에서 나가시겠습니까?
          </h3>
          <p className="pt-2 text-base-content">
            이 페이지를 나가면 입력하신 정보가 저장되지 않습니다.
          </p>
          <p className="pb-2 text-base-content">계속 진행하시겠습니까?</p>
          <div className="modal-action">
            <button className="btn" onClick={onCancel}>
              취소
            </button>
            <button className="btn btn-primary" onClick={onConfirm}>
              나가기
            </button>
          </div>
        </div>
      </div>
      {/* 배경 덮개 */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
    </>
  );
};

export default ModalConfirm;
