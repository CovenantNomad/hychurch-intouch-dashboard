import React from "react";

interface SloganProps {}

const Slogan = ({}: SloganProps) => {
  return (
    <div className="flex text-right mt-3">
      <p className="whitespace-pre-line text-2xl font-nanumBrush font-semibold text-cyan-700 tracking-wider">
        {`그리스도 예수안에서 함께 지어져 가느니라`}
      </p>
    </div>
  );
};

export default Slogan;
