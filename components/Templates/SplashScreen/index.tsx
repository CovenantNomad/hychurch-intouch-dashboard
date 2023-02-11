import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { userState } from "../../../stores/userState";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import { MeDocument } from "../../../graphql/generated";
import { INTOUCH_DASHBOARD_ACCESS_TOKEN } from "../../../constants/constant";
import Layout from "../../Layout/Layout";
import Container from "../../Atoms/Container/Container";

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: SplashScreenProps) => {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userState);

  const getMe = async () => {
    const response = await graphlqlRequestClient.request(MeDocument);
    return response;
  };

  const init = async () => {
    try {
      const token = localStorage.getItem(INTOUCH_DASHBOARD_ACCESS_TOKEN);
      if (token) {
        console.log("refresh");
        const userInfo = JSON.parse(token);
        graphlqlRequestClient.setHeader("authorization", userInfo.accessToken);
        const result = await getMe();
        if (result !== undefined) {
          setUserInfo({
            id: result.me.id,
            name: result.me.name,
            cell: result.me.cell,
            roles: result.me.roles,
          });
        }
        if (router.asPath === "/") {
          router.push("/home");
        }
      } else {
        setUserInfo(null);
        router.push("/");
      }
    } finally {
      onFinished();
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout>
      <Container>
        <div className="flex items-center justify-center h-screen">
          SplashScreen
        </div>
      </Container>
    </Layout>
  );
};

export default SplashScreen;
