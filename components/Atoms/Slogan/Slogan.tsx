import React from "react";

interface SloganProps {}

const Slogan = ({}: SloganProps) => {
  return (
    <div className="flex text-right mt-3">
      <p className="whitespace-pre-line text-2xl font-nanumBrush font-semibold text-cyan-700">{`네 입을 크게열라\n내가 채우리라`}</p>
    </div>
  );
};

export default Slogan;