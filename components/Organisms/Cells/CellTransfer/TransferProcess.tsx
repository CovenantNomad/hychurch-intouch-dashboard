import {useRecoilState} from "recoil";
import {CELL_TRANSFER_STEPS} from "../../../../constants/steps";
import useStepsModal from "../../../../hooks/useStepsModal";
import {userTransferInfoState} from "../../../../stores/userTransferState";
// components
import {
  AttendanceCheckStatus,
  FindAttendanceCheckQuery,
} from "../../../../graphql/generated";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import Skeleton from "../../../Atoms/Skeleton/Skeleton";
import StepControl from "../../../Blocks/Steps/StepControl";
import Stepper from "../../../Blocks/Steps/Stepper";
import ConfirmStage from "./CellTransferModal/ModalSteps/ConfirmStage";
import SelectMember from "./CellTransferModal/ModalSteps/SelectMember";
import SelectTransferCell from "./CellTransferModal/ModalSteps/SelectTransferCell";

interface TransferProcessProps {
  isAttendanceLoading: boolean;
  attendanceStatus: FindAttendanceCheckQuery | undefined;
}

const TransferProcess = ({
  isAttendanceLoading,
  attendanceStatus,
}: TransferProcessProps) => {
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
    {id: 1, component: <SelectMember />},
    {id: 2, component: <SelectTransferCell />},
    {id: 3, component: <ConfirmStage />},
  ];

  return (
    <div className="pb-24 mt-10 bg-white">
      {isAttendanceLoading ? (
        <Skeleton className="h-[200px] w-full" />
      ) : attendanceStatus ? (
        attendanceStatus.attendanceCheck === AttendanceCheckStatus.Completed ? (
          <div className="w-full p-6 border rounded-xl shadow-sm">
            <h5 className="text-lg font-medium">셀원 이동하기</h5>
            <span className="text-sm text-gray-500">
              이동할 셀원과 이동할 셀을 선택해주세요
            </span>
            <div className="flex flex-col items-center mt-4">
              <div className="w-[35%] mx-auto">
                <Stepper
                  currentStage={currentStage}
                  steps={steps}
                  setSteps={setSteps}
                />
              </div>
              <div className="w-[60%] mx-auto">
                {stages[currentStage - 1].component}
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
          </div>
        ) : (
          <div className="h-full flex justify-center items-center py-20 border rounded-md">
            <p className="text-sm text-center">
              아직 셀리더들이 출석체크 중입니다. <br />
              출석체크가 마감 된 후 새가족 셀편성을 진행해주세요.
            </p>
          </div>
        )
      ) : (
        <EmptyStateSimple />
      )}
    </div>
  );
};

export default TransferProcess;
