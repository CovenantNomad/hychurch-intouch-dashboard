import React from "react";
import { useQuery } from "react-query";
import { getBarnabas } from "../../../../firebase/barnabas";
import SectionContainer from "../../../Atoms/SectionContainer";

interface MentorListSectionProps {}

const MentorListSection = ({}: MentorListSectionProps) => {
  const { isLoading, data } = useQuery("getBarnabas", getBarnabas);

  console.log(data);
  return <SectionContainer>MentorListSection</SectionContainer>;
};

export default MentorListSection;
