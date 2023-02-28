import React from "react";

interface FooterProps {
  bgWhite?: boolean;
}

const Footer = ({ bgWhite }: FooterProps) => {
  return (
    <div
      className={`flex justify-center pt-14 pb-20 px-4 mt-2  ${
        bgWhite ? "bg-white" : "bg-[#eeeeee]"
      } lg:px-8 xl:bg-white`}
    >
      <p className="text-black font-bold text-sm">SHALOM INTOUCH</p>
    </div>
  );
};

export default Footer;
