import React from "react";

interface BlockContainerProps {
  children: React.ReactNode;
  firstBlock?: boolean;
}

const BlockContainer = ({ children, firstBlock }: BlockContainerProps) => {
  return (
    <div
      className={`py-5 px-3 ${
        firstBlock && "mt-0"
      } mt-2 rounded-md bg-white border border-slate-200 shadow-sm lg:px-5`}
    >
      {children}
    </div>
  );
};

export default BlockContainer;
