import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
}

const SectionContainer = ({ children }: SectionContainerProps) => {
  return <div className="bg-white rounded-md py-5 px-5">{children}</div>;
};

export default SectionContainer;
