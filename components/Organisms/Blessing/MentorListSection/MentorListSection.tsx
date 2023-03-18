import React from "react";
import { useQuery } from "react-query";
import { getBarnabas } from "../../../../firebase/barnabas";
import SectionTitle from "../../../Atoms/Typography/SectionTitle";

interface MentorListSectionProps {}

const MentorListSection = ({}: MentorListSectionProps) => {
  const { isLoading, data } = useQuery("getBarnabas", getBarnabas);

  console.log(data);
  return <SectionTitle>바나바 현황</SectionTitle>;
};

export default MentorListSection;
