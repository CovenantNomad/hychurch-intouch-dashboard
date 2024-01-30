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
  const [keyword, setKeyword] = useState<string | null>(null);
  const { isLoading, data, isRefetching, isFetching } = useSearchUsersQuery<
    SearchUsersQuery,
    SearchUsersQueryVariables
  >(
    graphlqlRequestClient,
    {
      keyword,
    },
    {
      enabled: !!keyword,
    }
  );

  return (
    <div
      className={`${
        data ? "pt-8 md:pt-12" : "pt-48 pb-32"
      } min-h-screen transition-all pb-6 xl:pt-12`}
    >
      <MemberSearchBar setKeyword={setKeyword} />
      <MemberSearchResult isLoading={isFetching} searchResults={data} />
    </div>
  );
};

export default MemberSearch;
