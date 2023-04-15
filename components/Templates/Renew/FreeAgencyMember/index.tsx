import React, { useEffect, useState } from "react";
import { MemberWithTransferOut } from "../../../../interface/user";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import RenewMemberListItem from "../../../Organisms/Renew/RenewMemberListItem";
import SearchModal from "../../../Blocks/SearchModal/SearchModal";

interface FreeAgencyMemberProps {
  memberList: MemberWithTransferOut[];
}

const FreeAgencyMember = ({ memberList }: FreeAgencyMemberProps) => {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <BlockContainer firstBlock>
        <div>
          <div className="flex justify-between items-center">
            <h6 className="text-xl font-bold pb-6">셀 미참여 활동청년</h6>
            <button
              onClick={() => setOpen(true)}
              className="hidden sm:flex items-center w-72 text-left space-x-3 px-4 h-9 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-none text-slate-300 dark:text-slate-400"
                aria-hidden="true"
              >
                <path d="m19 19-3.5-3.5"></path>
                <circle cx="11" cy="11" r="6"></circle>
              </svg>
              <span>Quick search...</span>
            </button>
          </div>
          <div className="w-full mx-auto grid grid-cols-2 gap-y-12 gap-x-6 text-center mt-8 sm:grid-cols-3 md:grid-cols-4 lg:mx-0 lg:max-w-none lg:grid-cols-5 xl:grid-cols-6">
            {memberList
              .sort((a, b) => {
                if (a.name > b.name) return 1;
                else if (b.name > a.name) return -1;
                else return 0;
              })
              .map((member) => (
                <RenewMemberListItem key={member.id} member={member} />
              ))}
          </div>
        </div>
        <SearchModal
          people={memberList}
          open={open}
          setOpen={setOpen}
          query={query}
          setQuery={setQuery}
        />
      </BlockContainer>
    </>
  );
};

export default FreeAgencyMember;
