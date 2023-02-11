import React from "react";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  FindBlessingCellQuery,
  FindBlessingCellQueryVariables,
  useFindBlessingCellQuery,
} from "../../../graphql/generated";
import Spinner from "../../Atoms/Spinner";
import Table from "../../Blocks/Table/Table";

interface BlessingMemberListProps {}

const BlessingMemberList = ({}: BlessingMemberListProps) => {
  const { isLoading, data } = useFindBlessingCellQuery<
    FindBlessingCellQuery,
    FindBlessingCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: Number("39"),
    },
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  return (
    <div>
      {isLoading ? <Spinner /> : <Table members={data?.findCell.members} />}
    </div>
  );
};

export default BlessingMemberList;
