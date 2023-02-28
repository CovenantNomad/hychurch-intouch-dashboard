import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { menu } from "../../../constants/menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userState } from "../../../stores/userState";
import { NavbarVariants } from "../../../styles/animation";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import { INTOUCH_DASHBOARD_ACCESS_TOKEN } from "../../../constants/constant";

const Navbar = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userState);
  const [isOpen, setIsOpen] = useState(false);

  const onLogOutHandler = useCallback(() => {
    localStorage.removeItem(INTOUCH_DASHBOARD_ACCESS_TOKEN);
    graphlqlRequestClient.setHeader("authorization", "");
    router.push("/");
  }, [router]);

  return (
    <>
      <div className="hidden w-full lg:flex lg:items-center lg:px-8 lg:py-5">
        <h1 className="inline-block w-fit text-lg">INTOUCH CHURCH</h1>
        <div className="flex flex-1 justify-between pl-4">
          <div className="flex">
            {menu.map((item) => (
              <Link href={item.route} key={item.id}>
                <a
                  className={`py-1 px-3 ${
                    router.pathname === item.route && "bg-blue"
                  }`}
                >
                  <span className="inline-block">{item.pathname}</span>
                </a>
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <button onClick={onLogOutHandler}>
              <span className="inline-block text-sm mr-8">로그아웃</span>
            </button>
            <span className="inline-block text-sm">{userInfo?.name}</span>
          </div>
        </div>
      </div>
      <div className="h-20 flex justify-between items-center px-4 lg:hidden">
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
            variants={NavbarVariants}
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
