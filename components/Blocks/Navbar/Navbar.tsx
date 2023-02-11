import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { menu } from "../../../constants/menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../stores/userState";

const Navbar = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userState);
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 1,
      },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  return (
    <>
      <div className="h-20 flex justify-between items-center px-4 md:hidden">
        <div
          className={`${isOpen && "delay-75 rotate-45"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block w-6 h-[1px] rounded-full bg-black mb-[6px] transition-all ${
              isOpen && "delay-[400] translate-y-[7px]"
            }`}
          ></span>
          <span
            className={`block w-6 h-[1px] rounded-full bg-black mb-[6px] ${
              isOpen && "w-0"
            }`}
          ></span>
          <span
            className={`block w-6 h-[1px] rounded-full bg-black ${
              isOpen && "delay-[400] rotate-90 -translate-y-[7px]"
            }`}
          ></span>
        </div>
        <h1>INTOUCH</h1>
        <h1>{userInfo?.name}</h1>
      </div>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            className={`h-full w-full absolute top-16 left-0 bg-black z-[2000] flex flex-col md:hidden`}
            variants={variants}
            animate={isOpen ? "open" : "closed"}
          >
            {menu.map((item) => (
              <Link href={item.route} key={item.id}>
                <a
                  className={`group w-full flex items-center py-6 px-4 hover:bg-navy-blue/40 ${
                    router.pathname === item.route && "bg-navy-blue"
                  }`}
                >
                  <svg
                    className={`w-7 h-7 fill-gray-300 group-hover:fill-white mr-3`}
                    viewBox="0 0 20 20"
                  >
                    <path d={item.svg}></path>
                  </svg>
                  <span className="block w-full text-sm text-gray-300 font-notosans group-hover:text-white">
                    {item.pathname}
                  </span>
                </a>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default Navbar;
