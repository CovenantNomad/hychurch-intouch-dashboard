import React, { Dispatch, Fragment, SetStateAction } from "react";
import dayjs from "dayjs";
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
//fetch
import { createDallentSeason } from "../../../../../firebase/Dallant/Dallant";
//types
import { getTodayString } from "../../../../../utils/dateUtils";
import { SeasonNameForm } from "../../../../../interface/Dallants";
//components
import { Dialog, Transition } from "@headlessui/react";
import SimpleAlerts from "../../../../Atoms/Alerts/SimpleAlerts";



interface CreateSeasonModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateSeasonModal = ({ open, setOpen }: CreateSeasonModalProps) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SeasonNameForm>();

  const { mutateAsync } = useMutation(createDallentSeason, {
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['getTalentSetting'] });
    },
  })

  const onSubmitHandler = async (data: SeasonNameForm) => {
    await mutateAsync({
      name: data.name,
      startDate: getTodayString(dayjs())
    })
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <h2 className="text-xl font-bold text-center mb-4">🎖️ 새로운 달란트 시즌 🎖️</h2>
                <div className="mb-8">
                  <SimpleAlerts 
                    title={"시즌이름 입력 주의사항"} 
                    description={`1. 영어와 숫자로 공백없이 입력해주세요.\n2. 글자수는 2~20자까지 가능합니다.\n(예시) 2023FALL / 2024SUMMER`} 
                  />
                </div>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                  <label htmlFor="name" className="ml-px block text-sm font-medium leading-6 text-gray-900">
                    시즌이름
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="새로운 시즌 이름을 입력해주세요"
                      {...register("name", {
                        required: "시즌 이름을 입력해주세요",
                        minLength: {
                          value: 2,
                          message:
                            "이름을 제대로 입력하였는지 확인해 주세요 (최소길이오류)",
                        },
                        maxLength: {
                          value: 20,
                          message:
                            "이름은 최대 20자까지만 입력해 주세요 (최대길이오류)",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/g,
                          message: "영문, 숫자만 입력해주세요",
                        },
                        setValueAs: (v) => v.replace(/\s/g, ""),
                      })}
                      className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.name && (
                      <p className="mt-1 px-3 text-sm text-red-600">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className='flex justify-center mt-8'>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-600/80"
                    >
                      시작하기
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

export default CreateSeasonModal;
