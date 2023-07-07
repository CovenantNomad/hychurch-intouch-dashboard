import React from "react";
import LinkAndAvatarMenu from "../Menu/LinkAndAvatarMenu";

interface SubmitListProps {
  title: string;
}

const SubmitList = ({ title }: SubmitListProps) => {
  return <LinkAndAvatarMenu title={title} />;
};

export default SubmitList;
