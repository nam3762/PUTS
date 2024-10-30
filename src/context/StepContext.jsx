import { useState, createContext, useContext } from "react";
import { useFormContext } from "react-hook-form";

const StepContext = createContext();

export function StepProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleResetStep = () => {
    setCurrentStep(1);
  };

  const handlePlusStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleMinusStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0)); // Prevents going below 0
  };

  // // 단순 로그 출력용 (없애도 됨)
  // const { getValues } = useFormContext();
  // console.log(getValues());

  return (
    <StepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        handlePlusStep,
        handleMinusStep,
        handleResetStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

// Custom Hook
export function useStepState() {
  const value = useContext(StepContext);
  if (value === undefined) {
    throw new Error("useStepState should be used within StepProvider");
  }
  return value;
}
