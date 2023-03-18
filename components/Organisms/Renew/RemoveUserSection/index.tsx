import { useRouter } from "next/router";
import React from "react";
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
import SectionTitle from "../../../Atoms/Typography/SectionTitle";

interface RemoveUserSectionProps {}

const RemoveUserSection = ({}: RemoveUserSectionProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate: removeUserMutate } = useRemoveUserMutation<
    RemoveUserMutation,
    RemoveUserMutationVariables
  >(graphlqlRequestClient, {
    onSuccess() {
      toast.success("해당 청년은 인터치 교회에서 제외되었습니다.");
      queryClient.invalidateQueries({
        queryKey: ["findCell", { id: Number(SpecialCellIdType.Renew) }],
      });
      router.back();
    },
    onError(error) {
      if (error instanceof Error) {
        toast.error(
          `해당 청년을 제외하는데 실패했습니다.\n${makeErrorMessage(
            error.message
          )}`
        );
      }
    },
  });

  return (
    <>
      <SectionTitle>청년 제외</SectionTitle>
    </>
  );
};

export default RemoveUserSection;
