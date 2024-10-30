import { useEffect } from "react";
import Form from "../../components/form/Form";
import { useFormContext } from "react-hook-form";
import usePreventBackNavigation from "../../hooks/usePreventBackNavigation";
import { useNavigate } from "react-router-dom";

export default function ClassroomGroups() {
  const { control, register, getValues, watch, setValue } = useFormContext();

  // classroomGroups 데이터를 폼 데이터로부터 가져옴
  const classroomGroups = getValues("classroomGroups");

  const classrooms = watch("classrooms");

  // group 선택에 따라 classrooms의 group 값을 업데이트
  function handleGroupChange(groupIndex, classroomId, isChecked) {
    setValue(
      "classrooms",
      classrooms.map((classroom) => {
        const classroomFullId = `${classroom.buildingName}-${classroom.classroomNumber}`;

        if (classroomFullId === classroomId) {
          return {
            ...classroom,
            group: isChecked ? groupIndex : 0, // 그룹을 선택했을 때 업데이트
          };
        }
        return classroom;
      })
    );
  }

  const getClassroomState = (groupIndex, classroomId) => {
    const classroom = classrooms.find(
      (cls) => `${cls.buildingName}-${cls.classroomNumber}` === classroomId
    );
    const isCheckedInGroup = classroom?.group === groupIndex;
    const isSelectedInOtherGroups =
      classroom?.group !== groupIndex && classroom?.group !== 0;

    return { isCheckedInGroup, isSelectedInOtherGroups };
  };

  // 새로 고침, 뒤로 가기, 앞으로 가기 시 홈화면으로
  usePreventBackNavigation();

  // STEP 1을 건너뛰고 온 사용자를 홈화면으로 리다이렉트
  const navigate = useNavigate();
  const timetableName = watch("timetableName"); // 이전 페이지에서 입력한 시간표 이름을 확인
  useEffect(() => {
    if (!timetableName) {
      // 만약 이전 단계의 필수 값이 없으면 초기 화면으로 리다이렉트
      navigate("/");
    }
  }, [timetableName, navigate]);

  return (
    <Form
      title="STEP 4: 강의실 그룹 정보"
      prev="/timetable/classrooms"
      next="/timetable/lectures"
    >
      {classroomGroups.map((group, groupIndex) => (
        <div
          key={group.id}
          tabIndex={0}
          className="collapse collapse-arrow collapse-open mt-2 mb-6 p-4 rounded border-2 border-base-300"
        >
          <input type="checkbox" className="appearance-none absolute" />
          <label
            htmlFor="group.groupName"
            className="collapse-title col-span-2 btn bg-base-content text-base-200 rounded font-sans font-bold cursor-pointer"
          >
            {group.groupName} 강의실
          </label>
          <div className="collapse-content px-0 peer-checked:block">
            <div className="form-control grid grid-cols-6 gap-x-20 mt-4">
              {classrooms.map((classroom) => {
                const classroomId = `${classroom.buildingName}-${classroom.classroomNumber}`;
                const { isCheckedInGroup, isSelectedInOtherGroups } =
                  getClassroomState(groupIndex, classroomId);

                return (
                  <label key={classroomId} className="cursor-pointer label">
                    <input
                      type="checkbox"
                      className={`checkbox checkbox-xs m-2 ${
                        isCheckedInGroup
                          ? "checkbox-success"
                          : isSelectedInOtherGroups
                          ? "checkbox-error"
                          : "checkbox-neutral"
                      }`}
                      checked={isCheckedInGroup}
                      onChange={(e) =>
                        handleGroupChange(
                          groupIndex,
                          classroomId,
                          e.target.checked
                        )
                      }
                    />
                    <span
                      className={`label-text text-sm ${
                        isCheckedInGroup
                          ? "text-success"
                          : isSelectedInOtherGroups
                          ? "text-error"
                          : ""
                      }`}
                    >
                      {classroom.buildingName}-{classroom.classroomNumber}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </Form>
  );
}
