import { debounce } from "lodash";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  FindLeaderQuery,
  FindLeaderQueryVariables,
  useFindLeaderQuery,
} from "../../../../graphql/generated";
import useSelectLeader from "../../../../hooks/useSelectLeader";
import { FindLeaderForm } from "../../../../interface/cell";

interface CreateCellStepsFindLeaderProps {}

const CreateCellStepsFindLeader = ({}: CreateCellStepsFindLeaderProps) => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState<string>("");
  const { handleSubmit, register } = useForm<FindLeaderForm>();
  const {
    createCellInfo,
    disableSelectLeader,
    onSetLeaderHandler,
    onResetLeader,
    setDisableSelectLeader,
  } = useSelectLeader();

  const { isLoading, data } = useFindLeaderQuery<
    FindLeaderQuery,
    FindLeaderQueryVariables
  >(
    graphlqlRequestClient,
    {
      name: search,
    },
    {
      enabled: Boolean(search),
    }
  );

  const onSearchHandler = debounce(({ name }: FindLeaderForm) => {
    queryClient.invalidateQueries("findLeader");
    setSearch(name);
    setDisableSelectLeader(false);
  }, 300);

  return (
    <div className="mt-14 mb-6">
      <>
        <>
          {!createCellInfo?.leader?.name && (
            <p className="text-sm text-red-600 text-center mb-2">
              셀리더를 선택해야 다음단계로 넘어갈 수 있습니다
            </p>
          )}
        </>
        <div className="border border-gray-300 divide-y-[1px] mb-6 rounded-md">
          <div className="grid grid-cols-3 px-4 py-2 items-center">
            <span className="col-span-1 text-gray-500 text-sm">리더 </span>
            <div className="col-span-2 flex justify-between">
              <p
                className={`${
                  createCellInfo?.leader?.name ? "text-black" : "text-gray-400"
                } pointer-events-none text-sm`}
              >
                {createCellInfo?.leader?.name ||
                  "아래 검색창에 리더를 검색해주세요"}
              </p>
              {createCellInfo?.leader?.name && (
                <button onClick={onResetLeader}>
                  <svg className="h-5 w-5" viewBox="0 0 20 20">
                    <path d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSearchHandler)}>
          <div className="border border-gray-200 rounded-2xl flex items-center bg-white px-4 py-1 max-w-xl">
            <label htmlFor="search" className="sr-only">
              셀리더 검색
            </label>
            <svg className="w-5 h-5 mr-2 fill-gray-500" viewBox="0 0 20 20">
              <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
            </svg>
            <input
              id="search"
              {...register("name", {
                required: "검색할 이름을 입력해주세요.",
              })}
              placeholder="searching for member..."
              className="border-none outline-none w-full text-sm py-1"
            />
          </div>
        </form>
        <div className="mt-4">
          <table className="w-full border border-gray-300">
            <thead className="grid grid-cols-4 bg-GRAY002 border-b border-b-gray-300">
              <th className="py-1 text-sm text-GRAY004 col-span-1">이름</th>
              <th className="py-1 text-sm text-GRAY004 col-span-2">연락처</th>
              <th className="py-1 text-sm text-GRAY004 col-span-1">리더</th>
            </thead>
            <tbody>
              {data?.findUsers ? (
                data?.findUsers.nodes.map((leader) => (
                  <tr key={leader.id} className="grid grid-cols-4">
                    <td className="py-2 text-center text-sm col-span-1">
                      {leader.name}
                    </td>
                    <td className="py-2 text-center text-sm col-span-2">
                      {leader.phone}
                    </td>
                    <td className="py-2 text-center">
                      <button
                        onClick={() =>
                          onSetLeaderHandler({
                            id: leader.id,
                            name: leader.name,
                            roles: leader.roles,
                            cell: leader.cell,
                            phone: leader.phone,
                          })
                        }
                        disabled={disableSelectLeader}
                        className={`text-sm ${
                          disableSelectLeader
                            ? "text-gray-600"
                            : "text-teal-600"
                        } font-bold cursor-pointer`}
                      >
                        선택
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="grid grid-cols-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <td
                      className="min-h-[28px] text-center text-sm"
                      key={index}
                    ></td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default CreateCellStepsFindLeader;
