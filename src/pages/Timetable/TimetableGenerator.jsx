import Form from "../../components/form/Form";
import InputText from "../../components/form/InputText";
import Tooltip from "../../components/Tooltip";
import { useFormContext } from "react-hook-form";
import usePreventBackNavigation from "../../hooks/usePreventBackNavigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const helpContent1 = (
  <div className="flex flex-col gap-4 text-sm">
    <p>
      <span className="font-bold">
        1. 시간표 이름과 비밀번호를 설정하면 추후 시간표에 접근할 수 있습니다.
      </span>
    </p>
    <p>
      <span className="font-bold">
        2. 시간표 설명에는 시간표에 대한 간단한 설명을 적어주세요.
      </span>
    </p>
  </div>
);

// 사용자 입력 첫 화면 (STEP 1: 시간표 정보 입력)
export default function TimetableGenerator() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const navigate = useNavigate();

  // STEP 1에서 새로고침 및 뒤로 가기 방지
  usePreventBackNavigation();

  // 새로고침 탐지 및 경고창 띄우기
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // 경고창을 띄워 새로고침 시 사용자에게 확인을 요청
      const confirmationMessage =
        "변경 사항이 저장되지 않을 수 있습니다. 계속하시겠습니까?";
      event.preventDefault();
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const handleUnload = () => {
      // 새로고침을 감지한 경우 localStorage에 플래그 저장
      localStorage.setItem("reloaded", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    // 컴포넌트가 렌더링될 때 새로고침이 발생했는지 확인
    if (localStorage.getItem("reloaded") === "true") {
      localStorage.removeItem("reloaded");
      navigate("/", { replace: true }); // 새로고침된 경우 홈으로 리다이렉트
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [navigate]);

  return (
    <Form
      title="STEP 1: 시간표 정보"
      prev="/"
      next="/timetable/professors"
      helpContent={helpContent1}
    >
      <span className="my-2 label-text text-right text-xs text-green-500 font-bold">
        모든 정보는 서버에 저장되며 언제든 불러올 수 있습니다.
      </span>
      <span className="mb-2 label-text text-right text-xs text-base-content font-bold">
        전체 화면에서 입력을 권장합니다.
      </span>
      <div className="form-control mb-4">
        <span className="label-text text-base-content font-bold">
          시간표 이름
        </span>
        <InputText
          type="text"
          {...register("timetableName", {
            required: "시간표 이름을 입력해주세요.",
            minLength: {
              value: 3,
              message: "시간표 이름은 최소 3글자 이상이어야 합니다.",
            },
          })}
        />
        {errors.timetableName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.timetableName.message}
          </p>
        )}
      </div>
      <div className="form-control mb-4">
        <div className="flex items-center">
          <span className="label-text text-base-content font-bold">
            비밀번호
          </span>
          <Tooltip>
            {`시간표 생성 이후에 비밀번호를 이용하여
            시간표에 접근할 수 있습니다.`}
          </Tooltip>
        </div>
        <label
          className="input input-bordered text-base-content flex items-center gap-2 mt-2"
          htmlFor="password"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70 text-base-content"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="grow"
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 4,
                message: "비밀번호는 최소 4자리 이상이어야 합니다.",
              },
            })}
          />
        </label>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
      <div className="form-control mb-4">
        <label className="label" htmlFor="Description">
          <span className="label-text text-base-content font-bold">
            시간표 설명
          </span>
        </label>
        <textarea
          className="textarea textarea-bordered text-base-content w-full"
          placeholder="시간표 설명을 적어주세요."
          {...register("timetableDescription", {
            required: "시간표 설명을 입력해주세요.",
            maxLength: {
              value: 500,
              message: "시간표 설명은 최대 500자까지 가능합니다.",
            },
          })}
        ></textarea>
        {errors.timetableDescription && (
          <p className="text-red-500 text-xs mt-1">
            {errors.timetableDescription.message}
          </p>
        )}
      </div>
    </Form>
  );
}
