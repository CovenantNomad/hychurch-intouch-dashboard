import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {useState} from "react";
import {MemberWithTransferOut} from "../../../../interface/user";
import SearchButton from "../../../Atoms/SearchButton";
import SearchModal from "../../../Blocks/SearchModal/SearchModal";
import NewFamilyCalendarView from "./_components/NewFamilyCalendarView";
import NewFamilyTableView from "./_components/NewFamilyTableView";
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

interface NewFamilyMemberSectionProps {
  memberList: MemberWithTransferOut[];
}

const NewFamilyMemberSection = ({memberList}: NewFamilyMemberSectionProps) => {
  //Search State
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [isList, setIsList] = useState<boolean>(false);

  return (
    <div>
      <div className="flex justify-between items-center py-3">
        <h6 className="text-xl font-bold">새가족 명단</h6>
        <div className="flex gap-x-6 items-center">
          <SearchButton
            placeholder={"이름으로 검색하세요"}
            onClickHandler={() => setOpen(true)}
          />
          <div className="flex items-center gap-x-2 border px-1 py-1 rounded-md">
            <div
              className={`${
                isList ? "bg-gray-100" : "bg-transparent"
              } px-2 py-1.5 rounded-sm cursor-pointer`}
              onClick={() => setIsList(true)}
            >
              <span className="text-sm">테이블뷰</span>
            </div>
            <div
              className={`${
                isList ? "bg-transparent" : "bg-gray-100"
              } px-2 py-1.5 rounded-sm cursor-pointer`}
              onClick={() => setIsList(false)}
            >
              <span className="text-sm">캘린더뷰</span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {isList ? <NewFamilyTableView /> : <NewFamilyCalendarView />}
      </div>
      <SearchModal
        people={memberList}
        open={open}
        setOpen={setOpen}
        query={query}
        setQuery={setQuery}
      />
    </div>
  );
};

export default NewFamilyMemberSection;
