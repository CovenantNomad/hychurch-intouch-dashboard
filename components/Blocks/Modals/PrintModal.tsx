import React, { Dispatch, Fragment, SetStateAction, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ReactToPrint from "react-to-print";
import { CombinedCellDallantType } from "../../../interface/Dallants";
import { RoleType } from "../../../graphql/generated";

interface PrintModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  cellDallant: CombinedCellDallantType | null | undefined
}

const PrintModal = ({
  open,
  setOpen,
  cellDallant
}: PrintModalProps) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative w-[80rem] h-screen transform overflow-hidden rounded-lg shadow-xl bg-white transition-all">
                {cellDallant ? (
                  <>
                    <div ref={componentRef} className="w-full bg-dallantBackground bg-cover print:h-screen print:w-[210mm] print:mt-0">
                      <div className="pt-[400px] px-32 print:pt-[80mm] print:pl-[18mm] print:pr-[23mm]">
                        {/* 타이틀 */}
                        <div className="flex justify-between">
                          <div className="flex-1">
                            <span className="text-3xl font-notosans font-bold leading-6 text-gray-900 print:text-[20pt]">셀이름: </span>
                            <span className="text-3xl font-notosans font-bold leading-6 text-gray-900 print:text-[20pt]">{cellDallant.name}</span>
                          </div>
                          <div className="flex-1 flex gap-x-8 justify-end">
                            <span className="text-3xl font-notosans font-bold leading-6 text-gray-900 print:text-[20pt]">전체 달란트: </span>
                            <span className="text-3xl font-notosans font-bold leading-6 text-gray-900 print:text-[24pt]">{cellDallant.totalAmount.toLocaleString('kr-KR')} D</span>
                          </div>
                        </div>
                        {/* 본문 */}
                        <div className="grid grid-cols-2 gap-6 px-8 py-6 bg-amber-200 print:mt-[12mm]">
                          {cellDallant.members.filter(member => member.roles.includes(RoleType.CellLeader)).map(member => (
                            <div key={member.id} className="rounded-xl bg-white">
                              <div className="flex justify-between py-6">
                                <p className="pl-8 text-xl font-semibold font-notosans print:text-[14pt]">{member.name}</p>
                                <p className="pr-8 text-xl font-semibold font-notosans print:text-[14pt]">{member.totalAmount.toLocaleString('kr-KR')} D</p>
                              </div>
                            </div>
                          ))}
                          {cellDallant.members.filter(member => !member.roles.includes(RoleType.CellLeader)).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)).map(member => (
                            <div key={member.id} className="rounded-xl bg-white">
                              <div className="flex justify-between py-6">
                                <p className="pl-8 text-xl font-semibold font-notosans print:text-[14pt]">{member.name}</p>
                                <p className="pr-8 text-xl font-semibold font-notosans print:text-[14pt]">{member.totalAmount.toLocaleString('kr-KR')} D</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <ReactToPrint
                      trigger={() => (
                        <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0">
                          프린트
                        </button>
                      )} 
                      content={() => componentRef.current} // 프린트할 컴포넌트를 지정합니다.
                    />
                  </>
                ) : (
                  <div>
                    <p>프린트 할 데이터가 없어요</p>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PrintModal;
