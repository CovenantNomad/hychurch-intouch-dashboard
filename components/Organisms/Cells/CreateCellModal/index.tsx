import React from "react";
import { motion } from "framer-motion";
import { CREATE_CELL_STEPS } from "../../../../constants/steps";
import useStepsModal from "../../../../hooks/useStepsModal";
import { useRecoilState } from "recoil";
import { createCellState } from "../../../../stores/createCellState";
// components
import Backdrop from "../../../Atoms/Backdrop/Backdrop";
import Stepper from "../../../Blocks/Steps/Stepper";
import StepControl from "../../../Blocks/Steps/StepControl";
import { dropIn } from "../../../../styles/animation";
import CreateCellStepsFindLeader from "./CreateCellStepsFindLeader";
import CreateCellStepsCheck from "./CreateCellStepsCheck";
import CreateCellStepsFinal from "./CreateCellStepsFinal";

interface AddCellModalProps {
  modalOpen: Boolean;
  handleClose: () => void;
}

const CreateCellModal = ({ modalOpen, handleClose }: AddCellModalProps) => {
  const [createCellInfo, setCreateCellInfo] = useRecoilState(createCellState);
  const TOTAL_STAGE = 3;
  const {
    currentStage,
    steps,
    setSteps,
    onNextHandler,
    onBackHandler,
    onMoveFirstStepHandler,
  } = useStepsModal({
    defaultSteps: CREATE_CELL_STEPS,
    totalStage: TOTAL_STAGE,
  });

  const stages = [
    { id: 1, component: <CreateCellStepsFindLeader /> },
    { id: 2, component: <CreateCellStepsCheck /> },
    { id: 3, component: <CreateCellStepsFinal /> },
  ];

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-w-[1/3] w-[450px] max-w-[95%] min-h-[50%] max-h-[90%] margin:auto bg-white border border-gray-300 shadow-lg p-4 overflow-y-auto"
      >
        <button
          onClick={handleClose}
          className="text-sm font-bold hover:text-teal-600 uppercase p-2"
        >
          Close
        </button>

        <div className="mt-5 flex flex-col items-center">
          <h5 className="text-2xl font-bold mb-1">새로운 셀 생성하기</h5>
          <span className="text-sm text-gray-600">
            셀리더와 셀이름을 작성하여 새로운 셀을 생성해주세요
          </span>
          <div className="w-[80%] my-6">
            <Stepper
              currentStage={currentStage}
              steps={steps}
              setSteps={setSteps}
            />
            {stages[currentStage - 1].component}
          </div>

          {currentStage !== TOTAL_STAGE && (
            <StepControl
              currentStage={currentStage}
              user={{
                id: createCellInfo?.leader?.id || "",
                name: createCellInfo?.leader?.name || "",
              }}
              lastStage={TOTAL_STAGE}
              onNextHandler={onNextHandler}
              onBackHandler={onBackHandler}
              onMoveFirstStepHandler={onMoveFirstStepHandler}
            />
          )}
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default CreateCellModal;
