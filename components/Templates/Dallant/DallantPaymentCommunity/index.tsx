import React from 'react';
import { CellListWithMemberType } from '../../../../interface/cell';
import { Controller, useForm } from 'react-hook-form';
import { getTodayString } from '../../../../utils/dateUtils';
import dayjs, { Dayjs } from 'dayjs';
import CellAccordionItem from '../../../Organisms/Dallant/CellAccordionItem';
import { useMutation, useQueryClient } from 'react-query';
import { createTransaction } from '../../../../firebase/Dallant/Dallant';
import { DallantSubmitType } from '../../../../interface/Dallants';

interface DallantPaymentCommunityProps {
  communityName: string
  cells: CellListWithMemberType[]
}

interface DallantForm {
  cellId: string;
  userId: string;
  cellName: string;
  userName: string;
  community: string;
  description: string;
  amount: string;
}

function DallantPaymentCommunity({ communityName, cells }: DallantPaymentCommunityProps) {
  const queryClient = useQueryClient();

  const { control, handleSubmit, watch, reset, formState: { errors }} = useForm();

  const { mutateAsync } = useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getCellsDallents']})
      queryClient.invalidateQueries({ queryKey: ['getCellDallentDetail']})
    }
  })

  const onSubmit = async (data: {[key: string]: DallantForm}) => {
    const inputArray = Object.keys(data).map(key => {
      if (data[key].amount !== undefined) {
        return {
          ...data[key],
          amount: Number(data[key].amount),
          createdAt: getTodayString(dayjs())
        };
      } else {
        return undefined;
      }
    });
    const filteredArray = inputArray.filter(item => item?.amount !== undefined);

    await mutateAsync(filteredArray)

    reset()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=''>
        {cells.map(cell => (
          <CellAccordionItem key={cell.id} cell={cell} communityName={communityName} control={control} watch={watch} errors={errors} />
        ))}
      </div>
      <div className='mt-16'>
        <button type="submit" className='w-full bg-blue-600 text-white py-3 rounded-md'>제출하기</button>
      </div>
    </form>
  );
}

export default DallantPaymentCommunity;
