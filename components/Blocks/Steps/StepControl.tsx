import {Selected} from "../../../interface/cell";

interface StepControlProps {
  user: Selected;
  currentStage: number;
  lastStage: number;
  onBackHandler: () => void;
  onNextHandler: () => void;
  onMoveFirstStepHandler: () => void;
}

const StepControl = ({
  currentStage,
  user,
  lastStage,
  onBackHandler,
  onNextHandler,
  onMoveFirstStepHandler,
}: StepControlProps) => {
  return (
    <div
      className={`w-full flex ${
        currentStage === 1 ? "justify-end" : "justify-between"
      }`}
    >
      {currentStage !== 1 && (
        <button
          onClick={onBackHandler}
          disabled={currentStage === 1}
          className="px-4 py-2 text-sm font-semibold text-teal-600 border border-teal-600 rounded-md uppercase"
        >
          Back
        </button>
      )}
      {currentStage !== lastStage ? (
        <button
          onClick={onNextHandler}
          disabled={
            (currentStage === 1 && user.name === "") ||
            currentStage === lastStage
          }
          className="px-4 py-2 text-sm font-semibold text-white border bg-teal-600 rounded-md uppercase"
        >
          Next
        </button>
      ) : (
        <button
          onClick={onMoveFirstStepHandler}
          className="px-4 py-2 text-sm font-semibold text-white border bg-teal-600 rounded-md uppercase"
        >
          처음으로
        </button>
      )}
    </div>
  );
};

export default StepControl;
