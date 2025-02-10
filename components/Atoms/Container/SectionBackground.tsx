import React from "react";

interface SectionBackgroundProps {
  children: React.ReactNode;
}

const SectionBackground = ({children}: SectionBackgroundProps) => {
  return <div className="w-full bg-BACKGROUND pb-2 mt-6">{children}</div>;
};

export default SectionBackground;
