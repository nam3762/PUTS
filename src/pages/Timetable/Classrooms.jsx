import Form from "../../components/form/Form";
import Button from "../../components/Button";
import InputText from "../../components/form/InputText";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useState, useEffect } from "react";
import Select from "../../components/Select";
import usePreventBackNavigation from "../../hooks/usePreventBackNavigation";
import { useNavigate } from "react-router-dom";
import { defaultValues } from "../../values/defaultValues";

export default function Classrooms() {
  const {
    watch,
    control,
    register,
    formState: { errors },
    setValue,
  } = useFormContext();
  const {
    fields: classroomFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "classrooms",
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const classroomsOptions = classroomFields.map((classroom, index) => ({
    value: index,
    label: `${classroom.buildingName}-${classroom.classroomNumber}`,
  }));

  const handleAddClassroom = () => {
    append({
      buildingName: "",
      classroomNumber: "",
      capacity: null,
      forGrad: 1,
      group: 0,
    });
    setCurrentIndex(classroomFields.length);
  };

  const handleClassroomPage = (e) => {
    const selectedIndex = parseInt(e.target.value, 10);
    setCurrentIndex(selectedIndex);
  };

  usePreventBackNavigation();

  const navigate = useNavigate();
  const timetableName = watch("timetableName");
  useEffect(() => {
    if (!timetableName) {
      navigate("/");
    }
  }, [timetableName, navigate]);

  const forGrad = watch(`classrooms.${currentIndex}.forGrad`);
  const currentGroup = watch(`classrooms.${currentIndex}.group`);

  const handleRadioChange = (field, value) => {
    setValue(`classrooms.${currentIndex}.${field}`, value);
  };

  return (
    <Form
      title="STEP 3: 강의실 정보"
      prev="/timetable/professors"
      next="/timetable/lectures"
    >
      <Select
        style="select-bordered mt-0 mb-4"
        options={classroomsOptions}
        onChange={handleClassroomPage}
      >
        강의실 선택
      </Select>
      {classroomFields.length > 0 && (
        <div
          key={classroomFields[currentIndex]?.id}
          className="mb-4 p-4 rounded border-2 border-base-300"
        >
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="flex flex-row justify-between items-center max-w-max my-2">
              <kbd className="kbd kbd-sm max-w-28 font-sans font-semibold bg-base-content text-base-200 px-4">
                {currentIndex + 1}번 강의실
              </kbd>
            </div>

            <div className="flex flex-row justify-center items-center">
              <label className="label cursor-pointer flex flex-col">
                <span className="label-text mb-2">일반 강의용</span>
                <input
                  type="radio"
                  name={`classrooms.${currentIndex}.forGrad`}
                  value="1"
                  className="radio checked:radio-primary"
                  checked={forGrad === 1}
                  onChange={() => handleRadioChange("forGrad", 1)}
                />
              </label>
              <label className="label cursor-pointer flex flex-col">
                <span className="label-text mb-2">대학원용</span>
                <input
                  type="radio"
                  name={`classrooms.${currentIndex}.forGrad`}
                  value="2"
                  className="radio checked:radio-primary"
                  checked={forGrad === 2}
                  onChange={() => handleRadioChange("forGrad", 2)}
                />
              </label>
              <label className="label cursor-pointer flex flex-col">
                <span className="label-text mb-2">일반 + 대학원</span>
                <input
                  type="radio"
                  name={`classrooms.${currentIndex}.forGrad`}
                  value="3"
                  className="radio checked:radio-primary"
                  checked={forGrad === 3}
                  onChange={() => handleRadioChange("forGrad", 3)}
                />
              </label>
            </div>

            <div className="flex flex-row justify-center items-center">
              {defaultValues.classroomGroups.map((group) => (
                <label
                  key={group.id}
                  className="label cursor-pointer flex flex-col"
                >
                  <span className="label-text mb-2">{group.groupName}</span>
                  <input
                    type="radio"
                    name={`classrooms.${currentIndex}.group`}
                    value={group.id}
                    className="radio checked:radio-primary"
                    checked={currentGroup === group.id}
                    onChange={() => handleRadioChange("group", group.id)}
                  />
                </label>
              ))}
            </div>

            <div className="flex justify-end">
              {classroomFields.length > 1 && (
                <Button
                  onClick={() => remove(currentIndex)}
                  style="btn-error btn-sm -mb-2"
                >
                  강의실 삭제
                </Button>
              )}
            </div>

            <div className="w-full mb-4">
              <span className="label-text text-base-content font-bold">
                건물 이름
              </span>
              <InputText
                {...register(`classrooms.${currentIndex}.buildingName`, {
                  required: "건물 이름을 입력해주세요.",
                })}
              >
                S4-1
              </InputText>
              {errors?.classrooms?.[currentIndex]?.buildingName && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.classrooms[currentIndex].buildingName.message}
                </p>
              )}
            </div>

            <div className="w-full mb-4">
              <span className="label-text text-base-content font-bold">
                강의실 번호
              </span>
              <InputText
                {...register(`classrooms.${currentIndex}.classroomNumber`, {
                  required: "강의실 번호를 입력해주세요.",
                })}
              >
                101
              </InputText>
              {errors?.classrooms?.[currentIndex]?.classroomNumber && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.classrooms[currentIndex].classroomNumber.message}
                </p>
              )}
            </div>

            <div className="w-full mb-4">
              <span className="label-text text-base-content font-bold">
                수용 인원
              </span>
              <InputText
                {...register(`classrooms.${currentIndex}.capacity`, {
                  required: "수용 인원을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요.",
                  },
                  validate: (value) =>
                    parseInt(value, 10) > 0 ||
                    "수용 인원은 1 이상이어야 합니다.",
                })}
              >
                60
              </InputText>
              {errors?.classrooms?.[currentIndex]?.capacity && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.classrooms[currentIndex].capacity.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      <Button onClick={handleAddClassroom} style="mt-4">
        강의실 추가
      </Button>
    </Form>
  );
}
