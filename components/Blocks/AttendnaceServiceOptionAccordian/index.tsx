import React, { Dispatch, SetStateAction } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { AttendnaceCartType } from '../../Organisms/SpecialCellsAttendance/AttendanceSidePanel';
import { selectedAttendanceMember } from '../../Organisms/SpecialCellsAttendance/SpecialCellAttendance/SpecialCellAttendanceUserList';
import toast from 'react-hot-toast';
import useNewFamilyAttendanceSubmit from '../../../hooks/SpecialCellAttendanceSubmit/useAttendanceSubmit';

type AttendnaceServiceOptionAccordianProps = {
  attendanceCart: AttendnaceCartType[]
  selectedMember: selectedAttendanceMember | null
  selectedService: string | null;
  disabled?: boolean;
  setIsOptionOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedService: Dispatch<SetStateAction<string | null>>;
  setAttendnaceCart: Dispatch<SetStateAction<AttendnaceCartType[]>>;
}

const AttendnaceServiceOptionAccordian = ({ attendanceCart, selectedMember, selectedService, disabled, setAttendnaceCart, setSelectedService, setIsOptionOpen }: AttendnaceServiceOptionAccordianProps) => {
  const { attendanceDate } = useNewFamilyAttendanceSubmit()

  const onSaveHandler = (isOnline: boolean) => {
    if (selectedMember !== null && selectedService !== null) {
      setAttendnaceCart([
        ...attendanceCart,
        {
          userId: selectedMember.userId,
          userName: selectedMember.userName,
          churchServiceId: selectedService,
          isOnline: isOnline,
          attendedAt: attendanceDate,
        }
      ])
      setSelectedService(null)
      setIsOptionOpen(false)
    } else {
      toast.error("잘못된 접근입니다")
    }
  }


  return (
    <Disclosure
      as="div"
      className="border border-gray-200 px-2 py-3"
    >
      {({ open }) => (
        <>
          <h3 className="-mx-2 -my-3 flow-root">
            <Disclosure.Button className="w-full flex items-center justify-between py-4 px-4" disabled={disabled}>
              <span className='text-sm'>성전/온라인 선택하기</span>
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
            <div className='divide-y'>
              <button 
                onClick={() => onSaveHandler(false)}
                className='w-full flex justify-start items-center p-4'
              >
                <p className='text-sm font-bold'>성전예배</p>
              </button>
              <button 
                onClick={() => onSaveHandler(true)} 
                className='w-full flex justify-start items-center p-4'
              >
                <p className='text-sm font-bold'>온라인예배</p>
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default AttendnaceServiceOptionAccordian;
