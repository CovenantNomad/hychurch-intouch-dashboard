import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { onActivateEvaluationForm, onInActivateEvaluationForm, updateEvalutionFormSetting } from "../../../../firebase/EvaluationForm/evaluationFrom";
import { EvaluationSettingType, TEvaluationSettingForm } from "../../../../interface/EvaluationFormTypes";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import { DateRangePicker } from "@tremor/react";
import { ko } from "date-fns/locale";
import { async } from "rxjs";

type EvaluationSettingModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setting: EvaluationSettingType | null | undefined
}

const EvaluationSettingModal = ({ open, setOpen, setting }: EvaluationSettingModalProps) => {
  const queryClient = useQueryClient();
  const today = new Date()
  const newSeasonName = today.getMonth() === 11 ? `${today.getFullYear() + 1}년 상반기`: today.getMonth() <= 2 ? `${today.getFullYear()}년 상반기`: `${today.getFullYear()}년 하반기`
  const { handleSubmit, control, formState: { errors }} = useForm<TEvaluationSettingForm>({
    defaultValues: {
      entryPeriod: {
        from: setting?.entryPeriod.from?.toDate(),
        to: setting?.entryPeriod.to?.toDate()
      },
      viewingPeriod: {
        from: setting?.viewingPeriod.from?.toDate(),
        to: setting?.viewingPeriod.to?.toDate()
      }
    }
  })

  const activeMutate = useMutation('onActivateEvalutionForm', onActivateEvaluationForm, {
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['getEvalutationActivation']})
    }
  })
  const inActiveMutate = useMutation('onInActivateEvalutionForm', onInActivateEvaluationForm, {
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['getEvalutationActivation']})
    }
  })

  const updateMutate = useMutation('updateEvalutionFormSetting', updateEvalutionFormSetting, {
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ['getEvalutationActivation']})
    }
  })

  const onSubmitHandler = async (data: TEvaluationSettingForm) => {
    await updateMutate.mutateAsync(data)
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
                {setting ? (
                  <>
                    {setting.isActive ? (
                      <div className="min-h-[680px]">
                        <div className="h-full flex flex-col">
                          <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <div className="p-5">
                              <div className="flex justify-between">
                                <h2>셀평가서 활성화</h2>
                                <span className="text-sm px-2 py-1 bg-emerald-600 text-white rounded-md">ON</span>
                              </div>
                            </div>
                            <div className="py-5 px-5 border-t border-t-gray-300">
                              <h3 className="font-semibold mb-4">입력 및 열람기간 설정</h3>
                              <div>
                                <span className="block mb-1">입력기간</span>
                                <Controller
                                  name='entryPeriod'
                                  control={control}
                                  rules={{ required: {value: true, message: '입력기간을 설정해주세요'} }}
                                  render={({ field }) => (
                                    <DateRangePicker 
                                      value={field.value}
                                      onValueChange={field.onChange}
                                      enableSelect={false}
                                      locale={ko}
                                      color="rose"
                                      className="max-w-sm mx-auto" 
                                    />
                                  )}
                                />
                                {errors.entryPeriod && <span className="block mt-1 text-sm text-red-500">{errors.entryPeriod.message}</span>}
                              </div>
                              <div className="mt-2">
                                <span className="block mb-1">열람기간</span>
                                <Controller
                                  name='viewingPeriod'
                                  control={control}
                                  rules={{ required: {value: true, message: '열람기간을 설정해주세요'} }}
                                  render={({ field }) => (
                                    <DateRangePicker 
                                      value={field.value}
                                      onValueChange={field.onChange}
                                      enableSelect={false}
                                      locale={ko}
                                      color="rose"
                                      className="max-w-sm mx-auto" 
                                    />
                                  )}
                                />
                                {errors.viewingPeriod && <span className="block mt-1 text-sm text-red-500">{errors.viewingPeriod.message}</span>}
                              </div>
                            </div>
                            <div className="pt-8 px-5 pb-5">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                              >
                                설정
                              </button>
                            </div>
                          </form>
                        </div>
                        <div className="p-5 border-t border-b border-t-gray-300">
                          <h3 className="font-semibold mb-8">셀평가서 종료하기</h3>
                          <div>
                            <button
                              type="button"
                              onClick={() => inActiveMutate.mutateAsync()}
                              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                              종료
                            </button>
                          </div>
                        </div>
                        <div className="absolute bottom-6 w-full px-5">
                          <div>
                            <button
                              type="button"
                              className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1"
                              onClick={() => setOpen(false)}
                            >
                              창 닫기
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5">
                        <div className="flex justify-between">
                          <h6>셀평가서 활성화</h6>
                          <span className="text-sm px-2 py-1 bg-gray-600 text-white rounded-md">OFF</span>
                        </div>
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-semibold text-center">
                            {newSeasonName} 셀편성을 위한 셀평가를 시작하시겠습니까?
                          </p>
                        </div>
                        <div className="mt-5 text-center">
                          <button
                            type="button"
                            onClick={() => activeMutate.mutateAsync(newSeasonName)}
                            className="inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            시작하기
                          </button>
                        </div>
                      </div>
                    )}
                  </>
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

export default EvaluationSettingModal;
