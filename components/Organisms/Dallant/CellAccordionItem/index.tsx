import React, { useState } from 'react';
import { Control, Controller, DeepRequired, FieldErrorsImpl, FieldValues, UseFormHandleSubmit, UseFormWatch } from 'react-hook-form';
import { CellListWithMemberType } from '../../../../interface/cell';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

interface CellAccordionItemProps {
  communityName: string
  cell: CellListWithMemberType
  control: Control<FieldValues, object>
  watch: UseFormWatch<FieldValues>
  errors: FieldErrorsImpl<DeepRequired<FieldValues>>
}

const CellAccordionItem = ({ communityName, cell, control, watch, errors }: CellAccordionItemProps) => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <div className='last:border-b border-t'>
      <div className='flex items-center py-6 pl-8'>
        <h3 className='inline-block w-24 text-base font-semibold leading-7'>{cell.name}</h3>
        <span className="ml-6 flex h-7 items-center" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
          ) : (
            <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
          )}
        </span>
      </div>
      {isOpen && (
        <div className='grid grid-cols-4 pb-12 gap-4'>
          {cell.members.sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          }).map((user) => (
            <div key={user.id} className="border px-2 py-2 rounded-md">
              <div className="py-2">
                <h3 className='font-semibold'>{user.name}</h3>
                <Controller
                  name={`${user.id}.userId`} // 유저 아이디 필드
                  control={control}
                  defaultValue={user.id}
                  render={({ field }) => (
                    <input {...field} className="hidden" disabled />
                  )}
                />
                <Controller
                  name={`${user.id}.userName`} // 유저 이름 필드
                  control={control}
                  defaultValue={user.name}
                  render={({ field }) => (
                    <input {...field} className="hidden" disabled />
                  )}
                />
                <Controller
                  name={`${user.id}.cellId`} // 셀 아이디 필드
                  control={control}
                  defaultValue={user.cell?.id}
                  render={({ field }) => (
                    <input {...field} className="hidden" disabled />
                  )}
                />
                <Controller
                  name={`${user.id}.cellName`} // 셀 이름 필드
                  control={control}
                  defaultValue={user.cell?.name}
                  render={({ field }) => (
                    <input {...field} className="hidden" disabled />
                  )}
                />
                <Controller
                  name={`${user.id}.community`} // 셀 아이디 필드
                  control={control}
                  defaultValue={communityName}
                  render={({ field }) => (
                    <input {...field} className="hidden" disabled />
                  )}
                />
              </div>
              <div className="flex gap-x-3 py-2">
                <div className="flex-[2]">
                  <Controller
                    name={`${user.id}.description`} // 내역 필드
                    control={control}
                    rules={{
                      required: {
                        value: watch(`${user.id}.amount`) !== "" && watch(`${user.id}.amount`) !== undefined,
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
                  {errors[`${user.id}`]?.description && <p className='text-sm text-red-600 pl-2 mt-1'>내역을 입력해주세요</p>}
                </div>
                <div className="flex-[1]">
                  <div className="relative rounded-md shadow-sm">
                    <Controller
                      name={`${user.id}.amount`} // 금액 필드
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="금액"
                          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      )}
                      rules={{
                        min: {
                          value: 1,
                          message: "1 이상의 값을 입력하세요"
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "숫자만 입력해주세요"
                        }
                      }}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-gray-500 text-sm" id="price-currency">
                        D
                      </span>
                    </div>
                  </div>
                  {errors[`${user.id}`]?.amount && (
                    <p className='text-sm text-red-600 pl-2 mt-1'>
                      {parseInt(watch(`${user.id}.amount`), 10) === 0  ? "0이상 입력" : "숫자만 입력"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CellAccordionItem;
