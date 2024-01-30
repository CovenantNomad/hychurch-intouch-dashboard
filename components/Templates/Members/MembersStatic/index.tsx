import React from "react";
import graphlqlRequestClient from "../../../../client/graphqlRequestClient";
import {
  FindUsersQuery,
  FindUsersQueryVariables,
  useFindUsersQuery,
} from "../../../../graphql/generated";
import {
  CursorArrowRaysIcon,
  EnvelopeOpenIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import CompareStat from "../../../Atoms/Stats/CompareStat";
import SimpleStat from "../../../Atoms/Stats/SimpleStat";
import MemberContainer from "../../../Organisms/Members/MemberContainer";

interface MembersStaticProps {}

const MembersStatic = ({}: MembersStaticProps) => {
  const { isLoading, data } = useFindUsersQuery<
    FindUsersQuery,
    FindUsersQueryVariables
  >(
    graphlqlRequestClient,
    {
      keyword: "",
      limit: 100,
      offset: 0,
    },
    {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000 * 24,
    }
  );

  const stats = [
    {
      id: 1,
      name: "이번주 등록청년",
      stat: 12,
      icon: UsersIcon,
      change: 6,
      changeType: "increase",
    },
    {
      id: 2,
      name: "이번달 등록청년",
      stat: 47,
      icon: EnvelopeOpenIcon,
      change: 12,
      changeType: "increase",
    },
    {
      id: 3,
      name: "이번해 등록청년",
      stat: 112,
      icon: CursorArrowRaysIcon,
      change: 112,
      changeType: "increase",
    },
  ];

  const numberStats = [
    { name: "총원", number: 1200 },
    { name: "활동청년", number: 1000 },
    { name: "비활동청년", number: 200 },
  ];

  return (
    <div>
      <MemberContainer marginBottom>
        <CompareStat stats={stats} header={"인터치 등록 청년 현황"} />
      </MemberContainer>
      <MemberContainer>
        <SimpleStat stats={numberStats} header={"인터치 청년 현황"} />
      </MemberContainer>
    </div>
  );
};

export default MembersStatic;
