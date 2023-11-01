import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createRestaurants } from "../../../firebase/Dallant/CellDay";

interface CreateRestaurantModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateRestaurantModal = ({
  open,
  setOpen,
}: CreateRestaurantModalProps) => {
  const queryClient = useQueryClient();
  const { handleSubmit, register, formState: { errors }} = useForm<{name: string}>()
  const { mutateAsync } = useMutation(createRestaurants, {
    onSuccess() {
      queryClient.invalidateQueries(['getRestaurants'])
    },
  })

  const onSubmitHandler = (data: { name: string }) => {
    mutateAsync({
      restaurantName: data.name
    })
    setOpen(false)
  }


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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-sm">
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <div>
                    <div className="text-center">
                      <Dialog.Title
                        as="h3"
                        className="p-5 text-lg font-semibold leading-6 text-gray-900"
                      >
                        '셀모임의 날' 상점 입점
                      </Dialog.Title>
                      <div className="mx-5">
                        <label className="sr-only">상점이름</label>
                        <input
                          id="name"
                          type="text"
                          placeholder="상점이름 입력"
                          {...register("name", {
                            required: "상점이름을 입력해주세요",
                            pattern: {
                              value: /^[가-힣a-zA-Z]+$/g,
                              message: "글자만 입력해주세요",
                            },
                            setValueAs: (v) => v.replace(/\s/g, ""),
                          })}
                          className="mt-1 block w-full py-3 px-3 border border-gray-300 outline-none appearance-none rounded-md text-sm"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 p-5 border-t border-t-gray-300 grid grid-flow-row-dense grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1"
                      onClick={() => setOpen(false)}
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      생성
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateRestaurantModal;
