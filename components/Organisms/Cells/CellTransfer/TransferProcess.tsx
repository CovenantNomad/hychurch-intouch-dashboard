import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { Step } from "../../../../interface/cell";
import { userTransferInfoState } from "../../../../stores/userTransferState";
import StepControl from "../../../Blocks/Steps/StepControl";
import Stepper from "../../../Blocks/Steps/Stepper";
import ConfirmStage from "./ModalSteps/ConfirmStage";
import SelectMember from "./ModalSteps/SelectMember";
import SelectTransferCell from "./ModalSteps/SelectTransferCell";

interface TransferProcessProps {}

const TransferProcess = ({}: TransferProcessProps) => {
  const [transferInfo, setTransferInfo] = useRecoilState(userTransferInfoState);

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

  const stages = [
    { id: 1, component: <SelectMember /> },
    { id: 2, component: <SelectTransferCell /> },
    { id: 3, component: <ConfirmStage /> },
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

  return (
    <div className="px-6 pt-6 pb-32 bg-white">
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
    </div>
  );
};

export default TransferProcess;
