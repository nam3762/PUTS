import { useStepState } from "../context/StepContext";

export default function Steps() {
  const { currentStep, setCurrentStep } = useStepState();

  return (
    <div className="m-10 min-w-32">
      <ul className="steps steps-vertical text-base-content font-bold">
        <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>
          시간표 정보
        </li>
        <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>
          전임교원
        </li>
        <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>
          강의실
        </li>
        <li className={`step ${currentStep >= 4 ? "step-primary" : ""}`}>
          일반 강의
        </li>
        <li className={`step ${currentStep >= 5 ? "step-primary" : ""}`}>
          대학원 강의
        </li>
        <li className={`step ${currentStep >= 6 ? "step-primary" : ""}`}>
          커스터마이징
        </li>
        <li className={`step ${currentStep === 7 ? "step-primary" : ""}`}>
          저장
        </li>
      </ul>
    </div>
  );
}
