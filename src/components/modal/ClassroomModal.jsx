import { useState, useEffect } from "react";
import Button from "../../components/Button";

export default function ClassroomModal({
  classrooms,
  selectedClassrooms,
  onClose,
}) {
  const [selected, setSelected] = useState([]);

  // 모달을 열 때마다 selectedClassrooms를 selected 상태로 초기화
  useEffect(() => {
    console.log(
      "Initializing selection with selectedClassrooms:",
      selectedClassrooms
    );

    const initializedSelection = selectedClassrooms
      .map((classroomId) => {
        const match = classroomId.match(/^([^-]+-\d)-(\d+)$/);
        if (match) {
          const [, buildingName, classroomNumber] = match;
          return { buildingName, classroomNumber };
        }
        return null; // 매칭되지 않는 경우 null 반환
      })
      .filter(Boolean); // null을 제거

    setSelected(initializedSelection);
  }, [selectedClassrooms]);

  // 강의실 선택 및 해제 핸들러
  const handleCheckboxChange = (classroom) => {
    setSelected((prev) =>
      prev.some(
        (c) =>
          c.buildingName === classroom.buildingName &&
          c.classroomNumber === classroom.classroomNumber
      )
        ? prev.filter(
            (c) =>
              c.buildingName !== classroom.buildingName ||
              c.classroomNumber !== classroom.classroomNumber
          )
        : [...prev, classroom]
    );
  };

  // 선택된 강의실을 부모 컴포넌트로 전달
  const handleConfirm = () => {
    onClose(selected);
  };

  // 초기화 버튼: 모든 선택 해제
  const handleReset = () => {
    setSelected([]);
  };

  // 전체 선택 버튼: 모든 강의실 선택
  const handleSelectAll = () => {
    setSelected(classrooms);
  };

  // 강의실이 선택되었는지 여부 확인
  const isClassroomSelected = (classroom) => {
    return selected.some(
      (c) =>
        c.buildingName === classroom.buildingName &&
        c.classroomNumber === classroom.classroomNumber
    );
  };

  return (
    <div className="modal modal-open text-base-content">
      <div className="modal-box">
        <div className="flex justify-between">
          <h2 className="font-bold text-lg">강의실 선택</h2>
          <div className="flex space-x-2">
            <Button onClick={handleReset} style="btn-warning btn-sm text-sm">
              초기화
            </Button>
            <Button onClick={handleSelectAll} style="btn-sm text-sm">
              전체 선택
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-8 mt-4">
          {classrooms.map((classroom, index) => (
            <label key={index} className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="checkbox"
                checked={isClassroomSelected(classroom)} // 선택된 강의실은 체크된 상태
                onChange={() => handleCheckboxChange(classroom)}
              />
              <span>{`${classroom.buildingName} - ${classroom.classroomNumber}`}</span>
            </label>
          ))}
        </div>
        <div className="modal-action mt-8">
          <Button onClick={handleConfirm} style="btn-primary">
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
