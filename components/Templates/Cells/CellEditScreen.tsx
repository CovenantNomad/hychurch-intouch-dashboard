import React, { useEffect, useState } from "react";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import { FIND_CELL_LIMIT } from "../../../constants/constant";
import {
  FindCellQuery,
  FindCellsQuery,
  FindCellsQueryVariables,
  RoleType,
  useDeleteCellMutation,
  useFindCellsQuery,
  DeleteCellMutation,
  DeleteCellMutationVariables,
  useUpdateCellFieldsMutation,
  UpdateCellFieldsMutation,
  UpdateCellFieldsMutationVariables,
} from "../../../graphql/generated";
import { SpecialCellIdType, updateCellForm } from "../../../interface/cell";
import { SelectType } from "../../../interface/common";
import InfoCell from "../../Atoms/InfoCell/InfoCell";
import SectionContainer from "../../Atoms/SectionContainer";
import SectionTitle from "../../Atoms/Typography/SectionTitle";
import ComboBoxImage from "../../Blocks/Combobox/ComboBoxImage";
import Summary from "../../Blocks/Summary/Summary";
import { useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { stateSetting } from "../../../stores/stateSetting";
import { useForm } from "react-hook-form";

interface CellEditScreenProps {
  id: string | undefined;
  name: string | undefined;
  community: string | undefined;
}

const CellEditScreen = ({ id, name, community }: CellEditScreenProps) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<updateCellForm>();

  const { mutate } = useUpdateCellFieldsMutation<
    UpdateCellFieldsMutation,
    UpdateCellFieldsMutationVariables
  >(graphlqlRequestClient, {
    onError(errors: UpdateCellFieldsMutation) {
      console.log(errors);
      toast.error(`셀정보를 업데이트 하는데 실패했습니다.`);
    },
    onSuccess(data) {
      queryClient.invalidateQueries("findCell");
      queryClient.invalidateQueries({ queryKey: ["findCells"] });
      toast.success(
        `${data?.updateCellFields.cell.name}이 성공적으로 업데이트 되었습니다`
      );
    },
  });

  const onSubmitHandler = (data: updateCellForm) => {
    if (id) {
      if (name !== data.name || community !== data.community) {
        mutate({
          input: {
            id,
            name: data.name,
            community: data.community,
          },
        });
      } else {
        console.log("변경사항이 없습니다");
      }
    }
  };

  return (
    <div>
      <SectionContainer>
        <SectionTitle>셀정보 수정</SectionTitle>

        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="py-5 bg-white sm:py-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  셀이름
                </label>
                <input
                  type="text"
                  defaultValue={name}
                  placeholder="셀이름을 입력해주세요"
                  {...register("name", {
                    pattern: {
                      value: /^[가-힣a-zA-Z]+$/g,
                      message: "글자만 입력해주세요",
                    },
                    setValueAs: (v) => v.replace(/\s/g, ""),
                  })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
                />
                {errors.name && (
                  <p className="mt-1 px-3 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="col-span-6 lg:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  공동체
                </label>
                <input
                  type="text"
                  defaultValue={community}
                  placeholder="공동체를 입력해주세요"
                  {...register("community", {
                    pattern: {
                      value: /^[가-힣a-zA-Z]+$/g,
                      message: "글자만 입력해주세요",
                    },
                    setValueAs: (v) => v.replace(/\s/g, ""),
                  })}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm outline-none appearance-none focus:border-navy-blue sm:text-sm"
                />
                {errors.community && (
                  <p className="mt-1 px-3 text-sm text-red-600">
                    {errors.community.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="py-3 bg-white text-right">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-BLUE"
            >
              수정하기
            </button>
          </div>
        </form>
      </SectionContainer>
    </div>
  );
};

export default CellEditScreen;
