import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import graphlqlRequestClient from "../../client/graphqlRequestClient";
import { INTOUCH_DASHBOARD_USER } from "../../constants/constant";
import { useMeQuery } from "../../graphql/generated";
import { userState } from "../../stores/userState";

interface ApploadingProps {
  children: React.ReactNode;
}

const Apploading = ({ children }: ApploadingProps) => {
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false);
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  console.log(user);

  // const initialize = () => {
  //   try {
  //     const jsonValue = localStorage.getItem(INTOUCH_DASHBOARD_USER)
  //     if (jsonValue !== null) {
  //       const userInfo = JSON.parse(jsonValue)
  //       // graphlqlRequestClient.setHeader("authorization", userInfo.accessToken)
  //       setUser({
  //         isLoggedIn: true,
  //         username: "",
  //         userId: "",
  //         accessToken: userInfo.accessToken,
  //       })
  //       setIsLoadingCompleted(true)
  //     } else {
  //       router.push("/")
  //       setIsLoadingCompleted(true)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   initialize()
  // }, [])

  // if (!isLoadingCompleted) {
  //   return null;
  // }

  return <>{children}</>;
};

export default Apploading;
