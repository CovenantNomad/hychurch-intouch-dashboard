import React from "react";

interface SubTitleTextProps {
  children: React.ReactNode;
}

const SubTitleText = ({ children }: SubTitleTextProps) => {
  return <span className="text-sm text-gray-500">{children}</span>;
};

export default SubTitleText;
