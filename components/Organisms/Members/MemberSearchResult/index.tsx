import React from "react";
import { SearchUsersQuery } from "../../../../graphql/generated";
import Slogan from "../../../Atoms/Slogan/Slogan";
import Spinner from "../../../Atoms/Spinner";
import MemberListItem from "../MemberListItem";

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
        <Spinner />
      ) : (
        <>
          {searchResults === undefined ? (
            <div className="flex justify-end">
              <Slogan />
            </div>
          ) : (
            <div className="pt-8">
              {searchResults?.findUsers.nodes.map((user) => (
                <MemberListItem key={user.id} member={user} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MemberSearchResult;
