import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/form/Form";
import InputText from "../../components/form/InputText";
import Toggle from "../../components/Toggle";
import Select from "../../components/Select";
import { useFormContext, Controller } from "react-hook-form";
import DivisionGroup from "./Lectures/DivisionGroup";
import { usePostgraduateLecture } from "../../hooks/usePostgraduateLecture";
import usePreventBackNavigation from "../../hooks/usePreventBackNavigation";
import { useNavigate } from "react-router-dom";
import ClassroomModal from "../../components/modal/ClassroomModal";
import Tooltip from "../../components/Tooltip";

export default function PostgraduateLectures() {
  const {
    control,
    register,
    setValue,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useFormContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassrooms, setSelectedClassrooms] = useState([]);

  const [
    lectureFields,
    currentIndex,
    handleAddLecture,
    handleRemoveLecture,
    handlePageChange,
  ] = usePostgraduateLecture();

  const lectures = watch("postgraduateLectures");
  const classrooms = watch("classrooms");
  const filteredClassrooms = classrooms.filter(
    (classroom) => classroom.forGrad === 2 || classroom.forGrad === 3
  );
  const numberOfClassrooms = filteredClassrooms.length;
  const gradClassrooms = watch(
    `postgraduateLectures.${currentIndex}.gradClassrooms`
  );

  // 모달을 열 때, gradClassrooms 값을 selectedClassrooms에 반영
  const handleOpenModal = () => {
    console.log("Opening Modal with gradClassrooms:", gradClassrooms); // 디버깅용 로그 추가
    setSelectedClassrooms([...gradClassrooms]);
    setIsModalOpen(true);
  };

  // 모달이 닫힐 때 선택된 강의실을 저장
  const handleModalClose = (selected) => {
    // 선택된 강의실 객체를 변환
    const transformedClassrooms = selected.map(
      (classroom) =>
        `${classroom.buildingName || ""}-${classroom.classroomNumber || ""}`
    );

    // 변환된 강의실 문자열 리스트로 gradClassrooms에 저장
    setValue(
      `postgraduateLectures.${currentIndex}.gradClassrooms`,
      transformedClassrooms
    );
    setIsModalOpen(false);
  };

  // 교과목 드롭다운 선택 옵션 생성
  const lectureOptions = lectureFields.map((lecture, index) => ({
    value: index,
    label: `교과목 ${index + 1}: ${
      lecture.postgraduateLectureName || "이름 없음"
    }`,
  }));

  // 유효성 검사: 강의실 선택 개수가 1개 이상인지 확인
  useEffect(() => {
    if (gradClassrooms?.length === 0) {
      setError(`postgraduateLectures.${currentIndex}.gradClassrooms`, {
        type: "manual",
        message: "강의실을 최소 1개 이상 선택해야 합니다.",
      });
    } else {
      clearErrors(`postgraduateLectures.${currentIndex}.gradClassrooms`);
    }
  }, [gradClassrooms, currentIndex, setError, clearErrors]);

  // 새로 고침, 뒤로 가기, 앞으로 가기 시 홈화면으로
  usePreventBackNavigation();

  const navigate = useNavigate();
  const timetableName = watch("timetableName");
  useEffect(() => {
    if (!timetableName) {
      navigate("/");
    }
  }, [timetableName, navigate]);

  const helpContent = (
    <div className="flex flex-col gap-4 text-sm">
      <p>
        <span className="font-bold">
          1. 교과목명과 교과목 코드를 설정합니다.
        </span>
        <p className="indent-2">
          • 교과목명 - "대학원 강의 1", 교과목 코드 - "5303031"
        </p>
      </p>
      <p>
        <span className="font-bold">
          2. 야간 교과목 여부를 설정하기 위해 체크를 진행합니다. (18 ~ 22시)
        </span>
      </p>
      <p>
        <span className="font-bold">3. 강의실을 선택합니다.</span>
        <p className="indent-2">
          • 대학원용 / 일반 + 대학원용 강의실 중 배치할 강의실을 선택합니다.
        </p>
      </p>
      <p>
        <span className="font-bold">
          4. 드롭다운 메뉴로 입력한 교과목을 이동할 수 있으며, 추가/삭제가
          가능합니다.
        </span>
      </p>
      <p>
        <span className="font-bold">
          5. 각 교과목에 대해 분반을 설정합니다.
        </span>
        <p className="indent-2">
          • 분반 번호는 자동으로 시스템에서 관리합니다.
        </p>
        <p className="indent-2">
          • 강의 시간 분리 1/2는 한 번 강의할 때의 강의 시간을 나타냅니다.
        </p>
        <p className="indent-2">
          • 강의 시간 분리 그룹화 체크를 하면, 다른 분반을 같은 시간에
          배정합니다. (캡스톤디자인)
        </p>
        <p className="indent-2">• 수강 인원과 전임교원을 설정합니다.</p>
      </p>
      <p>
        <span className="font-bold">
          6. 분반 버튼으로 입력한 교과목에 대한 분반을 이동할 수 있으며,
          추가/삭제가 가능합니다.
        </span>
      </p>
    </div>
  );

  return (
    <Form
      title="STEP 5: 대학원 교과목 정보"
      prev="/timetable/lectures"
      next="/timetable/timetablecustomizing"
      helpContent={helpContent}
    >
      {/* 드롭다운을 이용한 교과목 선택 */}
      <Select
        style="select-bordered mt-0 mb-4"
        options={lectureOptions}
        onChange={(e) => handlePageChange(parseInt(e.target.value, 10))}
        value={currentIndex}
      >
        교과목 선택
      </Select>

      {lectureFields.length > 0 && (
        <div
          key={lectureFields[currentIndex]?.id}
          className="mb-4 px-4 rounded border-2 border-base-300"
        >
          {/* 레이아웃을 flex로 변경하여 좌/우 배치 */}
          <div className="flex">
            {/* 왼쪽: 대학원 교과목 정보 입력 (1/3 너비로 설정) */}
            <div className="w-1/3 space-y-4 p-4">
              {/* 교과목 번호와 야간 교과목 토글 */}
              <div className="flex justify-between items-center">
                <kbd className="kbd kbd-sm max-w-28 font-sans font-semibold bg-base-content text-base-200 max-h-1 px-4">
                  {currentIndex + 1}번 교과목
                </kbd>
                <Controller
                  control={control}
                  name={`postgraduateLectures.${currentIndex}.atNight`}
                  render={({ field }) => (
                    <Toggle
                      checked={field.value}
                      onChange={field.onChange}
                      style="mt-4"
                      textStyle="mt-4"
                    >
                      야간 교과목
                    </Toggle>
                  )}
                />
              </div>

              {/* 교과목명과 교과목 코드 한 행에 두 개씩 배치 */}
              <div className="grid grid-cols-2 gap-4">
                {/* 교과목명 */}
                <div className="w-full">
                  <span className="label-text text-base-content font-bold">
                    교과목명 (대학원)
                  </span>
                  <InputText
                    {...register(
                      `postgraduateLectures.${currentIndex}.postgraduateLectureName`,
                      {
                        required: "교과목명을 입력해주세요.",
                      }
                    )}
                  />
                  {errors?.postgraduateLectures?.[currentIndex]
                    ?.postgraduateLectureName && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {
                        errors.postgraduateLectures[currentIndex]
                          .postgraduateLectureName.message
                      }
                    </p>
                  )}
                </div>

                {/* 교과목 코드 */}
                <div className="w-full">
                  <span className="label-text text-base-content font-bold">
                    교과목 코드 (대학원)
                  </span>
                  <InputText
                    {...register(
                      `postgraduateLectures.${currentIndex}.postgraduateLectureCode`,
                      {
                        required: "교과목 코드를 입력해주세요.",
                      }
                    )}
                  />
                  {errors?.postgraduateLectures?.[currentIndex]
                    ?.postgraduateLectureCode && (
                    <p className="text-red-500 text-xs mt-1 ml-1">
                      {
                        errors.postgraduateLectures[currentIndex]
                          .postgraduateLectureCode.message
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* 강의실 선택 버튼과 선택된 강의실 목록 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col w-full items-center">
                  <Button onClick={handleOpenModal} style="btn-primary mt-10">
                    강의실 선택
                  </Button>
                </div>

                <div className="mt-8 h-16 w-full p-1 bg-base-200 rounded border border-base-300 text-center">
                  <span className="font-bold text-sm text-base-content p-2">
                    선택된 강의실 개수
                  </span>
                  <span className="font-bold text-sm text-base-content p-2">
                    {gradClassrooms?.length || 0}/{numberOfClassrooms}
                  </span>
                  {errors?.postgraduateLectures?.[currentIndex]
                    ?.gradClassrooms && (
                    <p className="text-red-500 text-xs mt-1">
                      {
                        errors.postgraduateLectures[currentIndex].gradClassrooms
                          .message
                      }
                    </p>
                  )}
                </div>
              </div>

              {/* 교과목 추가 및 삭제 버튼 */}
              <div className="flex justify-between space-x-4">
                <Button onClick={() => handleAddLecture()} style="my-8">
                  교과목 추가
                </Button>

                <Button
                  style={`${
                    lectures.length > 1 ? "" : "invisible"
                  } btn-error my-8`}
                  onClick={(event) => handleRemoveLecture(event, currentIndex)}
                >
                  교과목 삭제
                </Button>
              </div>
            </div>

            {/* Divider를 flex 안에서 배치 */}
            <div className="divider divider-horizontal"></div>

            {/* 오른쪽: 분반 입력 (2/3 너비로 설정) */}
            <div className="w-2/3">
              <DivisionGroup
                control={control}
                currentIndex={currentIndex}
                fieldName="postgraduateLectures"
                // 대학원 교과목에서 사용될 고유 필드
              />
            </div>
          </div>
        </div>
      )}

      {/* 모달 창 */}
      {isModalOpen && (
        <ClassroomModal
          classrooms={filteredClassrooms}
          selectedClassrooms={selectedClassrooms} // 선택된 강의실 전달
          onClose={handleModalClose}
        />
      )}
    </Form>
  );
}
