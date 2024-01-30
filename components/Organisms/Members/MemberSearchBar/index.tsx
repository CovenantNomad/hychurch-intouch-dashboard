import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { debounce } from "lodash";
import { Dispatch, SetStateAction, useCallback } from "react";
import SearchIcon from "../../../Atoms/Icons/SearchIcon";
import CloseIcon from "../../../Atoms/Icons/CloseIcon";
import { useSetRecoilState } from "recoil";
import { selectedUser } from "../../../../stores/selectedUser";

interface SearchBarForm {
  keyword: string;
}

interface SearchBarProps {
  setKeyword: Dispatch<SetStateAction<string | null>>;
}

const MemberSearchBar = ({ setKeyword }: SearchBarProps) => {
  const setSelectedUserInfo = useSetRecoilState(selectedUser);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { isSubmitted, isDirty },
  } = useForm<SearchBarForm>();

  const onSubmitHandler = debounce(({ keyword }: SearchBarForm) => {
    queryClient.invalidateQueries("searchUsers");
    setKeyword(keyword);
  }, 300);

  const onCloseHandle = useCallback(() => {
    queryClient.invalidateQueries("searchUsers");
    setKeyword(null);
    reset();
    setValue("keyword", "");
    setSelectedUserInfo(null);
  }, []);

  return (
    <div className="w-full px-4 py-3 border-2 border-blue-600 rounded-3xl bg-white md:rounded-md">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="flex items-center"
      >
        <SearchIcon />
        <input
          {...register("keyword")}
          placeholder="이름 또는 전화번호로 검색해주세요"
          className="border-none outline-none w-full h-6"
        />
        <input type="submit" className="hidden" />
        {isSubmitted && isDirty && <CloseIcon onClick={onCloseHandle} />}
      </form>
    </div>
  );
};

export default MemberSearchBar;
