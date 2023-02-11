import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// state
import { useRecoilValue } from "recoil";
import { userState } from "../../../stores/userState";
// fetch
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import { INTOUCH_DASHBOARD_ACCESS_TOKEN } from "../../../constants/constant";
// menu
import { menu } from "../../../constants/menu";

const Sidebar = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userState);

  const onLogOutHandler = () => {
    localStorage.removeItem(INTOUCH_DASHBOARD_ACCESS_TOKEN);
    graphlqlRequestClient.setHeader("authorization", "");
    router.push("/");
  };

  console.log(userInfo);

  return (
    <div
      className={`hidden fixed left-0 top-0 bottom-0 flex-col flex-nowrap overflow-hidden z-[2000] px-6 transition-all duration-300 bg-black md:flex md:shadow-xl md:w-60 md:justify-between `}
    >
      <div>
        <div className="py-12">
          <h1 className="text-xl font-bold text-white">INTOUCH CHURCH</h1>
          <span className="block text-gray-400 text-sm">
            {new Date().toLocaleDateString("kr-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              weekday: "short",
            })}
          </span>
        </div>
        <div className="space-y-4">
          {menu.map((item) => (
            <Link href={item.route} key={item.id}>
              <a
                className={`group w-full flex items-center py-2 px-3 hover:bg-navy-blue/40 ${
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
        </div>
      </div>
      <div>
        <div
          className={`group w-full flex items-center py-2 px-3 hover:bg-navy-blue/40 cursor-pointer`}
          onClick={onLogOutHandler}
        >
          <svg
            className={`w-7 h-7 fill-gray-300 group-hover:fill-white mr-3`}
            viewBox="0 0 20 20"
          >
            <path d="M12.522,10.4l-3.559,3.562c-0.172,0.173-0.451,0.176-0.625,0c-0.173-0.173-0.173-0.451,0-0.624l3.248-3.25L8.161,6.662c-0.173-0.173-0.173-0.452,0-0.624c0.172-0.175,0.451-0.175,0.624,0l3.738,3.736C12.695,9.947,12.695,10.228,12.522,10.4 M18.406,10c0,4.644-3.764,8.406-8.406,8.406c-4.644,0-8.406-3.763-8.406-8.406S5.356,1.594,10,1.594C14.643,1.594,18.406,5.356,18.406,10M17.521,10c0-4.148-3.374-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.147,17.521,17.521,14.147,17.521,10"></path>
          </svg>
          <span className="block w-full text-sm text-gray-300 font-notosans group-hover:text-white">
            Log out
          </span>
        </div>
        <div className="h-[1px] bg-slate-600 w-full my-4"></div>
        <div className="pb-12 px-3">
          <span className="text-sm text-white tracking-wider block mb-1">
            Logged-in User
          </span>
          <span className="text-white tracking-wider">{userInfo?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
