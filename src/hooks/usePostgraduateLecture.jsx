import { useState, useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";

export function usePostgraduateLecture() {
  const { control, watch, getValues, setValue } = useFormContext();
  const {
    fields: lectureFields,
    append: appendLecture,
    remove: removeLecture,
  } = useFieldArray({
    control,
    name: "postgraduateLectures",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const lectures = watch("postgraduateLectures");

  // 기존의 classroomGroups 관련 코드 삭제
  // (대학원 강의에서는 강의실 선택을 다르게 처리하므로 필요 없음)

  // 강의가 없으면 하나의 기본 대학원 강의를 추가
  useEffect(() => {
    if (lectureFields.length === 0) {
      appendLecture({
        postgraduateLectureName: "", // 대학원 강의 이름
        postgraduateLectureCode: "",
        gradClassrooms: [], // 강의실 정보
        atNight: false, // 대학원 강의만 해당
        isGrad: true, // 대학원 강의
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
      postgraduateLectureName: "", // 대학원 강의 이름
      postgraduateLectureCode: "",
      gradClassrooms: [], // 강의실 정보
      atNight: false, // 대학원 강의만 해당
      isGrad: true, // 대학원 강의
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

    // 추가 후 바로 업데이트된 인덱스 사용
    setCurrentIndex(lectureFields.length); // 업데이트된 후 길이
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

  return [
    lectureFields,
    currentIndex,
    handleAddLecture,
    handleRemoveLecture,
    handlePageChange,
  ];
}
