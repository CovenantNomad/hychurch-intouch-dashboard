import {MinusCircleIcon} from "@heroicons/react/20/solid";
import {PlusCircleIcon} from "@heroicons/react/24/solid";
import {Button} from "@tremor/react";
import {useState} from "react";
import toast from "react-hot-toast";
import graphlqlRequestClient from "../../../../../../../../client/graphqlRequestClient";
import {
  SearchUsersQuery,
  SearchUsersQueryVariables,
  useSearchUsersQuery,
} from "../../../../../../../../graphql/generated";
import {useRegisterBarnaba} from "../../../../../../../../hooks/barnabas/useRegisterBarnaba";
import {TBarnabaProfile} from "../../../../../../../../interface/barnabas";
import {Member} from "../../../../../../../../interface/user";
import MemberSearchBar from "../../../../../../../Organisms/Members/MemberSearchBar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../../../ui/Dialog";

type Props = {};

export const simplifyBarnabaData = (
  cohort: string,
  members: any[]
): TBarnabaProfile[] => {
  return members.map((member) => ({
    id: member.id,
    name: member.name,
    gender: member.gender || null,
    birthday: member.birthday || null,
    isActive: true,
    cohort,
  }));
};

const AddBarnabas = ({}: Props) => {
  const [cohort, setCohort] = useState<string>("");
  const [keyword, setKeyword] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  const {isLoading, data, isRefetching, isFetching} = useSearchUsersQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(
    graphlqlRequestClient,
    {
      keyword,
    },
    {
      enabled: !!keyword,
    }
  );

  const isSearchLoading = isLoading || isFetching || isRefetching;

  const {mutate: register, isLoading: isRegisterLoading} = useRegisterBarnaba();

  const handleRegister = (members: Member[]) => {
    if (!cohort.trim()) {
      toast.error("바나바 기수를 입력해주세요");
      return;
    }
    const simplifiedData = simplifyBarnabaData(cohort, members);
    register(simplifiedData);
    setKeyword(null);
    setSelectedMembers([]);
  };

  const handleSelectMember = (member: Member) => {
    if (!selectedMembers.some((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemoveMember = (id: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== id));
  };

  const handlePopupClose = () => {
    setKeyword(null);
    setSelectedMembers([]);
  };

  return (
    <>
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <button className="px-4 py-2 bg-black text-white text-sm rounded-md shadow hover:bg-gray-800 focus:outline-none transition">
              바나바 추가
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>새로운 바나바 등록</DialogTitle>
              <DialogDescription className="hidden" />
              <div className="mt-6 text-sm leading-6">
                <div className="flex justify-between">
                  <span>바나바 기수</span>
                  <div className="relative">
                    <input
                      type="text"
                      value={cohort}
                      onChange={(e) => setCohort(e.target.value)}
                      className="border-b outline-none text-right pr-4"
                    />
                    <span className="absolute right-0 top-0">기</span>
                  </div>
                </div>
                <p className="mb-4 mt-1 text-gray-400">
                  * 바나바 기수를 먼저 꼭 입력해주세요
                </p>
                <MemberSearchBar setKeyword={setKeyword} />
                <div className="mt-4">
                  {selectedMembers.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-md font-semibold mb-2">
                        등록명단 ({selectedMembers.length}명)
                      </h4>
                      <ul className="space-y-2">
                        {selectedMembers.map((member) => (
                          <li
                            key={member.id}
                            className="flex justify-between items-center p-2 border rounded-md"
                          >
                            <span>{member.name}</span>
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="text-red-600"
                            >
                              <MinusCircleIcon className="h-6 w-6" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  {isSearchLoading ? (
                    <div className="flex justify-center items-center space-x-2 py-4">
                      <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                      <span className="text-sm text-gray-500">검색 중...</span>
                    </div>
                  ) : !keyword ? null : data?.findUsers?.nodes.length ? (
                    <>
                      <h4 className="text-md font-semibold mb-2">
                        검색결과 ({data.findUsers.totalCount}건)
                      </h4>
                      <ul className="space-y-2">
                        {data.findUsers.nodes.map((user) => (
                          <li
                            key={user.id}
                            className="flex justify-between items-center p-2 border rounded-md"
                          >
                            <span>{user.name}</span>
                            <button
                              onClick={() => handleSelectMember(user)}
                              className="text-blue-500"
                            >
                              <PlusCircleIcon className="h-6 w-6" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <div>
                      <span>검색결과가 없습니다</span>
                    </div>
                  )}
                </div>
              </div>
            </DialogHeader>
            <DialogFooter className="mt-8">
              <DialogClose asChild>
                <Button
                  onClick={handlePopupClose}
                  className="mt-2 w-full sm:mt-0 sm:w-fit border border-gray-300 text-gray-700 bg-white rounded-md shadow hover:bg-gray-100 focus:outline-none hover:border-gray-300"
                >
                  취소
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={() => handleRegister(selectedMembers)}
                  disabled={
                    isRegisterLoading ||
                    isSearchLoading ||
                    selectedMembers.length === 0 ||
                    cohort.trim().length === 0
                  }
                  className="w-full sm:w-fit bg-black text-white text-sm rounded-md shadow hover:bg-gray-800 focus:outline-none border-none"
                >
                  등록
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddBarnabas;
