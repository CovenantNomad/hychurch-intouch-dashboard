import React from "react";

interface BlockContainerProps {
  children: React.ReactNode;
  firstBlock?: boolean;
}

const BlockContainer = ({ children, firstBlock }: BlockContainerProps) => {
  return (
    <div
      className={`py-5 px-5 ${
        firstBlock && "mt-0"
      } mt-2 rounded-md bg-white border border-slate-200 shadow-sm`}
    >
      {children}
    </div>
  );
};

export default BlockContainer;
