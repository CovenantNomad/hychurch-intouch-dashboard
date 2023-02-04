import React, { useState } from 'react'
import Backdrop from '../../Atoms/Backdrop/Backdrop'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { AddCellForm, Leader, Step } from '../../../interface/cell'
import Input from '../../Atoms/Input'
import StepControl from '../Steps/StepControl'
import Stepper from '../Steps/Stepper'
import FindLeader from '../Steps/FindLeader'
import Check from '../Steps/Check'
import Final from '../Steps/Final'
import { dropIn } from '../../../styles/animation'

interface AddCellModalProps {
  modalOpen: Boolean
  handleClose: () => void
}

const AddCellModal = ({ modalOpen, handleClose }: AddCellModalProps) => {
  const TOTAL_STAGE = 3
  const [ hasViceLeader, setHasViceLeader ] = useState(false)
  const [ leader, setLeader ] = useState<Leader>({
    id: "",
    name: ""
  })
  const [ viceLeader, setviceLeader ] = useState<Leader>({
    id: "",
    name: ""
  })
  const [ cellName, setCellName ] = useState<string>("")
  const [ currentStage, setCurrentStage ] = useState<number>(1)
  const [ steps, setSteps ] = useState<Step[]>(
    [
      {
        id: 1,
        name: "셀리더 지정",
        isCompleted: false,
        isCurrent: false
      },
      {
        id: 2,
        name: "셀정보 확인",
        isCompleted: false,
        isCurrent: false
      },
      {
        id: 3,
        name: "셀 생성하기",
        isCompleted: false,
        isCurrent: false
      }
    ]
  )

  const onNextHandler = () => {
    if (currentStage <= TOTAL_STAGE) {
      setCurrentStage(currentStage + 1)
      setSteps(
        steps.map((step) => step.id <= currentStage + 1 ? {...step, isCompleted: true}: step)
      )
    }
  }

  const onBackHandler = () => {
    if (currentStage > 1 ) {
      setCurrentStage(currentStage - 1)
      setSteps(
        steps.map((step) => step.id >= currentStage - 1 ? {...step, isCompleted: false}: step)
      )
    }
  }

  const displayStep = (stage: number) => {
    switch (stage) {
      case 1:
        return <FindLeader leader={leader} setLeader={setLeader} viceLeader={viceLeader} setViceLeader={setviceLeader} setCellName={setCellName}/>

      case 2:
        return <Check leader={leader} viceLeader={viceLeader} cellName={cellName} setCellName={setCellName}/>
      
      case 3:
        return <Final leader={leader} viceLeader={viceLeader} cellName={cellName} />

      default:
    }
  }

  


  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}  
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className='min-w-[1/3] w-[450px] max-w-[90%] min-h-[50%] max-h-[90%] margin:auto bg-white border border-gray-300 shadow-lg p-4 overflow-y-auto'
      >
        <button onClick={handleClose} className="text-sm font-bold hover:text-teal-600 uppercase p-2">Close</button>

        <div className='container mt-5 flex flex-col items-center'>
          <h5 className='text-2xl font-bold mb-1'>새로운 셀 생성하기</h5>
          <span className='text-sm text-gray-600'>셀리더와 셀이름을 작성하여 새로운 셀을 생성해주세요</span>
          <div className='w-[80%] my-6'>
            <Stepper currentStage={currentStage} steps={steps} setSteps={setSteps}/>
            {displayStep(currentStage)}
          </div>

          {currentStage !== TOTAL_STAGE && (
            <StepControl onNextHandler={onNextHandler} onBackHandler={onBackHandler} currentStage={currentStage} user={leader} lastStage={TOTAL_STAGE} />
          )}
        </div>
      </motion.div>
    </Backdrop>
  )
}

export default AddCellModal