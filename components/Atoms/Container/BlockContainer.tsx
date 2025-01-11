import React from "react";

interface BlockContainerProps {
  children: React.ReactNode;
  firstBlock?: boolean;
  roundedNone?: boolean;
}

const BlockContainer = ({
  children,
  firstBlock,
  roundedNone,
}: BlockContainerProps) => {
  return (
    <div
      className={`py-5 px-3 ${firstBlock && "mt-0"} ${
        roundedNone ? "rounded-none" : "rounded-md"
      } mt-2 bg-white border border-slate-200 shadow-sm lg:px-5`}
    >
      {children}
    </div>
  );
};

export default BlockContainer;
