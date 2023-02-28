import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  bgWhite?: boolean;
}

const Container = ({ children, bgWhite }: ContainerProps) => {
  return (
    <section
      className={`px-4 md:px-6 lg:px-8 xl:px-0 ${bgWhite && "bg-white"}`}
    >
      {children}
    </section>
  );
};

export default Container;
