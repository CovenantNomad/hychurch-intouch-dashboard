import React, { useState } from "react";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  SearchUsersQuery,
  SearchUsersQueryVariables,
  useSearchUsersQuery,
} from "../../../../graphql/generated";
import MemberSearchBar from "../../../Organisms/Members/MemberSearchBar";
import MemberSearchResult from "../../../Organisms/Members/MemberSearchResult";

interface MemberSearchProps {}

const MemberSearch = ({}: MemberSearchProps) => {
  const [name, setName] = useState<string | null>(null);
  const { isLoading, data, isRefetching, isFetching } = useSearchUsersQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(
    graphlqlRequestClient,
    {
      name,
    },
    {
      enabled: !!name,
    }
  );

  return (
    <div
      className={`${
        data ? "pt-8 md:pt-12" : "pt-48 pb-32"
      } transition-all pb-6 xl:pt-12`}
    >
      <MemberSearchBar setName={setName} />
      <MemberSearchResult isLoading={isFetching} searchResults={data} />
    </div>
  );
};

export default MemberSearch;
