import React, { useState } from "react";
import { MemberWithTransferOut } from "../../../../interface/user";
import MenteeListItem from "../MenteeListItem";
import SearchButton from "../../../Atoms/SearchButton";
import SearchModal from "../../../Blocks/SearchModal/SearchModal";

interface MenteeListSectionProps {
  memberList: MemberWithTransferOut[];
}

const MenteeListSection = ({ memberList }: MenteeListSectionProps) => {
  //Search State
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="flex justify-between items-center py-3 mb-8">
        <h6 className="text-xl font-bold">멘티 명단</h6>
        <SearchButton 
          placeholder={'이름으로 검색하세요'}
          onClickHandler={() => setOpen(true)}
        />
      </div>
      <div className="w-full mx-auto grid grid-cols-2 gap-y-12 gap-x-6 text-center sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
        {memberList
          .sort((a, b) => {
            if (a.name > b.name) return 1;
            else if (b.name > a.name) return -1;
            else return 0;
          })
          .map((member) => (
            <MenteeListItem key={member.id} member={member} />
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

export default MenteeListSection;
