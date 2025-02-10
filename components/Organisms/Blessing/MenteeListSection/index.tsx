import {useState} from "react";
import {MemberWithTransferOut} from "../../../../interface/user";
import SearchButton from "../../../Atoms/SearchButton";
import SearchModal from "../../../Blocks/SearchModal/SearchModal";
import BarnabaMatching from "./_components/BarnabaMatching";
import MenteeTable from "./_components/MenteeTable";

interface MenteeListSectionProps {
  memberList: MemberWithTransferOut[];
  isLoading: boolean;
}

const MenteeListSection = ({memberList, isLoading}: MenteeListSectionProps) => {
  //Search State
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="flex justify-between items-center py-3 mb-8">
        <h6 className="text-lg font-medium">멘티 명단</h6>
        <div className="flex items-center space-x-4">
          <SearchButton
            placeholder={"이름으로 검색하세요"}
            onClickHandler={() => setOpen(true)}
          />
          <BarnabaMatching members={memberList} />
        </div>
      </div>
      <MenteeTable members={memberList} isLoading={isLoading} />
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

export default MenteeListSection;
