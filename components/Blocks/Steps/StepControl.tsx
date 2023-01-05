import { Leader, Selected } from "../../../interface/cell"

interface StepControlProps {
  onBackHandler: () => void
  onNextHandler: () => void
  user: Selected
  currentStage: number
  lastStage: number
}

const StepControl = ({onBackHandler, onNextHandler, currentStage, user, lastStage}: StepControlProps) => {
  return (
    <div className={`w-[80%] flex ${currentStage === 1 ? 'justify-end' : currentStage === lastStage ? 'justify-start': 'justify-between'}`}>
      {currentStage !== 1 && (
        <button 
          onClick={onBackHandler}
          disabled={currentStage === 1}
          className="px-4 py-2 text-sm font-semibold text-teal-600 border border-teal-600 rounded-md uppercase"
        >
          Back
        </button>
      )}
      {currentStage !== lastStage && (
        <button 
          onClick={onNextHandler}
          disabled={(currentStage === 1 && user.name === "") || currentStage === lastStage}
          className="px-4 py-2 text-sm font-semibold text-white border bg-teal-600 rounded-md uppercase"
        >
          Next
        </button>
      )}
    </div>
  )
}

export default StepControl