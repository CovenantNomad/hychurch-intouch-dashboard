import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
}

const SectionContainer = ({ children }: SectionContainerProps) => {
  return <section className={`px-2 pt-2`}>{children}</section>;
};

export default SectionContainer;
