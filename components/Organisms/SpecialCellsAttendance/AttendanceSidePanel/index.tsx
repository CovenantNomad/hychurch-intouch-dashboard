import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import AttendnaceServiceOptionAccordian from '../../../Blocks/AttendnaceServiceOptionAccordian';
import AttendanceServiceAccordian from '../../../Blocks/AttendanceServiceAccordian';
import { selectedAttendanceMember } from '../SpecialCellAttendance/SpecialCellAttendanceUserList';
import { getServiceName } from '../../../../utils/utils';
import InformationAlerts from '../../../Atoms/Alerts/InformationAlerts';
import toast from 'react-hot-toast';
import { onSaveAttendanceListPrpsType } from '../../../../hooks/SpecialCellAttendanceSubmit/useAttendanceSubmit';
import { TempSavedAttendanceHistory } from '../../../../interface/attendance';

type AttendanceSidePanelProps = {
  selectedMember: selectedAttendanceMember | null
  attendanceList: TempSavedAttendanceHistory[] | null
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSaveAttendanceList: ({ userId, userName, churchServiceId, isOnline }: onSaveAttendanceListPrpsType) => void
}

export type AttendnaceCartType = {
  userId: string;
  userName: string;
  churchServiceId: string;
  isOnline: boolean;
  attendedAt: string;
}

const AttendanceSidePanel = ({ selectedMember, attendanceList, open, setOpen, onSaveAttendanceList }: AttendanceSidePanelProps) => {
  const [ attendanceCart, setAttendnaceCart ] = useState<AttendnaceCartType[]>([])
  const [ selectedService, setSelectedService ] = useState<string | null>(null)
  const [ isOptionOpen, setIsOptionOpen ] = useState(false)
  

  const onRemoveHandler = (userId: string, churchServiceId: string) => {
    if (attendanceCart !== null) {
      const filteredList = attendanceCart.filter(
        (item) =>
          !(item.userId === userId && item.churchServiceId === churchServiceId)
      )
      setAttendnaceCart(filteredList)
    }
  }

  const onSaveHandler = () => {
    if (attendanceCart.length === 0) {
      toast.error("출석한 예배를 선택해주세요")
      return 
    } else {
      try {
        attendanceCart.map(item => {
          onSaveAttendanceList({
            userId: item.userId,
            userName: item.userName,
            churchServiceId: item.churchServiceId,
            isOnline: item.isOnline
          })
        })
        toast.success("예배출석명단에 저장되었습니다.")
        setSelectedService(null)
        setAttendnaceCart([])
        setOpen(false)
      } catch {
        toast.error("저장 중에 에러가 발생하였습니다.")
      }
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {
        setSelectedService(null)
        setAttendnaceCart([])
        setOpen(false)
      }}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          출석체크
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => {
                              setSelectedService(null)
                              setAttendnaceCart([])
                              setOpen(false)
                            }}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className='mt-2'>
                        <InformationAlerts 
                          description={`예배시간을 선택해야 성전/온라인을 선택할 수 있습니다\n사이드패널을 닫으면 선택했던 내용들 모두 초기화됩니다`}
                        />
                      </div>
                    </div>
                    {attendanceCart.length === 0 ? (
                      <>
                        <div className="flex-1 mt-6 px-4 sm:px-6 space-y-[14px]">
                          <AttendanceServiceAccordian
                            selectedMember={selectedMember}
                            attendanceList={attendanceList}
                            attendanceCart={attendanceCart} 
                            selectedService={selectedService} 
                            setSelectedService={setSelectedService} 
                          />
                          <AttendnaceServiceOptionAccordian
                            selectedMember={selectedMember} 
                            attendanceCart={attendanceCart}
                            selectedService={selectedService}
                            disabled={selectedService === null} 
                            setIsOptionOpen={setIsOptionOpen}
                            setSelectedService={setSelectedService} 
                            setAttendnaceCart={setAttendnaceCart}
                          />
                        </div>
                        <div>
                          <div className='w-full p-3'>
                            <button 
                              onClick={() => {
                                setSelectedService(null)
                                setAttendnaceCart([])
                                setOpen(false)
                              }}
                              className='h-14 w-full border font-bold'
                            >
                              옵션 선택 닫기
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {isOptionOpen ? (
                          <>
                            <div className="flex-1 mt-6 px-4 sm:px-6 space-y-[14px]">
                              <AttendanceServiceAccordian
                                selectedMember={selectedMember}
                                attendanceList={attendanceList} 
                                attendanceCart={attendanceCart}
                                selectedService={selectedService}
                                setSelectedService={setSelectedService} 
                              />
                              <AttendnaceServiceOptionAccordian
                                selectedMember={selectedMember} 
                                attendanceCart={attendanceCart}
                                selectedService={selectedService}
                                disabled={selectedService === null}
                                setIsOptionOpen={setIsOptionOpen} 
                                setSelectedService={setSelectedService} 
                                setAttendnaceCart={setAttendnaceCart}
                              />
                            </div>
                            <div>
                              <div className='w-full p-3'>
                                <button 
                                  onClick={() => {
                                    setIsOptionOpen(false)
                                    setSelectedService(null)
                                  }}
                                  className='h-14 w-full border font-bold'
                                >
                                  옵션 선택 닫기
                                </button>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <div className='w-full p-3'>
                                <button 
                                  onClick={() => setIsOptionOpen(true)}
                                  className='h-14 w-full border font-bold'
                                >
                                  옵션 선택하기
                                </button>
                              </div>
                            </div>
                            <div className='flex-1 mt-4 px-3'>
                              <p>{selectedMember?.userName}의 예배참석</p>
                              <div className='mt-2 space-y-3'>
                                {attendanceCart.map((attendance, index) => (
                                  <div key={index} className='flex justify-between p-4 border'>
                                    <span className='text-sm'>{`${getServiceName(attendance.churchServiceId)} / ${attendance.isOnline === true ? "온라인예배" : "성전예배"}`}</span>
                                    <button
                                      type="button"
                                      className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                      onClick={() => onRemoveHandler(attendance.userId, attendance.churchServiceId)}
                                    >
                                      <span className="absolute -inset-2.5" />
                                      <span className="sr-only">Close panel</span>
                                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                                <div className='w-full p-3'>
                                  <button 
                                    onClick={onSaveHandler}
                                    className='h-14 w-full bg-black text-white font-bold'
                                  >
                                    저장하기
                                  </button>
                                </div>
                              </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AttendanceSidePanel;
