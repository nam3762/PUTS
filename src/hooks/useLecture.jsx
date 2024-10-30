import { useState, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

export function useLecture() {
  const { control, watch, getValues, setValue } = useFormContext();
  const {
    fields: lectureFields,
    append: appendLecture,
    remove: removeLecture,
  } = useFieldArray({
    control,
    name: "lectures",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const lectures = watch("lectures");
  const classroomGroups = getValues("classroomGroups");

  // classroomGroupOptions에서 id를 value로 설정
  const classroomGroupOptions = classroomGroups.map((classroomGroup) => ({
    value: classroomGroup.id, // id를 value로 사용
    label: classroomGroup.groupName, // groupName을 label로 사용
  }));

  // 강의가 없으면 하나의 기본 강의를 추가
  useEffect(() => {
    if (lectureFields.length === 0) {
      appendLecture({
        lectureName: "",
        lectureCode: "",
        year: 1, // 학년은 일반 강의에서만 필요
        group: "", // group 필드 초기화
        majorRequired: false,
        isGrad: false,
        divisionGroup: [
          {
            divisionNumber: 0, // 첫 분반은 0번부터 시작
            sectionGroup: [
              {
                sectionTime: "",
                isTPGroup1: false,
              },
              {
                sectionTime: "",
                isTPGroup2: false,
              },
            ],
            capacity: "",
            professor: "",
          },
        ], // 항상 최소 1개의 분반을 추가
      });
    }
  }, [lectureFields, appendLecture]);

  function handleAddLecture() {
    appendLecture({
      lectureName: "",
      lectureCode: "",
      year: 1,
      group: "", // 새로운 강의의 group 초기화
      majorRequired: false,
      isGrad: false,
      divisionGroup: [
        {
          divisionNumber: 0, // 첫 분반은 0번부터 시작
          sectionGroup: [
            {
              sectionTime: "",
              isTPGroup1: false,
            },
            {
              sectionTime: "",
              isTPGroup2: false,
            },
          ],
          capacity: "",
          professor: "",
        },
      ], // 항상 최소 1개의 분반을 추가
    });

    // 새로운 강의를 추가한 후 인덱스를 마지막 강의로 설정
    setCurrentIndex(lectureFields.length);
  }

  function handleRemoveLecture(event, index) {
    event.stopPropagation();
    if (lectureFields.length > 1) {
      removeLecture(index);
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0)); // 현재 인덱스 재조정
    }
  }

  const handlePageChange = (index) => {
    setCurrentIndex(index); // 드롭다운에서 선택된 인덱스 변경
  };

  // 강의의 group 필드를 classroomGroup의 id로 매핑
  const handleGroupChange = (selectedGroupId) => {
    setValue(
      `lectures.${currentIndex}.group`,
      selectedGroupId === "" ? "" : parseInt(selectedGroupId, 10)
    );
  };

  return [
    lectureFields,
    currentIndex,
    classroomGroupOptions,
    handleAddLecture,
    handleRemoveLecture,
    handlePageChange,
    handleGroupChange, // group 변경 핸들러 반환
  ];
}
