import React from "react";
import LinkAndAvatarMenu from "../Menu/LinkAndAvatarMenu";

interface SubmitListProps {
  title: string;
}

const SubmitList = ({ title }: SubmitListProps) => {
  return (
    <div>
      <LinkAndAvatarMenu title={title} />
    </div>
  );
};

export default SubmitList;
