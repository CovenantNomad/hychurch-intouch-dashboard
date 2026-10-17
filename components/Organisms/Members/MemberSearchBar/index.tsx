import {debounce} from "lodash";
import {Dispatch, SetStateAction, useCallback} from "react";
import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import {selectedUser} from "../../../../stores/selectedUser";
import CloseIcon from "../../../Atoms/Icons/CloseIcon";
import SearchIcon from "../../../Atoms/Icons/SearchIcon";

interface SearchBarForm {
  keyword: string;
}

interface SearchBarProps {
  setKeyword: Dispatch<SetStateAction<string | null>>;
}

const MemberSearchBar = ({setKeyword}: SearchBarProps) => {
  const setSelectedUserInfo = useSetRecoilState(selectedUser);

  const {
    handleSubmit,
    register,
    reset,
    formState: {isSubmitted, isDirty},
  } = useForm<SearchBarForm>();

  const onSubmitHandler = debounce(({keyword}: SearchBarForm) => {
    const trimmedKeyword = keyword.trim();

    if (!trimmedKeyword) return;

    setKeyword(trimmedKeyword);
  }, 300);

  const onCloseHandle = useCallback(() => {
    setKeyword(null);
    reset();
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
