import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { QueryClient, useQueryClient } from "react-query";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  RemoveUserMutation,
  RemoveUserMutationVariables,
  useRemoveUserMutation,
} from "../../../../graphql/generated";
import { SpecialCellIdType } from "../../../../interface/cell";
import { makeErrorMessage } from "../../../../utils/utils";
import Input from "../../../Atoms/Input";
import SectionTitle from "../../../Atoms/Typography/SectionTitle";

interface RemoveUserSectionProps {
  id: string;
  name: string;
}

interface RemoveFormType {
  reason: string;
}

const RemoveUserSection = ({ id, name }: RemoveUserSectionProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RemoveFormType>();
  const { mutate: removeUserMutate } = useRemoveUserMutation<
    RemoveUserMutation,
    RemoveUserMutationVariables
  >(graphlqlRequestClient, {
    onSuccess() {
      toast.success(`${name}청년을 인터치 청년교회에서 제외되었습니다`);
      queryClient.invalidateQueries({
        queryKey: ["findRenewCell", { id: Number(SpecialCellIdType.Renew) }],
      });
      router.back();
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(
          `${name}청년을 제외하는 중 오류가 발생했습니다.\n${makeErrorMessage(
            error.message
          )}`
        );
      }
    },
  });

  const onSubmitHandler = (data: RemoveFormType) => {
    removeUserMutate({
      input: {
        userId: id,
        reason: data.reason,
      },
    });
  };

  return (
    <>
      <SectionTitle>청년 제외</SectionTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex items-center gap-x-6">
          <div className="flex-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 sr-only"
            >
              사유
            </label>
            <input
              type="text"
              placeholder="사유를 입력해주세요"
              {...register("reason", {
                required: {
                  value: true,
                  message: "사유를 반드시 입력해주세요",
                },
                maxLength: {
                  value: 120,
                  message: "너무 많은 내용을 입력하였습니다 (최대길이오류)",
                },
              })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-RED"
            >
              제외하기
            </button>
          </div>
        </div>
        {errors.reason && (
          <p className="mt-1 px-3 text-sm text-red-600">
            {errors.reason.message}
          </p>
        )}
      </form>
    </>
  );
};

export default RemoveUserSection;
