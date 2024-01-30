import { useRouter } from "next/router";
import React from "react";

interface Custom404Props {}

const Custom404 = ({}: Custom404Props) => {
  const router = useRouter();
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h2 className="text-4xl">Oops, there is an error!</h2>
      <p className="text-2xl mt-1">인터치 개발팀에 연락해주세요</p>
      <div>
        <button
          type="button"
          onClick={() => router.push("/home")}
          className={"bg-blue-600 px-7 py-4 mt-4 text-lg font-bold text-white "}
        >
          홈으로
        </button>
      </div>
    </div>
  );
};

export default Custom404;
