import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import { Select, SelectItem } from "@tremor/react";

interface RemoveUserSectionProps {
  id: string;
  name: string;
}

interface RemoveFormType {
  reason: string;
  otherReason?: string;
}

const RemoveUserSection = ({ id, name }: RemoveUserSectionProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<RemoveFormType>({
    defaultValues: {
      reason: "",
      otherReason: ""
    }
  });

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

    if (data.reason === '기타') {
      removeUserMutate({
        input: {
          userId: id,
          reason: data.reason,
          reasonDetail: data.otherReason
        },
      });
    } else {
      removeUserMutate({
        input: {
          userId: id,
          reason: data.reason,
        },
      });
    }
  };

  return (
    <>
      <SectionTitle>청년 제외</SectionTitle>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-col items-center gap-x-6 lg:flex-row">
          <Controller
            name='reason'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                className="w-full max-w-sm"
              >
                <SelectItem value="이사">
                  이사
                </SelectItem>
                <SelectItem value="결혼">
                  결혼
                </SelectItem>
                <SelectItem value="진급">
                  진급
                </SelectItem>
                <SelectItem value="기타">
                  기타
                </SelectItem>
              </Select>
            )}
          />
          {watch('reason') === '기타' && (
            <div className="w-full mt-1 lg:w-fit lg:flex-grow lg:mt-0">
              <label
                htmlFor="otherReason"
                className="sr-only"
              >
                사유
              </label>
              <input
                type="text"
                placeholder="사유를 입력해주세요"
                {...register("otherReason", {
                  required: {
                    value: watch('reason') === '기타' && true,
                    message: "사유를 반드시 입력해주세요",
                  },
                  maxLength: {
                    value: 120,
                    message: "너무 많은 내용을 입력하였습니다 (최대길이오류)",
                  },
                })}
                className="inline-block w-full py-2.5 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
              />
            </div>
          )}
          <div className="flex justify-center w-full mt-4 lg:w-fit lg:mt-0">
            <button
              type="submit"
              disabled={watch('reason') === ''}
              className="inline-flex w-full justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-RED disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              제외하기
            </button>
          </div>
        </div>
        {(errors.reason || errors.otherReason) && (
          <p className="block mt-1 text-sm text-red-600">{errors.reason?.message || errors.otherReason?.message}</p>
        )}
      </form>
    </>
  );
};

export default RemoveUserSection;
