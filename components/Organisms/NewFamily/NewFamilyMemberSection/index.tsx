import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {useState} from "react";
import {useRecoilState} from "recoil";
import {MemberWithTransferOut} from "../../../../interface/user";
import {newFamilyListView} from "../../../../stores/newFamilyState";
import SearchButton from "../../../Atoms/SearchButton";
import SkeletonTable from "../../../Atoms/Skeleton/SkeletonTable";
import SearchModal from "../../../Blocks/SearchModal/SearchModal";
import NewFamilyCalendarView from "./_components/NewFamilyCalendarView";
import NewFamilyTableView from "./_components/NewFamilyTableView";
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

interface NewFamilyMemberSectionProps {
  isLoading: boolean;
  memberList: MemberWithTransferOut[];
}

const NewFamilyMemberSection = ({
  isLoading,
  memberList,
}: NewFamilyMemberSectionProps) => {
  //Search State
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [listViewState, setListViewState] = useRecoilState(newFamilyListView);

  const toggleView = () => {
    setListViewState((prevState) => ({
      ...prevState,
      isListView: !prevState.isListView,
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center py-3">
        <h6 className="text-xl font-bold">새가족 명단</h6>
        <div className="flex gap-x-6 items-center">
          <SearchButton
            placeholder={"이름으로 검색하세요"}
            disabled={isLoading}
            onClickHandler={() => setOpen(true)}
          />
          <div className="flex items-center gap-x-2 border px-1 py-1 rounded-md">
            <div
              className={`${
                listViewState.isListView ? "bg-transparent" : "bg-gray-100"
              } px-2 py-1.5 rounded-sm cursor-pointer`}
              onClick={() => toggleView()}
            >
              <span className="text-sm">등록일별</span>
            </div>
            <div
              className={`${
                listViewState.isListView ? "bg-gray-100" : "bg-transparent"
              } px-2 py-1.5 rounded-sm cursor-pointer`}
              onClick={() => toggleView()}
            >
              <span className="text-sm">전체데이터</span>
            </div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="pt-8">
          <SkeletonTable />
        </div>
      ) : (
        <div>
          <div>
            {listViewState.isListView ? (
              <NewFamilyTableView memberList={memberList} />
            ) : (
              <NewFamilyCalendarView memberList={memberList} />
            )}
          </div>
          <SearchModal
            people={memberList}
            open={open}
            setOpen={setOpen}
            query={query}
            setQuery={setQuery}
          />
        </div>
      )}
    </div>
  );
};

export default NewFamilyMemberSection;
