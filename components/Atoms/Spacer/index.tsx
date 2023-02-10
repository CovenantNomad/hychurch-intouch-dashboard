import React from "react";

interface SpacerProps {
  background?: boolean;
}

const Spacer = ({ background }: SpacerProps) => {
  return <div className={`h-8 ${background ? "bg-white" : "bg-inherit"}`} />;
};

export default Spacer;
