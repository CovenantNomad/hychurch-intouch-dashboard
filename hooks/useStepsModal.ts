import { useState } from "react";
import { Step } from "../interface/cell";

interface useStepsModal {
  defaultSteps: Step[];
  totalStage: number;
}

const useStepsModal = ({ defaultSteps, totalStage }: useStepsModal) => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [steps, setSteps] = useState<Step[]>(defaultSteps);

  const onNextHandler = () => {
    if (currentStage <= totalStage) {
      setCurrentStage(currentStage + 1);
      setSteps(
        steps.map((step) =>
          step.id <= currentStage + 1 ? { ...step, isCompleted: true } : step
        )
      );
    }
  };

  const onBackHandler = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
      setSteps(
        steps.map((step) =>
          step.id >= currentStage - 1 ? { ...step, isCompleted: false } : step
        )
      );
    }
  };

  const onMoveFirstStepHandler = () => {
    if (currentStage >= totalStage) {
      setCurrentStage(1);
      setSteps(
        steps.map((step) =>
          step.id <= totalStage
            ? { ...step, isCompleted: false, isCurrent: false }
            : step
        )
      );
    }
  };

  return {
    currentStage,
    steps,
    setSteps,
    onNextHandler,
    onBackHandler,
    onMoveFirstStepHandler,
  };
};

export default useStepsModal;
