import React from 'react';

interface BlockCardContainerProps {
  children: React.ReactNode;
}

const BlockCardContainer = ({ children }: BlockCardContainerProps) => {
  return (
    <div
      className={`w-full py-5 px-3 mt-2 rounded-md bg-white border border-slate-200 shadow-sm lg:px-5`}
    >
      {children}
    </div>
  );
};

export default BlockCardContainer;
