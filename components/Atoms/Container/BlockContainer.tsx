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
      className={`py-3 px-2 ${firstBlock && "mt-0"} ${
        roundedNone ? "rounded-none" : "rounded-md"
      } mt-2 bg-white border border-slate-200 shadow-sm md:p-5`}
    >
      {children}
    </div>
  );
};

export default BlockContainer;
