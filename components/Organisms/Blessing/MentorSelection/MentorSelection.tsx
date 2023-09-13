import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  SearchUsersQuery,
  SearchUsersQueryVariables,
  useSearchUsersQuery,
} from "../../../../graphql/generated";
import { Member } from "../../../../interface/user";
import EmptyStateSimple from "../../../Atoms/EmptyStates/EmptyStateSimple";
import CloseIcon from "../../../Atoms/Icons/CloseIcon";
import SearchIcon from "../../../Atoms/Icons/SearchIcon";
import SectionContainer from "../../../Atoms/Container/BlockContainer";
import Spinner from "../../../Atoms/Spinner";
import MemberListItem from "../../Members/MemberListItem";
import SectionTitle from "../../../Atoms/Typography/SectionTitle";

interface SearchBarForm {
  name: string;
}

interface MentorSelectionProps {}

const MentorSelection = ({}: MentorSelectionProps) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState<string | null>(null);
  const [mentor, setMentor] = useState<Member | null>(null);
  const [cardinalNumber, setCardinalNumber] = useState<string>("");
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isSubmitted, isDirty },
  } = useForm<SearchBarForm>();

  const { isLoading, data } = useSearchUsersQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(
    graphlqlRequestClient,
    {
      name,
    },
    {
      enabled: !!name,
    }
  );

  // const { mutateAsync } = useMutation(createBarnabas, {
  //   onError(error, variables, context) {
  //     console.log("오류: ", error);
  //     toast.error("오류가 발생하였습니다.");
  //   },
  //   onSuccess(data, variables, context) {
  //     toast.success(`${variables.name}, 바나바로 임명하였습니다`);
  //   },
  // });

  const onSubmitHandler = debounce(({ name }: SearchBarForm) => {
    queryClient.invalidateQueries("searchUsers");
    setName(name);
  }, 300);

  const onCloseHandle = useCallback(() => {
    queryClient.invalidateQueries("searchUsers");
    setName(null);
    reset();
    setValue("name", "");
  }, []);

  const onChangeCardinalNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardinalNumber(e.target.value);
  };

  // const onSaveMentor = useCallback(async () => {
  //   if (mentor) {
  //     const saveData = {
  //       userId: mentor.id,
  //       name: mentor.name,
  //       gender: mentor.gender || "MAN",
  //       birthday: mentor.birthday || "1990-01-01",
  //       phone: mentor.phone,
  //       cardinalNumber: cardinalNumber,
  //     };
  //     await mutateAsync(saveData);
  //   }
  // }, [cardinalNumber, mentor, mutateAsync]);

  return (
    <>
      <SectionTitle>바나바 임명</SectionTitle>
      <div className="grid xl:grid-cols-2 gap-x-4">
        <div className="xl:col-span-1">
          <div className="w-full py-3 px-2 border border-GRAY004 rounded-3xl bg-white md:rounded-md">
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="flex items-center"
            >
              <SearchIcon />
              <input
                {...register("name")}
                placeholder="바나바로 섬길 청년을 검색해주세요"
                className="border-none outline-none w-full h-6"
              />
              <input type="submit" className="hidden" />
              {isSubmitted && isDirty && <CloseIcon onClick={onCloseHandle} />}
            </form>
          </div>
          <div>
            {isLoading ? (
              <div className="">
                <Spinner />
              </div>
            ) : (
              <div
                className={`${
                  data === undefined ? "h-32" : "h-auto"
                } border border-GRAY001 mt-3 rounded-md px-2 py-3`}
              >
                {data !== undefined && (
                  <div className="">
                    {data.findUsers.nodes.map((user, index) => (
                      <MemberListItem
                        key={user.id}
                        member={user}
                        lastItem={data?.findUsers.totalCount - 1 === index}
                        onClick={() => setMentor(user)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 xl:col-span-1 xl:mt-0">
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="overflow-hidden shadow sm:rounded-md">
              <div className="bg-gray-50 px-4 py-5 sm:p-6">
                <div className="">
                  <label
                    htmlFor="cardinalNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    기수
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cardinalNumber"
                      id="cardinalNumber"
                      value={cardinalNumber}
                      onChange={onChangeCardinalNumber}
                      placeholder="바나바 기수를 입력해주세요"
                      className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm text-sm bg-white"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="email-address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    바나바
                  </label>
                  <div
                    className={`flex mt-1 px-3 py-2 rounded-md border border-gray-300 shadow-sm text-sm bg-white ${
                      mentor?.name ? "text-BLACK" : "text-gray-400"
                    }`}
                  >
                    <p className="flex-1">
                      {mentor?.name || "바나바를 검색해서 선택해주세요"}
                    </p>
                    {mentor && <CloseIcon onClick={() => setMentor(null)} />}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                {/* <button
                  type="button"
                  onClick={onSaveMentor}
                  disabled={mentor === null || cardinalNumber === ""}
                  className="inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm bg-GREEN disabled:bg-GRAY004"
                >
                  임명
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorSelection;
