import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {useEffect, useState} from "react";
import {MemberWithTransferOut} from "../../../../interface/user";
import {getWeek, makeWeekAndDate} from "../../../../utils/dateUtils";
import SearchButton from "../../../Atoms/SearchButton";
import SearchModal from "../../../Blocks/SearchModal/SearchModal";
import NewFamilyListItem from "../NewFamilyListItem";
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);

interface NewFamilyMemberSectionProps {
  memberList: MemberWithTransferOut[];
}

const NewFamilyMemberSection = ({memberList}: NewFamilyMemberSectionProps) => {
  //Search State
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  //Grouping Lists
  const [groupList, setGroupList] = useState<
    {
      name: string;
      selection: MemberWithTransferOut[];
    }[]
  >([]);

  useEffect(() => {
    if (memberList) {
      //등록일에 따라 그룹화
      let init: {[index: string]: Array<MemberWithTransferOut>} = {};
      const groupValues = memberList.reduce((acc, current) => {
        acc[getWeek(current.registrationDate || "2022-12-31")] =
          acc[getWeek(current.registrationDate || "2022-12-31")] || [];
        acc[getWeek(current.registrationDate || "2022-12-31")].push(current);
        return acc;
      }, init);

      const groups = Object.keys(groupValues).map((key) => {
        return {name: key, selection: groupValues[key]};
      });

      setGroupList(groups);
    }
  }, [memberList]);

  return (
    <div>
      <div className="flex justify-between items-center py-3">
        <h6 className="text-xl font-bold">새가족 명단</h6>
        <SearchButton
          placeholder={"이름으로 검색하세요"}
          onClickHandler={() => setOpen(true)}
        />
      </div>
      <div className="">
        {groupList
          .sort(
            (a, b) =>
              Number(a.name.split("-")[0]) - Number(b.name.split("-")[0]) ||
              Number(a.name.split("-")[1]) - Number(b.name.split("-")[1]) ||
              Number(a.name.split("-")[2]) - Number(b.name.split("-")[2])
          )
          .map((group) => (
            <div key={group.name} className={`py-4 lg:py-6`}>
              <h1 className="px-2 py-3 mb-4 text-lg font-bold bg-GRAY002">
                {makeWeekAndDate(group.name)}
              </h1>
              <div className="w-full mx-auto grid grid-cols-2 gap-y-12 gap-x-6 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
                {group.selection
                  .sort((a, b) => {
                    if (a.name > b.name) return 1;
                    else if (b.name > a.name) return -1;
                    else return 0;
                  })
                  .map((member) => (
                    <NewFamilyListItem key={member.id} member={member} />
                  ))}
              </div>
            </div>
          ))}
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
