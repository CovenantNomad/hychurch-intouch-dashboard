import React from "react";

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  transparent?: boolean;
}

const HeaderTitle = ({ title }: HeaderProps) => {
  return <h4 className="text-2xl font-bold tracking-wide">{title}</h4>;
};

const Header = ({ title, children, transparent }: HeaderProps) => {
  return (
    <header
      className={`flex justify-between items-center mb-8 py-4 px-4 md:py-7 md:px-6 lg:px-8 ${
        transparent ? "bg-inherit" : "bg-white"
      }`}
    >
      <HeaderTitle title={title} />
      {children}
    </header>
  );
};

export default Header;