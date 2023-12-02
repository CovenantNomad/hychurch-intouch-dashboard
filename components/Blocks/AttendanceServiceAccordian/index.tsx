import React, { Dispatch, SetStateAction } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { FindChurchServicesQuery, FindChurchServicesQueryVariables, useFindChurchServicesQuery } from '../../../graphql/generated';
import graphlqlRequestClient from '../../../client/graphqlRequestClient';
import { AttendnaceCartType } from '../../Organisms/SpecialCellsAttendance/AttendanceSidePanel';
import { TempSavedAttendanceHistory } from '../../../interface/attendance';
import { selectedAttendanceMember } from '../../Organisms/SpecialCellsAttendance/SpecialCellAttendance/SpecialCellAttendanceUserList';

type AttendanceServiceAccordianProps = {
  attendanceCart: AttendnaceCartType[];
  selectedService: string | null;
  selectedMember: selectedAttendanceMember | null
  attendanceList: TempSavedAttendanceHistory[] | null
  disabled?: boolean;
  setSelectedService: Dispatch<SetStateAction<string | null>>
}

const AttendanceServiceAccordian = ({ attendanceCart, selectedMember, attendanceList, selectedService, disabled, setSelectedService }: AttendanceServiceAccordianProps) => {

  const { isLoading: isServiceLoading, isFetching: isServiceFetching, data: churchService } = useFindChurchServicesQuery<
    FindChurchServicesQuery,
    FindChurchServicesQueryVariables
  >(
    graphlqlRequestClient,
    {},
    {
      staleTime: 24 * 60 * 60 * 1000,
      cacheTime: 24 * 60 * 60 * 1000,
    }
  )

  return (
    <Disclosure
      as="div"
      className={`border ${selectedService ? 'border-blue-400' : 'border-gray-200'} px-2 py-3`}
    >
      {({ open, close }) => (
        <>
          <h3 className="-mx-2 -my-3 flow-root">
            <Disclosure.Button className="w-full flex items-center justify-between py-4 px-4" disabled={disabled}>
              <span className='text-sm'>예배시간 선택하기</span>
              <span>
                {open ? (
                  <ChevronUpIcon className='h-6 w-6 text-gray-400 font-black' />
                ) : (
                  <ChevronDownIcon className='h-6 w-6 text-gray-400 font-black' />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="border-t mt-3 -mx-2 -mb-3">
            {isServiceLoading || isServiceFetching ? (
              <div className='divide-y'>
                {Array.from({length: 5}).map((item, index) => (
                  <div key={index} className='block w-full p-4'>
                    <div className='animate-pulse w-20 h-1.5 rounded-lg bg-gray-300'/>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {churchService ? (
                  <div className='divide-y'>
                    {churchService.findChurchServices.map(service => (
                      <button 
                        key={service.id}
                        onClick={() => {
                          setSelectedService(service.id)
                          close()
                        }}
                        disabled={attendanceCart.filter(item => item.churchServiceId === service.id).length !== 0 || !!attendanceList?.find(item => item.churchServiceId === service.id && item.userId === selectedMember?.userId)}
                        className='block w-full hover:bg-gray-50 disabled:bg-gray-400 hover:disabled:bg-gray-400'
                      >
                        <div>
                          <div className='flex justify-start items-center p-4'>
                            <p className='text-sm font-bold'>{service.name} ({`${service.startAt.split(':')[0]}:${service.startAt.split(':')[1]}`})</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div>데이터를 가져오지 못했습니다.</div>
                )}
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
};

export default AttendanceServiceAccordian;
