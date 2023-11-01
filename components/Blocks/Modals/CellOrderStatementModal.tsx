import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { OrderStateMentType } from "../../../interface/Dallants";
import EmptyStateSimple from "../../Atoms/EmptyStates/EmptyStateSimple";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface CellOrderStatementModalProps {
  data: OrderStateMentType | undefined
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CellOrderStatementModal = ({
  data,
  open,
  setOpen,
}: CellOrderStatementModalProps) => {


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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-md py-8">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-9 right-4"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="pb-4">
                  <h4 className="text-2xl font-bold text-center">주문내역서</h4>
                </div>
                {data && data.orderDocument ? (
                  <div className="space-y-4 px-2">
                    {data.orderDocument.cartItems.map((item) => (
                      <div
                        key={item.orderedMenuItem.menuId}
                        className="flex justify-between items-center py-4 px-4 border border-gray-300 rounded-md"
                      >
                        <div>
                          <span className="block font-bold">
                            {item.orderedMenuItem.menuName}
                          </span>
                          <span className="block text-sm text-gray-500 mt-1">
                            {item.orderedMenuItem.menuDescription}
                          </span>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <span className="text-sm">주문수량 : </span>
                          <span className="text-lg font-bold">{item.itemQuantity}개</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <EmptyStateSimple />
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

export default CellOrderStatementModal;
