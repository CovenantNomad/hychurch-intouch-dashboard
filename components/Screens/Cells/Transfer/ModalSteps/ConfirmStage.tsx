import React, { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
// states
import { useRecoilState } from 'recoil';
import { userTransferInfoState, userTransferListState } from '../../../../../stores/userTransferState';

interface ConfirmStageProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

const ConfirmStage = ({ setModalOpen }: ConfirmStageProps) => {
  const [ transferInfo, setTransferInfo ] = useRecoilState(userTransferInfoState)
  const [ transferList, setTransferList] = useRecoilState(userTransferListState)

  const handleClose = () => {
    if (transferInfo !== null) {
      setTransferList([
        ...transferList,
        {
          id: transferList.length + 1,
          user: {
            userId: transferInfo.user.userId,
            name: transferInfo.user.name
          },
          from: {
            cellId: transferInfo.from.cellId,
            name: transferInfo.from.name
          },
          to: {
            cellId: transferInfo.to.cellId,
            name: transferInfo.to.name
          },
        }
      ])
      setTransferInfo(null)
    } else {
      toast.error("잘못된 접근입니다")
    }
    setModalOpen(false)
  }

  return (
    <div className="mt-14 mb-6">
      <p className="text-sm text-center">내용을 확인하신 후<br />생성하기 버튼을 눌러 셀원이동을 신청해주세요<br/>수정하실내용이 있으면 뒤로가기 버튼을 눌러주세요</p>
      <div className="mt-8 flex flex-col justify-center">
        <div className='mb-4'>
          <p className='text-slate-500 text-sm mb-1 '>이름</p>
          <p className='px-2 py-2 border rounded-md'>{transferInfo?.user.name}</p>
        </div>
        <div className='grid grid-cols-2 gap-x-4 grid-flow-row'>
          <div className='col-span-1'>
            <p className='text-slate-500 text-sm mb-1'>보내는 셀</p>
            <p className='px-2 py-2 border rounded-md'>{transferInfo?.from.name}</p>
          </div>
          <div className='col-span-1'>
            <p className='text-slate-500 text-sm mb-1'>보낼 셀</p>
            <p className='px-2 py-2 border rounded-md'>{transferInfo?.to.name}</p>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <button 
          onClick={handleClose}
          className="w-full py-3 rounded-lg bg-teal-600 text-center text-white"
        >
          생성하기
        </button>
      </div>
    </div>
  );
};

export default ConfirmStage;
