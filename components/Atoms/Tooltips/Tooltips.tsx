import React from "react";

interface TooltipsProps {
  text: string;
}

const Tooltips = ({ text }: TooltipsProps) => {
  return (
    <div className="mt-1">
      <p className="text-sm py-1 px-2 bg-teal-600 text-white rounded-lg">
        {text}
      </p>
    </div>
  );
};

export default Tooltips;
