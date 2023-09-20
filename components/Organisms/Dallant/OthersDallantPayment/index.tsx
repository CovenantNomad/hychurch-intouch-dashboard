import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createOthersTransaction, getOthersList } from '../../../../firebase/Dallant/DallantOthers';
import Spinner from '../../../Atoms/Spinner';
import EmptyStateSimple from '../../../Atoms/EmptyStates/EmptyStateSimple';
import { Controller, useForm } from 'react-hook-form';
import { getTodayString } from '../../../../utils/dateUtils';
import dayjs from 'dayjs';
import { DallantOthersForm } from '../../../../interface/Dallants';

interface OthersDallantPaymentProps {}

const OthersDallantPayment = ({}: OthersDallantPaymentProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, watch, reset, formState: { errors }} = useForm();
  const { isLoading, data } = useQuery(
    'getOthersList', 
    getOthersList, 
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    }
  )

  const { mutateAsync } = useMutation(createOthersTransaction, {
    onSettled: () => {
      queryClient.invalidateQueries(['getOthersDallents'])
      queryClient.invalidateQueries(['getUserDallant'])
    }
  })

  const onSubmit = async (data: {[key: string]: DallantOthersForm}) => {
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
    <div>
      <h2 className='text-lg font-medium leading-6 text-gray-900 mb-4'>셀 미편성 청년 달란트 지급 명단</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='mt-8'>
          {data !== null && data !== undefined ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-cols-4 pb-12 gap-4'>
                {data.sort((a, b) => {
                  if (a.userName > b.userName) return 1;
                  else if (b.userName > a.userName) return -1;
                  else return 0;
                }).map((user) => (
                  <div key={user.userId} className="border px-2 py-2 rounded-md">
                    <div className="py-2">
                      <h3 className='font-semibold'>{user.userName}</h3>
                      <Controller
                        name={`${user.userId}.userId`} // 유저 아이디 필드
                        control={control}
                        defaultValue={user.userId}
                        render={({ field }) => (
                          <input {...field} className="hidden" disabled />
                        )}
                      />
                      <Controller
                        name={`${user.userId}.userName`} // 유저 이름 필드
                        control={control}
                        defaultValue={user.userName}
                        render={({ field }) => (
                          <input {...field} className="hidden" disabled />
                        )}
                      />
                      <Controller
                        name={`${user.userId}.cellId`} // 셀 아이디 필드
                        control={control}
                        defaultValue={user.cellId}
                        render={({ field }) => (
                          <input {...field} className="hidden" disabled />
                        )}
                      />
                      <Controller
                        name={`${user.userId}.cellName`} // 셀 이름 필드
                        control={control}
                        defaultValue={user.cellName}
                        render={({ field }) => (
                          <input {...field} className="hidden" disabled />
                        )}
                      />
                    </div>
                    <div className="flex gap-x-3 py-2">
                      <div className="flex-[2]">
                        <Controller
                          name={`${user.userId}.description`} // 내역 필드
                          control={control}
                          defaultValue=""
                          rules={{
                            required: {
                              value: watch(`${user.userId}.amount`) !== "" && watch(`${user.userId}.amount`) !== undefined,
                              message: "내역을 입력해주세요."
                            }
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              placeholder="내역"
                              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          )}
                        />
                        {errors[`${user.userId}`] && <p className='text-sm text-red-600 pl-2 mt-1'>내역을 입력해주세요</p>}
                      </div>
                      <div className="flex-[1]">
                        <div className="relative rounded-md shadow-sm">
                          <Controller
                            name={`${user.userId}.amount`}
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="number"
                                min={0}
                                placeholder="금액"
                                className="block w-full rounded-md border-0 py-1.5 pl-2 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            )}
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <span className="text-gray-500 text-sm" id="price-currency">
                              D
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-12'>
                <button type="submit" className='w-full bg-blue-600 text-white py-3 rounded-md'>제출하기</button>
              </div>
            </form>
          ) : (
            <EmptyStateSimple />
          )}
        </div>
      )}
    </div>
  );
};

export default OthersDallantPayment;
