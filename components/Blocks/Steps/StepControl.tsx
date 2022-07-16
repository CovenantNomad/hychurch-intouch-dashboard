import { Leader } from "../../../interface/cell"

interface StepControlProps {
  onBackHandler: () => void
  onNextHandler: () => void
  leader: Leader
  currentStage: number
}

const StepControl = ({onBackHandler, onNextHandler, currentStage, leader}: StepControlProps) => {
  return (
    <div className="w-[80%] flex justify-between">
      <button 
        onClick={onBackHandler}
        className="px-4 py-2 text-sm font-semibold text-teal-600 border border-teal-600 rounded-md uppercase"
      >
        Back
      </button>
      <button 
        onClick={onNextHandler}
        disabled={currentStage === 1 && leader.name === ""}
        className="px-4 py-2 text-sm font-semibold text-white border bg-teal-600 rounded-md uppercase"
      >
        Next
      </button>
    </div>
  )
}

export default StepControl