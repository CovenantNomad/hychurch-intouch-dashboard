import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return <h6 className="text-xl font-bold text-BLACK pb-5">{children}</h6>;
};

export default SectionTitle;
