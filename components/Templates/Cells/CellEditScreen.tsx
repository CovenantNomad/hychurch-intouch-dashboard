import React from "react";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  useUpdateCellFieldsMutation,
  UpdateCellFieldsMutation,
  UpdateCellFieldsMutationVariables,
} from "../../../graphql/generated";
import { updateCellForm } from "../../../interface/cell";
import SectionContainer from "../../Atoms/Container/SectionContainer";
import SectionTitle from "../../Atoms/Typography/SectionTitle";
import { useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import BlockContainer from "../../Atoms/Container/BlockContainer";

interface CellEditScreenProps {
  id: string;
  name: string;
  community: string;
}

const CellEditScreen = ({ id, name, community }: CellEditScreenProps) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<updateCellForm>({
    defaultValues: {
      name,
      community
    }
  });

  const { mutate } = useUpdateCellFieldsMutation<
    UpdateCellFieldsMutation,
    UpdateCellFieldsMutationVariables
  >(graphlqlRequestClient, {
    onError(errors: UpdateCellFieldsMutation) {
      console.log(errors);
      toast.error(`셀정보를 업데이트 하는데 실패했습니다.`);
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["findCell", { id: Number(id) }],
      });
      queryClient.invalidateQueries({ queryKey: ["findCells"] });
      toast.success(
        `${data?.updateCellFields.cell.name}이 성공적으로 업데이트 되었습니다`
      );
    },
  });

  const onSubmitHandler = (data: updateCellForm) => {
    if (id) {
      mutate({
        input: {
          id,
          name: data.name,
          community: data.community,
        },
      });
    }
  };

  return (
    <SectionContainer>
      <BlockContainer firstBlock>
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
              disabled={name === watch('name') && community === watch('community')}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-BLUE disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              수정하기
            </button>
          </div>
        </form>
      </BlockContainer>
    </SectionContainer>
  );
};

export default CellEditScreen;
