import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUserHistory, updateUserHistory } from '../../../../firebase/Dallant/Dallant';
import { convertSecondToDate } from '../../../../utils/dateUtils';
import SimpleModal from '../../../Blocks/Modals/SimpleModal';

interface UserDallantHistoryDetailProps {
  description: string;
  createdAt: string | string[] | number
  amount: string;
  totalAmount: string;
  cellId: string;
  userId: string;
  docId: string;
  goBack: () => void;
}

interface EditHistoryForm {
  description: string;
  amount: string;
}

const UserDallantHistoryDetail = ({ description, createdAt, amount, totalAmount, cellId, userId, docId, goBack }: UserDallantHistoryDetailProps) => {
  const queryClient = useQueryClient();
  const [ descriptionState, setDescriptionState ] = useState<String>(description)
  const [ amountState, setAmountState ] = useState(amount)
  const [ totalAmountState, setTotalAmountState ] = useState(Number(totalAmount))
  const [ isEdit, setIsEdit ] = useState(false)
  const [ isOpen, setIsOpen ] = useState(false)
  const { handleSubmit, register, getValues, watch, formState: { errors, isDirty, isSubmitting }} = useForm<EditHistoryForm>()

  const { mutateAsync } = useMutation(updateUserHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getUserHistory', userId, docId])
      queryClient.invalidateQueries(['getUserDallant', userId])
      queryClient.invalidateQueries(['getCellsDallents'])
      queryClient.invalidateQueries(['getCellDallentDetail'])
      queryClient.invalidateQueries(['getOthersDallents'])
      setIsEdit(false)
      setDescriptionState(getValues('description'))
      setAmountState(getValues('amount'))
      setTotalAmountState(Number(totalAmount) + (Number(getValues('amount')) - Number(amount)))
    }
  })

  const onSubmitHandler = (data: EditHistoryForm) => {
    if (description !== data.description && amount === data.amount) {
      mutateAsync({
        cellId: cellId, 
        userId: userId,
        docId: docId,
        description: data.description,
        amount: Number(data.amount),
        onlyDescriptionUpdate: true
      })

    } else {
      mutateAsync({
        cellId: cellId, 
        userId: userId,
        docId: docId,
        description: data.description,
        amount: Number(data.amount),
        onlyDescriptionUpdate: false
      })
    } 
  }

  const { mutateAsync: deleteUserHistoryMutation } = useMutation(deleteUserHistory, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['getUserHistory', userId, docId])
      queryClient.invalidateQueries(['getUserDallant', userId])
      queryClient.invalidateQueries(['getCellsDallents'])
      queryClient.invalidateQueries(['getCellDallentDetail'])
      queryClient.invalidateQueries(['getOthersDallents'])
      setIsEdit(false)
      setIsOpen(false)
      goBack()
    }
  })

  return (
    <div className='max-w-xl px-8 pt-16 pb-12 my-8 mx-auto border border-gray-300 shadow-sm'>
      <div className='pb-9'>
        <div>
          <p className='text-blue-600 mb-1'>{convertSecondToDate(Number(createdAt)).format('YYYY.MM.DD')}</p>
        </div>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>{descriptionState}</h1>
          <button
            onClick={() => setIsOpen(true)}
          >
            <TrashIcon className='h-6 w-6 text-red-600'/>
          </button>
        </div>
      </div>
      <div className='h-[2px] bg-gray-300 rounded-full'/>
      <div className='pt-4'>
        <div className='flex justify-between py-5'>
          <span className='text-gray-500'>적립시간</span>
          <span className='text-gray-900 tracking-wide'>{convertSecondToDate(Number(createdAt)).format('YYYY.MM.DD HH:mm:ss')}</span>
        </div>
        <div className='flex justify-between py-5'>
          <span className='text-gray-500'>적립금액</span>
          <span className='text-gray-900 tracking-wide'>+ {amountState} 적립</span>
        </div>
        <div className='flex justify-between py-5'>
          <span className='text-gray-500'>적립 후 총액</span>
          <span className='text-gray-900 tracking-wide'>총 {totalAmountState} 달란트</span>
        </div>
      </div>

      {isEdit && (
        <div className='border border-gray-300 mt-8 rounded-md'>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="px-4 py-5">
              <div className="space-y-5">
                <div className="">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    적립내역
                  </label>
                  <input
                    type="text"
                    defaultValue={description}
                    {...register("description")}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
                  />
                  {errors.description && (
                    <p className="mt-1 px-3 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>
        
                <div className="">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    적립금액
                  </label>
                  <input
                    type="text"
                    defaultValue={amount}
                    {...register("amount", {
                      min: {
                        value: 1,
                        message: "1 이상의 값을 입력하세요"
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "숫자만 입력해주세요"
                      },
                      setValueAs: (v) => v.replace(/\s/g, ""),
                    })}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
                  />
                  {errors.amount && (
                    <p className="mt-1 px-3 text-sm text-red-600">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={(watch("description") === description && watch('amount') === amount) || !isDirty || isSubmitting}
                  className="w-full py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-BLUE disabled:bg-gray-700 disabled:hover:bg-gray-600 disabled:cursor-not-allowed"
                >
                  수정하기
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      
      <div className='flex gap-x-6 mt-20'>
        <div 
          onClick={() => setIsEdit(!isEdit)}
          className='p-6 bg-cyan-800 rounded-2xl cursor-pointer'
        >
          <PencilIcon className='h-6 w-6 text-white'/>
        </div>
        <div
          onClick={goBack}
          className='flex-1 flex justify-center items-center bg-sky-800 rounded-2xl cursor-pointer'  
        >
          <span className='text-lg text-white'>돌아가기</span>
        </div>
      </div>
      <SimpleModal 
        title={'달란트 내역 삭제'}
        description={'해당 달란트 적립내역을 삭제하시겠습니까?'}
        actionLabel={'삭제'}
        open={isOpen}
        setOpen={setIsOpen}
        actionHandler={() => deleteUserHistoryMutation({cellId, userId, docId})}
      />
    </div>
  );
};

export default UserDallantHistoryDetail;
