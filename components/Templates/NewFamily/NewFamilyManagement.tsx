import React, { useEffect, useState } from "react";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {
  FindNewFamilyCellQuery,
  FindNewFamilyCellQueryVariables,
  RoleType,
  useFindNewFamilyCellQuery,
} from "../../../graphql/generated";
import { Member } from "../../../interface/user";
import NewFamilyMemberSection from "../../Organisms/NewFamily/NewFamilyMemberSection";
import NewFamilyTeamSection from "../../Organisms/NewFamily/NewFamilyTeamSection";

interface NewFamilyManagementProps {}

const NewFamilyManagement = ({}: NewFamilyManagementProps) => {
  const [teamList, setTeamList] = useState<Member[]>([]);
  const [newFamilyList, setNewFamilyList] = useState<Member[]>([]);
  const { isLoading, data } = useFindNewFamilyCellQuery<
    FindNewFamilyCellQuery,
    FindNewFamilyCellQueryVariables
  >(
    graphlqlRequestClient,
    {
      id: 39,
    },
    {
      staleTime: 10 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (data) {
      const teamTemp = data.findCell.leaders.filter((item) =>
        item.roles.includes(RoleType.ViceLeader)
      );
      setTeamList(teamTemp);
      const newFamilyTemp = data.findCell.members.filter(
        (item) => item.roles.length === 0
      );
      setNewFamilyList(newFamilyTemp);
    }
  }, [data]);

  return (
    <>
      <div className="bg-white rounded-md py-5 px-5">
        <NewFamilyTeamSection teamList={teamList} />
      </div>
      <div className="bg-white rounded-md py-5 px-5 mt-2">
        <NewFamilyMemberSection memberList={newFamilyList} />
      </div>
    </>
  );
};

export default NewFamilyManagement;
