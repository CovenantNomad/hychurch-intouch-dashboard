import React from "react";

interface MemberContainerProps {
  children: React.ReactNode;
  marginBottom?: boolean;
}

const MemberContainer = ({ children, marginBottom }: MemberContainerProps) => {
  return (
    <div
      className={`pt-6 pb-16 px-4 ${marginBottom && "mb-4"} bg-white lg:pt-12`}
    >
      {children}
    </div>
  );
};

export default MemberContainer;
