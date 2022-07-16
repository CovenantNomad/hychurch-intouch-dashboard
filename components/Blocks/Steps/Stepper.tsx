import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Step } from '../../../interface/cell';

interface stepperProps {
  currentStage: number
  steps: Step[]
  setSteps: Dispatch<SetStateAction<Step[]>>
}

const Stepper = ({ currentStage, steps, setSteps }: stepperProps) => {

  useEffect(() => {
    setSteps(
      steps.map((step) => step.id === currentStage ? {...step, isCurrent: true} : {...step, isCurrent: false})
    )
  }, [currentStage])

  return (
    <div className="w-full flex justify-between items-center">
      {steps.map(step => {
        return (
          <>
            <div className="relative flex flex-col items-center" key={step.id}>
              <div className={`h-10 w-10 rounded-full ${step.isCurrent ? "bg-teal-600 text-white" : step.isCompleted ? "bg-teal-600 text-white" : "bg-white text-gray-300 border border-gray-400"} flex items-center justify-center transition duration-500 ease-in-out`}>
                {step.isCompleted ? (
                  <svg className="h-5 w-5 fill-white" viewBox="0 0 20 20">
                    <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path>
                  </svg>
                ) : step.id}
              </div>
              <span className={`block absolute top-0 mt-10 w-32 text-sm ${step.isCurrent ? "text-teal-600": "text-gray-300"} text-center font-medium`}>
                {step.name}
              </span>
            </div>
            {step.id !== steps.length && (
              <div className="flex-auto border-t-2 transition duration-500 ease-in-out"></div>
            )}
          </>
        )
      })}    
    </div>
  )
}

export default Stepper