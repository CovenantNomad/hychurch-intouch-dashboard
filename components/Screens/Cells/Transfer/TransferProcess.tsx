import { AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import graphlqlRequestClient from '../../../../client/graphqlRequestClient';
import { CreateUserCellTransferBulkMutationVariables, useCreateUserCellTransferBulkMutation } from '../../../../graphql/generated';
import { userTransferListState } from '../../../../stores/userTransferState';
import { getTodayString, makeErrorMessage } from '../../../../utils/utils';
import FullWidthButton from '../../../Atoms/Button/FullWidthButton';
import EmptyStateStarting from '../../../Atoms/EmptyStates/EmptyStateStarting';
import HeadingAction from '../../../Blocks/CardHeading/HeadingAction';
import TransferListItem from '../../../Blocks/ListItems/TransferListItem';
import AddTransferModal from '../../../Blocks/Modals/AddTransferModal';

interface TransferProcessProps {}

interface SubmitTypes {
  userId: string,
  fromCellId: string
  toCellId: string
}

const TransferProcess = ({}: TransferProcessProps) => {
  const [ transferList, setTransferList ] = useRecoilState(userTransferListState)
  const [ modalOpen, setModalOpen ] = useState<boolean>(false)
  const { mutate } = useCreateUserCellTransferBulkMutation<CreateUserCellTransferBulkMutationVariables>(
    graphlqlRequestClient,
    {
      onSuccess(data, variables, context) {
        toast.success("셀원이동 신청이 접수되었습니다.")
        setTransferList([])
      },
      onError(error) {
        if (error instanceof Error) {
          toast.error(`셀원이동 신청에 실패했습니다.\n${makeErrorMessage(error.message)}`)
        }
      },
    }
  )

  const onSubmitHandler = () => {
    const submitList = transferList.map((item) => {
      return (
        {
          userId: item.user.userId,
          fromCellId: item.from.cellId,
          toCellId: item.to.cellId,
        }
      )
    })

    const submitData = {
      CreateUserCellTransferInputs: submitList,
      orderDate: getTodayString(new Date())
    }

    mutate({
      input: {
        createUserCellTransferInputs: submitData.CreateUserCellTransferInputs,
        orderDate: submitData.orderDate,
      }
    })
  }

  return (
    <div className='px-6 pt-6 pb-32 bg-white'>
      <HeadingAction title='Create New Transfer' btnText='추가하기' onClickHandler={() => setModalOpen(true)} />
      <div className='mt-8'>
        <h4 className='text-xl mb-6'>이동 할 셀원 리스트</h4>
        <div className='grid grid-cols-12 gap-x-4 text-gray-500 mb-2'>
          <p className='col-span-5'>Name</p>
          <p className='col-span-3'>From</p>
          <p className='col-span-3'>To</p>
        </div>
        <div className='grid xl:grid-cols-12 gap-x-4 gap-y-3'>
          {transferList.length !== 0 ? (
            transferList.map((item) => 
              <TransferListItem 
                key={item.id} 
                id={item.id}
                name={item.user.name} 
                to={item.to.name} 
                from={item.from.name} 
                transferList={transferList} 
                setTransferList={setTransferList}
              />
            )
          ) : (
            <div className='text-center py-16 xl:col-span-12 '>
              <EmptyStateStarting 
                title="Add Transfer Members"
                descrtiption="다른 셀로 편성 될 셀원이 아직 없습니다. 다른 셀로 이동해야 하는 셀원이 있다면 추가하기 버튼을 눌러주세요"
              />
            </div>
          )}
        </div>
        <div className='mt-12'>
          <FullWidthButton 
            text='제출하기' 
            onClickHandler={() => onSubmitHandler()} 
            disabled={transferList.length ===0} 
          />
        </div>
      </div>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {modalOpen && <AddTransferModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>}
      </AnimatePresence>
    </div>
  );
};

export default TransferProcess;
