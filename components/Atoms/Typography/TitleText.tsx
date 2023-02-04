import React from "react";

interface TitleTextProps {
  children: React.ReactNode;
}

const TitleText = ({ children }: TitleTextProps) => {
  return <h5 className="text-xl font-bold">{children}</h5>;
};

export default TitleText;
