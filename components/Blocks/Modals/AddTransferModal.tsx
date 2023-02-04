import React, { Dispatch, SetStateAction, useState } from "react";
import { motion } from "framer-motion";
import Backdrop from "../../Atoms/Backdrop/Backdrop";
import { dropIn } from "../../../styles/animation";
import {
  cellInfoTypes,
  Selected,
  Step,
  TransferInfo,
} from "../../../interface/cell";
import Stepper from "../Steps/Stepper";
import SelectMember from "../../Templates/Cells/Transfer/ModalSteps/SelectMember";
import SelectTransferCell from "../../Templates/Cells/Transfer/ModalSteps/SelectTransferCell";
import ConfirmStage from "../../Templates/Cells/Transfer/ModalSteps/ConfirmStage";
import StepControl from "../Steps/StepControl";
import { useRecoilState } from "recoil";
import { userTransferInfoState } from "../../../stores/userTransferState";

interface AddTransferModalProps {
  modalOpen: Boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const AddTransferModal = ({ setModalOpen }: AddTransferModalProps) => {
  const TOTAL_STAGE = 3;
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      name: "셀원 선택",
      isCompleted: false,
      isCurrent: false,
    },
    {
      id: 2,
      name: "보낼셀 선택",
      isCompleted: false,
      isCurrent: false,
    },
    {
      id: 3,
      name: "확인",
      isCompleted: false,
      isCurrent: false,
    },
  ]);
  const [transferInfo, setTransferInfo] = useRecoilState(userTransferInfoState);

  const stages = [
    { id: 1, component: <SelectMember /> },
    { id: 2, component: <SelectTransferCell /> },
    { id: 3, component: <ConfirmStage setModalOpen={setModalOpen} /> },
  ];

  const onNextHandler = () => {
    if (currentStage <= TOTAL_STAGE) {
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
            onNextHandler={onNextHandler}
            onBackHandler={onBackHandler}
            currentStage={currentStage}
            user={{
              id: transferInfo?.user.userId || "",
              name: transferInfo?.user.name || "",
            }}
            lastStage={TOTAL_STAGE}
          />
        </div>
      </motion.div>
    </Backdrop>
  );
};

export default AddTransferModal;
