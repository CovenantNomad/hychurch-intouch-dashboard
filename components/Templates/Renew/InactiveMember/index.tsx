import {useMemo, useState} from "react";
import {MemberWithTransferOut} from "../../../../interface/user";
import BlockContainer from "../../../Atoms/Container/BlockContainer";
import SearchButton from "../../../Atoms/SearchButton";
import Pagination from "../../../Blocks/Pagination/Pagination";
import SearchModal from "../../../Blocks/SearchModal/SearchModal";
import RenewMemberTable from "../../../Organisms/Renew/RenewMemberTable";

interface InactiveMemberProps {
  memberList: MemberWithTransferOut[];
}

const InactiveMember = ({memberList}: InactiveMemberProps) => {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  // pagination state
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * pageSize;

  const sortedMemberList = useMemo(() => {
    return memberList.sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (b.name > a.name) return -1;
      else return 0;
    });
  }, [memberList]);

  return (
    <>
      <BlockContainer firstBlock>
        <div>
          <div className="md:flex md:justify-between md:items-center md:pb-4 md:border-b md:mb-8">
            <div className="pb-3 mb-4 border-b md:border-b-0 md:pb-0 md:mb-0">
              <h6 className="text-xl font-bold">비활동 청년</h6>
              <p className="text-sm mt-1">
                군대, 유학 등으로 임시적으로 활동을 하지 않는 청년{" "}
                <span className="text-red-500">(활동등급: F등급)</span>
              </p>
            </div>
            <SearchButton
              placeholder={"이름으로 검색하세요"}
              onClickHandler={() => setOpen(true)}
            />
          </div>
          <RenewMemberTable
            memberList={sortedMemberList.slice(offset, offset + pageSize)}
          />
          <div className="py-4">
            <p className="sr-only">여백</p>
          </div>
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

export default InactiveMember;
