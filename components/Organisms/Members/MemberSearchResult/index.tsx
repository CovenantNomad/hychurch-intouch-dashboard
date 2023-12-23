import React from "react";
import { SearchUsersQuery } from "../../../../graphql/generated";
import Slogan from "../../../Atoms/Slogan/Slogan";
import Spinner from "../../../Atoms/Spinner";
import MemberListItem from "../MemberListItem";
import NoSearchResult from "../../../Blocks/NoSearchResult";

interface SearchResultProps {
  isLoading: boolean;
  searchResults: SearchUsersQuery | undefined;
}

const MemberSearchResult = ({
  isLoading,
  searchResults,
}: SearchResultProps) => {
  return (
    <div>
      {isLoading ? (
        <div className='mt-8 space-y-2'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="animate-pulse space-y-6 py-10 px-10 rounded-xl bg-[#F7F7F7]">
              <div className="h-1.5 w-1/3 bg-slate-200 rounded"></div>
              <div className="h-1.5 w-full bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {searchResults === undefined ? (
            <div className="flex justify-end">
              <Slogan />
            </div>
          ) : (
            <div className="pt-8">
              {searchResults && searchResults.findUsers.nodes.length !== 0 ? (
                <div className="space-y-2">
                  {searchResults.findUsers.nodes.map((user) => (
                    <MemberListItem
                      key={user.id}
                      member={user}
                    />
                  ))}
                </div>
              ) : (
                <NoSearchResult />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemberSearchResult;
