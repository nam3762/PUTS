import { useEffect } from "react";
import Button from "../../components/Button";
import Form from "../../components/form/Form";
import InputText from "../../components/form/InputText";
import Toggle from "../../components/Toggle";
import Select from "../../components/Select";
import { useFormContext, Controller } from "react-hook-form";
import DivisionGroup from "./Lectures/DivisionGroup";
import { useLecture } from "../../hooks/useLecture";
import usePreventBackNavigation from "../../hooks/usePreventBackNavigation";
import { useNavigate } from "react-router-dom";
import Tooltip from "../../components/Tooltip";

export default function Lectures() {
  const {
    control,
    register,
    watch,
    setValue, // 추가: setValue로 강의실 그룹 값을 명시적으로 설정
    formState: { errors },
  } = useFormContext();
  const [
    lectureFields,
    currentIndex,
    classroomGroupOptions,
    handleAddLecture,
    handleRemoveLecture,
    handlePageChange, // 드롭다운에서 선택된 강의를 변경하는 함수
    handleGroupChange,
  ] = useLecture();

  const lectures = watch("lectures");
  const currentGroup = watch(`lectures.${currentIndex}.group`); // 현재 강의실 그룹 값 관찰

  // 강의 드롭다운 선택 옵션 생성
  const lectureOptions = lectureFields.map((lecture, index) => ({
    value: index,
    label: `강의 ${index + 1}: ${lecture.lectureName || "이름 없음"}`,
  }));

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

  // 선택된 강의실 그룹이 UI적으로 저장되도록 useEffect로 값 설정
  useEffect(() => {
    if (currentGroup) {
      setValue(`lectures.${currentIndex}.group`, parseInt(currentGroup, 10));
    }
  }, [currentGroup, currentIndex, setValue]);

  return (
    <Form
      title="STEP 4: 강의 정보"
      prev="/timetable/classrooms"
      next="/timetable/postgraduatelectures"
    >
      <div className="flex justify-between">
        {/* 드롭다운을 이용한 강의 선택 */}
        <Select
          style="select-bordered mt-0 mb-4"
          options={lectureOptions}
          onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
          value={currentIndex}
        >
          강의 선택
        </Select>
        <span className="my-2 label-text text-right text-xs text-base-content font-bold">
          대학원(야간) 강의 입력은 다음 STEP에서 진행합니다.
        </span>
      </div>

      {lectureFields.length > 0 && (
        <div
          key={lectureFields[currentIndex]?.id}
          className="mb-4 px-4 rounded border-2 border-base-300"
        >
          {/* 레이아웃을 flex로 변경하여 좌/우 배치 */}
          <div className="flex">
            {/* 왼쪽: 강의 정보 입력 (1:2 비율로 조정) */}
            <div className="w-1/3 space-y-4 p-4">
              {/* 강의 번호 표시 */}
              <div className="flex justify-between items-center ">
                <kbd className="kbd kbd-sm max-w-24 font-sans font-semibold bg-base-content text-base-200 max-h-1 px-4">
                  {currentIndex + 1}번 강의
                </kbd>
                <Controller
                  control={control}
                  name={`lectures.${currentIndex}.majorRequired`}
                  render={({ field }) => (
                    <Toggle
                      checked={field.value}
                      onChange={field.onChange}
                      style="mt-4"
                      textStyle="mt-4"
                    >
                      전공 필수
                    </Toggle>
                  )}
                />
              </div>

              {/* 교과목명과 교과목 코드 한 행에 두 개씩 배치 */}
              <div className="grid grid-cols-2 gap-4">
                {/* 교과목명 */}
                <div className="w-full">
                  <span className="label-text text-base-content font-bold">
                    교과목명
                  </span>
                  <InputText
                    {...register(`lectures.${currentIndex}.lectureName`, {
                      required: "교과목명을 입력해주세요.",
                    })}
                  >
                    자료구조
                  </InputText>
                  {errors?.lectures?.[currentIndex]?.lectureName && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.lectures[currentIndex].lectureName.message}
                    </p>
                  )}
                </div>

                {/* 교과목 코드 */}
                <div className="w-full">
                  <span className="label-text text-base-content font-bold">
                    교과목 코드
                  </span>
                  <InputText
                    {...register(`lectures.${currentIndex}.lectureCode`, {
                      required: "교과목 코드를 입력해주세요.",
                    })}
                  >
                    SW-001
                  </InputText>
                  {errors?.lectures?.[currentIndex]?.lectureCode && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.lectures[currentIndex].lectureCode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 학년과 강의실 그룹 선택도 한 행에 두 개씩 배치 */}
              <div className="grid grid-cols-2 gap-4">
                {/* 학년 */}
                <div className="w-full">
                  <span className="label-text text-base-content font-bold">
                    학년
                  </span>
                  <Tooltip>{`전 학년 가능한 강의의 경우 0으로 입력`}</Tooltip>
                  <InputText
                    {...register(`lectures.${currentIndex}.year`, {
                      required: "학년을 입력해주세요.",
                      setValueAs: (v) => parseInt(v, 10),
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "숫자만 입력해주세요.",
                      },
                    })}
                  >
                    2
                  </InputText>
                  {errors?.lectures?.[currentIndex]?.year && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.lectures[currentIndex].year.message}
                    </p>
                  )}
                </div>

                {/* 강의실 그룹 선택 */}
                <div className="w-full">
                  <span className="label-text text-base-content font-bold">
                    강의실 그룹
                  </span>
                  <Select
                    style="select-bordered"
                    {...register(`lectures.${currentIndex}.group`, {
                      required: "강의실 그룹을 선택해주세요.",
                      setValueAs: (value) => parseInt(value, 10), // 입력값을 int로 변환
                      validate: (value) =>
                        value !== "" || "강의실 그룹을 선택해주세요.",
                    })}
                    value={lectures[currentIndex].group} // 현재 group의 id 값을 설정
                    onChange={(e) =>
                      handleGroupChange(parseInt(e.target.value, 10))
                    } // 그룹 변경 핸들러 사용
                    options={classroomGroupOptions} // id와 이름을 가진 옵션 목록
                  >
                    -
                  </Select>

                  {errors?.lectures?.[currentIndex]?.group && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {errors.lectures[currentIndex].group.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 하단 버튼들 */}
              <div className="flex justify-between space-x-4">
                <Button onClick={() => handleAddLecture(false)} style="my-12">
                  강의 추가
                </Button>

                <Button
                  style={`${
                    lectures.length > 1 ? "" : "invisible"
                  } btn-error my-12`}
                  onClick={(event) => handleRemoveLecture(event, currentIndex)}
                >
                  강의 삭제
                </Button>
              </div>
            </div>

            {/* Divider를 flex 안에서 배치 */}
            <div className="divider divider-horizontal"></div>

            {/* 오른쪽: 분반 입력 (2/3 비율로 조정) */}
            <div className="w-2/3">
              <DivisionGroup
                control={control}
                currentIndex={currentIndex}
                fieldName="lectures" // 일반 강의에서 사용될 고유 필드
              />
            </div>
          </div>
        </div>
      )}
    </Form>
  );
}
