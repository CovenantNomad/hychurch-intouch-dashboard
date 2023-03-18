import React from "react";
import { useRecoilState } from "recoil";
import useStepsModal from "../../../../hooks/useStepsModal";
import { CELL_TRANSFER_STEPS } from "../../../../constants/steps";
import { userTransferInfoState } from "../../../../stores/userTransferState";
// components
import StepControl from "../../../Blocks/Steps/StepControl";
import Stepper from "../../../Blocks/Steps/Stepper";
import ConfirmStage from "./CellTransferModal/ModalSteps/ConfirmStage";
import SelectMember from "./CellTransferModal/ModalSteps/SelectMember";
import SelectTransferCell from "./CellTransferModal/ModalSteps/SelectTransferCell";

interface TransferProcessProps {}

const TransferProcess = ({}: TransferProcessProps) => {
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

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center">
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
    </div>
  );
};

export default TransferProcess;
