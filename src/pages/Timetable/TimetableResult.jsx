import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import usePreventBackNavigation from "../../hooks/usePreventBackNavigation";
import { useFormContext } from "react-hook-form";
import Form from "../../components/form/Form";

export default function TimetableResult() {
  const { watch, handleSubmit } = useFormContext();
  const navigate = useNavigate();

  // 새로 고침, 뒤로 가기, 앞으로 가기 시 홈화면으로
  usePreventBackNavigation();

  // STEP 1을 건너뛰고 온 사용자를 홈화면으로 리다이렉트
  const timetableName = watch("timetableName"); // 이전 페이지에서 입력한 시간표 이름을 확인
  useEffect(() => {
    if (!timetableName) {
      // 만약 이전 단계의 필수 값이 없으면 초기 화면으로 리다이렉트
      navigate("/");
    }
  }, [timetableName, navigate]);

  // TP로 변환하는 함수
  const transformLecturesToTPs = (lectures, postgraduateLectures) => {
    const transformLecture = (lecture, isGradLecture = false) => {
      return lecture.divisionGroup.flatMap((division, divisionIndex) => {
        // sectionGroup을 sectionTime 기준으로 내림차순 정렬
        const sortedSections = [...division.sectionGroup].sort((a, b) => {
          const aTime = parseInt(a.sectionTime, 10);
          const bTime = parseInt(b.sectionTime, 10);
          return bTime - aTime; // 내림차순 정렬
        });

        return sortedSections.map((section, tpIndex) => {
          return {
            lectureName: isGradLecture
              ? lecture.postgraduateLectureName
              : lecture.lectureName,
            lectureCode: isGradLecture
              ? lecture.postgraduateLectureCode
              : lecture.lectureCode,
            year: lecture.year || 1,
            group: lecture.group || 1,
            professorCode: division.professor || "",
            capacity: division.capacity || 0,
            majorRequired: lecture.majorRequired || false,
            isGrad: isGradLecture,
            atNight: isGradLecture ? lecture.atNight : false,
            gradClassrooms: isGradLecture ? lecture.gradClassrooms : [],
            divisionNumber:
              division.divisionNumber !== undefined
                ? division.divisionNumber
                : divisionIndex,
            TPNumber: tpIndex, // TP 번호
            duration: parseInt(section.sectionTime, 10),
            isTPGroup: section.isTPGroup1 || section.isTPGroup2 || false,
            isFixedTime: section.isFixedTime || false,
            FixedTime: section.FixedTime || [],
          };
        });
      });
    };

    const undergraduateTPs = lectures.flatMap((lecture) =>
      transformLecture(lecture)
    );
    const postgraduateTPs = postgraduateLectures.flatMap((postLecture) =>
      transformLecture(postLecture, true)
    );

    const allTPs = [...undergraduateTPs, ...postgraduateTPs];

    // 전체 TPs를 lectureCode와 divisionNumber로 그룹화하여 duration 기준 내림차순 정렬
    const sortedTPs = allTPs.sort((a, b) => {
      if (
        a.lectureCode === b.lectureCode &&
        a.divisionNumber === b.divisionNumber
      ) {
        return b.duration - a.duration; // 같은 강의와 분반 내에서 duration 내림차순 정렬
      } else {
        return 0; // 순서를 변경하지 않음
      }
    });

    return sortedTPs;
  };

  // 백엔드로 데이터 전송
  const sendToBackend = async (transformedData) => {
    try {
      const response = await fetch("http://125.251.212.92:8000/timetables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        throw new Error("Failed to send data to backend");
      }

      const result = await response.json();
      console.log("Successfully sent data to backend:", result);
      alert("시간표 제출이 완료되었습니다."); // 성공 시 alert
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  // 폼 제출 핸들러
  const handleFinalSubmit = (data) => {
    // 제출하기 전에 classroomGroups와 postgraduateLectures 필드를 삭제
    const sanitizedData = { ...data };
    delete sanitizedData.classroomGroups;
    delete sanitizedData.postgraduateLectures;

    // lectures 데이터를 transform하여 TPs를 추가
    const transformedData = {
      ...sanitizedData,
      lectures: transformLecturesToTPs(
        sanitizedData.lectures,
        data.postgraduateLectures // 여기서 lecture 데이터를 사용해 변환
      ),
    };

    console.log("Final Transformed Data:", transformedData);

    // 백엔드로 전송
    sendToBackend(transformedData);
  };

  return (
    <Form
      title="STEP 7: 시간표 선택 및 저장"
      prev="/timetable/timetablecustomizing"
      final={true}
    >
      <h1 className="text-base-content">시간표 제작 중 ...</h1>
      <progress className="progress w-56 my-2"></progress>

      <div className="mt-4">
        <button
          className="btn btn-primary"
          onClick={handleSubmit(handleFinalSubmit)} // 최종 제출 시 백엔드로 데이터 전송
        >
          시간표 제출하기
        </button>
      </div>

      <div className="mt-4">
        <button className="btn btn-sm text-base-content">
          Excel 파일로 저장하기
        </button>
      </div>
    </Form>
  );
}
