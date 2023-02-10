import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../../../../Atoms/Backdrop/Backdrop";
import { dropIn } from "../../../../../styles/animation";
import Stepper from "../../../../Blocks/Steps/Stepper";
import StepControl from "../../../../Blocks/Steps/StepControl";
import { useRecoilState } from "recoil";
import { userTransferInfoState } from "../../../../../stores/userTransferState";
import { Step } from "../../../../../interface/cell";
import SelectMember from "./ModalSteps/SelectMember";
import SelectTransferCell from "./ModalSteps/SelectTransferCell";
import ConfirmStage from "./ModalSteps/ConfirmStage";
import useStepsModal from "../../../../../hooks/useStepsModal";
import { CELL_TRANSFER_STEPS } from "../../../../../constants/steps";

interface AddTransferModalProps {
  modalOpen: Boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddTransferModal = ({ setModalOpen }: AddTransferModalProps) => {
  const [transferInfo, setTransferInfo] = useRecoilState(userTransferInfoState);
  const TOTAL_STAGE = 3;
  const {
    currentStage,
    steps,
    setSteps,
    onNextHandler,
    onBackHandler,
    onMoveFirstStepHandler,
  } = useStepsModal({
    defaultSteps: CELL_TRANSFER_STEPS,
    totalStage: TOTAL_STAGE,
  });

  const stages = [
    { id: 1, component: <SelectMember /> },
    { id: 2, component: <SelectTransferCell /> },
    { id: 3, component: <ConfirmStage /> },
  ];

  const onCloseHandler = () => {
    setModalOpen(false);
    setTransferInfo(null);
  };

  return (
    <Backdrop onClick={onCloseHandler}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="min-w-[1/3] w-[450px] max-w-[90%] min-h-[50%] max-h-[90%] margin:auto bg-white border border-gray-300 shadow-lg p-4 overflow-y-auto"
      >
        <button
          onClick={onCloseHandler}
          className="text-sm font-bold hover:text-teal-600 uppercase p-2"
        >
          Close
        </button>

        <div className="container mt-5 flex flex-col items-center">
          <h5 className="text-2xl font-bold mb-1">셀원 이동하기</h5>
          <span className="text-sm text-gray-600">
            이동할 셀원과 이동할 셀을 선택해주세요
          </span>
          <div className="w-[80%] my-6">
            <Stepper
              currentStage={currentStage}
              steps={steps}
              setSteps={setSteps}
            />
            {stages[currentStage - 1].component}
          </div>

          <StepControl
            currentStage={currentStage}
            user={{
              id: transferInfo?.user.userId || "",
              name: transferInfo?.user.name || "",
            }}
            lastStage={TOTAL_STAGE}
            onNextHandler={onNextHandler}
            onBackHandler={onBackHandler}
            onMoveFirstStepHandler={onMoveFirstStepHandler}
          />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default AddTransferModal;
