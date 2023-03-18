import React from "react";

interface FooterProps {}

const Footer = ({}: FooterProps) => {
  return (
    <div className={`flex justify-center pt-14 pb-20 bg-white`}>
      <p className="text-black font-bold text-sm">SHALOM INTOUCH</p>
    </div>
  );
};

export default Footer;
