import React, { Dispatch, Fragment, SetStateAction, useCallback, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createMenu, createRestaurants, uploadMenuImage } from "../../../firebase/Dallant/CellDay";
import { CreateMenuFormType } from "../../../interface/Dallants";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface CreateMenuModalProps {
  restaurantId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateMenuModal = ({
  restaurantId,
  open,
  setOpen,
}: CreateMenuModalProps) => {
  const queryClient = useQueryClient();
  const [ imageFiles, setImageFiles ] = useState<File | null>(null)
  const { handleSubmit, register, reset, formState: { errors, isSubmitting }} = useForm<CreateMenuFormType>()
  const { mutateAsync } = useMutation(createMenu, {
    onSuccess() {
      queryClient.invalidateQueries(['getRestaurants'])
    },
  })

  const onSubmitHandler = async (data: CreateMenuFormType) => {

    const commonData = {
      restaurantId: restaurantId,
      menuName: data.menuName,
      menuPrice: data.menuPrice,
    };

    if (imageFiles === null) {
      const mutatedData = {
        ...commonData,
        menuDescription: data.menuDescription || "",
        menuImageUrl: ""
      }

      mutateAsync(mutatedData)

    } else {
      const imageUrl = await uploadMenuImage(imageFiles)

      if (imageUrl) {
        const mutatedData = {
          ...commonData,
          menuDescription: data.menuDescription || "",
          menuImageUrl: imageUrl
        }

        mutateAsync(mutatedData);

      } else {
        const mutatedData = {
          ...commonData,
          menuDescription: data.menuDescription || "",
          menuImageUrl: ""
        }

        mutateAsync(mutatedData);
      }
    }
    
    reset()
    setPreview(null)
    setImageFiles(null)
    setOpen(false)
  }

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;

    file.onload = function() {
      setPreview(file.result);
    }

    file.readAsDataURL(acceptedFiles[0])
    setImageFiles(acceptedFiles[0])
  }, [])

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/jpg': [],
      'image/png': [],
      'image/webp': []
    },
  });

  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);


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
                    <Dialog.Title
                      as="h3"
                      className="p-5 text-lg font-semibold leading-6 text-gray-900 text-center"
                    >
                      메뉴 추가
                    </Dialog.Title>
                    <div className="mx-5 space-y-4">
                      <div className="">
                        <label htmlFor="menuName" className="block text-sm font-medium leading-6 text-gray-900">
                          메뉴이름
                        </label>
                        <input
                          type="text"
                          {...register("menuName", {
                            required: "메뉴이름을 입력해주세요",
                          })}
                          className="mt-1 block w-full py-3 px-3 border border-gray-300 outline-none appearance-none rounded-md text-sm"
                        />
                        {errors.menuName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.menuName.message}
                          </p>
                        )}
                      </div>
                      <div className="">
                        <label htmlFor="menuPrice" className="block text-sm font-medium leading-6 text-gray-900">
                          메뉴 가격
                        </label>
                        <input
                          type="text"
                          {...register("menuPrice", {
                            required: "메뉴 가격을 입력해주세요",
                            pattern: {
                              value: /^[0-9]+$/,
                              message: "숫자만 입력해주세요"
                            },
                            setValueAs: (v) => v.replace(/\s/g, ""),
                          })}
                          className="mt-1 block w-full py-3 px-3 border border-gray-300 outline-none appearance-none rounded-md text-sm"
                        />
                        {errors.menuPrice && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.menuPrice.message}
                          </p>
                        )}
                      </div>
                      <div className="">
                        <label htmlFor="menuDescription" className="block text-sm font-medium leading-6 text-gray-900">
                          메뉴 소개
                        </label>
                        <input
                          type="text"
                          {...register("menuDescription")}
                          className="mt-1 block w-full py-3 px-3 border border-gray-300 outline-none appearance-none rounded-md text-sm"
                        />
                        {errors.menuDescription && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.menuDescription.message}
                          </p>
                        )}
                      </div>
                      <div className="">
                        <label htmlFor="menuImage" className="block text-sm font-medium leading-6 text-gray-900">
                          메뉴 이미지
                        </label>
                        <div {...getRootProps()} className="rounded-lg border border-dashed border-black/25 px-6 py-10">
                          <input {...getInputProps()} />
                          {
                            isDragActive ?
                              <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" /> :
                              <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-500 mb-2" aria-hidden="true" />
                                <p className="pl-1">Upload a file or drag and drop</p>
                                <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                              </div>
                              
                          }
                        </div>
                        {preview && (
                          <div className="my-5">
                            <p className="text-sm font-medium leading-6 text-gray-900 mb-1">사진 미리보기</p>
                            <Image src={preview as string} alt="Upload preview" width={450} height={250}/>                            
                          </div>
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
                      disabled={isSubmitting}
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

export default CreateMenuModal;
