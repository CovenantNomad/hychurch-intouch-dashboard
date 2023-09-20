import React, { useState, Fragment } from 'react';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
//types
import { createTransaction } from '../../../../firebase/Dallant/Dallant';
import { DallantFormType } from '../../../../interface/Dallants';
import { CellListWithMemberType } from '../../../../interface/cell';
//components
import CellAccordionItem from '../../../Organisms/Dallant/CellAccordionItem';
//utils
import { getTodayString } from '../../../../utils/dateUtils';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import Spinner from '../../../Atoms/Spinner';

interface DallantPaymentCommunityProps {
  communityName: string
  cells: CellListWithMemberType[]
}

interface DallantPaymentSubmitData {
    amount: number;
    createdAt: string;
    cellId: string;
    userId: string;
    cellName: string;
    userName: string;
    community: string;
    description: string;
}

function DallantPaymentCommunity({ communityName, cells }: DallantPaymentCommunityProps) {
  const queryClient = useQueryClient();

  const { control, handleSubmit, watch, reset, formState: { errors }} = useForm();

  const { mutateAsync, isLoading, isError } = useMutation(createTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries(['getCellsDallents'])
      queryClient.invalidateQueries(['getCellDallentDetail'])
      queryClient.invalidateQueries(['getUserDallant'])
    }
  })

  const onSubmit = async (data: {[key: string]: DallantFormType}) => {
    const inputArray = Object.keys(data).map(key => {
      if (!isNaN(Number(data[key].amount))) {
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
        <button
          type="submit" 
          disabled={isLoading || isError}
          className={`w-full bg-blue-600 text-white py-3 rounded-md disabled:bg-black/10 disabled:text-black/40 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <span>제출하기</span>
          )}
        </button>
      </div>
    </form>
  );
}

export default DallantPaymentCommunity;
