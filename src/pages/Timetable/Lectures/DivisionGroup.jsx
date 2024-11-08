import { forwardRef, useState, useEffect } from "react";
import Button from "../../../components/Button";
import InputText from "../../../components/form/InputText";
import Select from "../../../components/Select";
import Tooltip from "../../../components/Tooltip";
import { useFieldArray, useFormContext, Controller } from "react-hook-form";

// DivisionGroup 컴포넌트 (Lecture와 PostgraduateLecture 모두 사용 가능)
const DivisionGroup = forwardRef(function (
  { control, currentIndex, fieldName }, // fieldName 추가
  ref
) {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    control: formControl,
  } = useFormContext();
  const {
    fields: divisionFields,
    append: appendDivision,
    remove: removeDivision,
    update: updateDivision,
  } = useFieldArray({
    control,
    name: `${fieldName}.${currentIndex}.divisionGroup`, // fieldName을 동적으로 사용
  });

  const [activeDivisionIndex, setActiveDivisionIndex] = useState(0); // 현재 선택된 분반 인덱스 상태

  const professors = getValues("professors");

  // 교수 목록을 select 옵션으로 변환
  const professorOptions = professors.map((professor) => ({
    value: professor.professorCode,
    label: `${professor.professorName}-${professor.professorCode}`,
  }));

  // 분반이 없을 경우 useEffect로 하나의 기본 분반을 추가
  useEffect(() => {
    if (divisionFields.length === 0) {
      appendDivision({
        divisionNumber: 0, // 첫 분반은 0번부터 시작
        sectionGroup: [
          {
            sectionTime: "",
            isTPGroup1: false,
            // 미리 배치된 강의인가 (커스터마이징 기능)
            isFixedTime: false,
            // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
            FixedTime: [],
          },
          {
            sectionTime: "",
            isTPGroup2: false,
            // 미리 배치된 강의인가 (커스터마이징 기능)
            isFixedTime: false,
            // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
            FixedTime: [],
          },
        ],
        capacity: "",
        professor: "",
      });
    }
  }, [divisionFields, appendDivision]);

  // 분반 삭제 시 로직: 분반이 삭제되면 나머지 분반의 번호를 재정렬
  function handleRemoveDivision(divisionIndex) {
    if (divisionFields.length > 1) {
      removeDivision(divisionIndex);

      // 삭제한 분반 이후의 분반들의 divisionNumber를 재정렬
      for (let i = divisionIndex + 1; i < divisionFields.length; i++) {
        updateDivision(i - 1, {
          ...divisionFields[i],
          divisionNumber: i - 1, // 삭제한 후 번호 재정렬
        });
      }

      setActiveDivisionIndex((prev) => (prev > 0 ? prev - 1 : 0)); // 현재 인덱스 재조정
    }
  }

  // 분반 추가 시 로직: 추가된 분반으로 자동 이동
  function handleAddDivision() {
    const nextDivisionNumber = divisionFields.length; // 마지막 분반 번호 다음 번호로 추가
    appendDivision({
      divisionNumber: nextDivisionNumber, // 자동으로 다음 분반 번호 설정
      sectionGroup: [
        {
          sectionTime: "",
          isTPGroup1: false, // 강의 시간 분리 그룹화1
          // 미리 배치된 강의인가 (커스터마이징 기능)
          isFixedTime: false,
          // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
          FixedTime: [],
        },
        {
          sectionTime: "",
          isTPGroup2: false, // 강의 시간 분리 그룹화2
          // 미리 배치된 강의인가 (커스터마이징 기능)
          isFixedTime: false,
          // 미리 배치된 강의의 시간 [0, 0] -> 월요일, 1교시
          FixedTime: [],
        },
      ],
      capacity: "", // 빈 문자열로 초기화하여 사용자 입력 전까지 빈 칸으로 유지
      professor: "",
    });
    setActiveDivisionIndex(divisionFields.length); // 새 분반으로 자동 이동
  }

  // 선택된 인덱스의 분반만 표시
  return (
    <div>
      {/* 현재 선택된 분반만 표시 */}
      {divisionFields.length > 0 && (
        <div
          key={divisionFields[activeDivisionIndex]?.id}
          className="grid grid-cols-4 gap-4 p-4"
        >
          <kbd
            className={`kbd kbd-sm max-w-24 font-sans font-semibold badge-warning text-base-warning max-h-1 mt-4`}
          >
            {divisionFields[activeDivisionIndex]?.divisionNumber + 1}번 분반
          </kbd>

          <div className="flex justify-end col-span-3">
            <Button
              style={`${
                divisionFields.length > 1 ? "" : "invisible"
              } btn-error btn-sm mt-4 mb-0`}
              onClick={() => handleRemoveDivision(activeDivisionIndex)}
            >
              분반 삭제
            </Button>
          </div>

          <div className="w-full">
            {/* 강의 시간 분리 1 */}
            <span className="label-text text-base-content font-bold">
              강의 시간 분리 1
            </span>
            <Tooltip>
              {`한번 강의할 때 몇 시간 강의할지 결정합니다.
                총 4시간 강의일 때 → (0, 4) or (1, 3) or (2, 2)
                ※ 미 입력 칸은 0으로 처리합니다.

                그룹화 체크 시
                같은 강의 - 다른 분반 - 강의 시간 분리 (같은 숫자)을
                같은 시간에 배정합니다. (ex: 캡스톤디자인)`}
            </Tooltip>
            <InputText
              {...register(
                `${fieldName}.${currentIndex}.divisionGroup.${activeDivisionIndex}.sectionGroup.0.sectionTime`, // fieldName 동적 설정
                {
                  required: "강의 시간을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요.",
                  },
                  min: {
                    value: 1,
                    message: "1 이상의 숫자를 입력해주세요.",
                  },
                  max: {
                    value: 13,
                    message: "13 이하의 숫자를 입력해주세요.",
                  },
                }
              )}
            />
            {errors?.[fieldName]?.[currentIndex]?.divisionGroup?.[
              activeDivisionIndex
            ]?.sectionGroup?.[0]?.sectionTime && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {
                  errors?.[fieldName]?.[currentIndex]?.divisionGroup?.[
                    activeDivisionIndex
                  ]?.sectionGroup?.[0]?.sectionTime.message
                }
              </p>
            )}
            {/* 강의 시간 분리 1의 체크박스 */}
            <Controller
              name={`${fieldName}.${currentIndex}.divisionGroup.${activeDivisionIndex}.sectionGroup.0.isTPGroup1`} // fieldName 동적 설정
              control={formControl}
              render={({ field }) => (
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <span className="label-text">그룹화 1 체크</span>
                </div>
              )}
            />
          </div>

          {/* 강의 시간 분리 2 */}
          <div className="w-full">
            <span className="label-text text-base-content font-bold">
              강의 시간 분리 2
            </span>
            <InputText
              {...register(
                `${fieldName}.${currentIndex}.divisionGroup.${activeDivisionIndex}.sectionGroup.1.sectionTime`, // fieldName 동적 설정
                {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요.",
                  },
                  min: {
                    value: 0,
                    message: "0 이상의 숫자를 입력해주세요.",
                  },
                  max: {
                    value: 13,
                    message: "13 이하의 숫자를 입력해주세요.",
                  },
                }
              )}
            />
            {errors?.[fieldName]?.[currentIndex]?.divisionGroup?.[
              activeDivisionIndex
            ]?.sectionGroup?.[1]?.sectionTime && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {
                  errors?.[fieldName]?.[currentIndex]?.divisionGroup?.[
                    activeDivisionIndex
                  ]?.sectionGroup?.[1]?.sectionTime.message
                }
              </p>
            )}
            {/* 강의 시간 분리 2의 체크박스 */}
            <Controller
              name={`${fieldName}.${currentIndex}.divisionGroup.${activeDivisionIndex}.sectionGroup.1.isTPGroup2`} // fieldName 동적 설정
              control={formControl}
              render={({ field }) => (
                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                  <span className="label-text">그룹화 2 체크</span>
                </div>
              )}
            />
          </div>

          {/* 수강 인원 */}
          <div className="w-full">
            <span className="label-text text-base-content font-bold">
              수강 인원
            </span>
            <Tooltip>
              {`수강 인원과 강의실 수용 인원에 맞춰
                강의를 효율적으로 배정합니다.`}
            </Tooltip>
            <InputText
              {...register(
                `${fieldName}.${currentIndex}.divisionGroup.${activeDivisionIndex}.capacity`, // fieldName 동적 설정
                {
                  required: "수강 인원을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요.",
                  },
                  setValueAs: (value) =>
                    value === "" ? undefined : parseInt(value, 10), // 빈 문자열일 때 undefined 반환
                  validate: (value) =>
                    parseInt(value, 10) > 0 ||
                    "수강 인원은 1 이상이어야 합니다.",
                }
              )}
            />
            {errors?.[fieldName]?.[currentIndex]?.divisionGroup?.[
              activeDivisionIndex
            ]?.capacity && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {
                  errors?.[fieldName]?.[currentIndex]?.divisionGroup?.[
                    activeDivisionIndex
                  ]?.capacity.message
                }
              </p>
            )}
          </div>

          {/* 전임교원 선택 */}
          <div className="w-full">
            <span className="label-text text-base-content font-bold">
              전임교원 선택
            </span>
            <Select
              style="select-bordered"
              {...register(
                `${fieldName}.${currentIndex}.divisionGroup.${activeDivisionIndex}.professor`, // fieldName 동적 설정
                {
                  required: "전임교원을 선택해주세요.",
                  validate: (value) =>
                    value !== "" || "전임교원을 선택해주세요.", // 값이 비어있으면 유효성 검사 실패
                }
              )}
              options={professorOptions}
            >
              -
            </Select>
            {errors?.[fieldName]?.[currentIndex]?.divisionGroup?.[
              activeDivisionIndex
            ]?.professor && (
              <p className="text-red-500 text-xs mt-1 ml-1">
                {
                  errors?.[fieldName]?.[currentIndex]?.divisionGroup?.[
                    activeDivisionIndex
                  ]?.professor.message
                }
              </p>
            )}
          </div>

          {/* 분반 선택 버튼 */}
          <div className="flex justify-start items-center col-span-2 mt-28">
            <div className="flex space-x-2">
              {divisionFields.map((_, divisionIndex) => (
                <Button
                  key={divisionIndex}
                  style={`btn-sm ${
                    activeDivisionIndex === divisionIndex ? "btn-active" : ""
                  }`}
                  onClick={() => setActiveDivisionIndex(divisionIndex)}
                >
                  분반 {divisionIndex + 1}
                </Button>
              ))}
            </div>
          </div>

          {/* 분반 추가 버튼 */}
          <div className="col-span-2 flex justify-end mt-28">
            <Button onClick={handleAddDivision}>분반 추가</Button>
          </div>
        </div>
      )}
    </div>
  );
});

export default DivisionGroup;
