import React, { useMemo, useState } from "react";
import { MemberWithTransferOut } from "../../../../interface/user";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import SearchModal from "../../../Blocks/SearchModal/SearchModal";
import RenewMemberTable from "../../../Organisms/Renew/RenewMemberTable";
import Pagination from "../../../Blocks/Pagination/Pagination";

interface FreeAgencyMemberProps {
  memberList: MemberWithTransferOut[];
}

const FreeAgencyMember = ({ memberList }: FreeAgencyMemberProps) => {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  // pagination state
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const offset = (currentPage - 1) * pageSize

  const sortedMemberList = useMemo(() => {
    return memberList.sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (b.name > a.name) return -1;
      else return 0;
    })
  }, [memberList])

  return (
    <>
      <BlockContainer firstBlock>
        <div>
          <div className="md:flex md:justify-between md:items-center md:pb-4 md:border-b md:mb-8">
            <div className="pb-3 mb-4 border-b md:border-b-0 md:pb-0 md:mb-0">
              <h6 className="text-xl font-bold">셀 미참여 활동청년</h6>
              <p className="text-sm md:text-base">인터치예배는 드리지만 셀모임에 참석하지 않는 청년들입니다</p>
            </div>
            <div className="">
              <button
                onClick={() => setOpen(true)}
                className="w-full flex items-center text-left space-x-3 px-4 h-9 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700 md:w-72"
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
                <span>이름을 검색하세요</span>
              </button>
            </div>
          </div>
          <RenewMemberTable 
            memberList={sortedMemberList.slice(offset, offset + pageSize)}
          />
          <div className="py-4"><p className="sr-only">여백</p></div>
          <Pagination 
            pageSize={pageSize}
            setPageSize={setPageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalCount={memberList.length}
          />
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
