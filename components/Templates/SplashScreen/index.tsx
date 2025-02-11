import Image from "next/image";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSetRecoilState} from "recoil";
import graphlqlRequestClient from "../../../client/graphqlRequestClient";
import {INTOUCH_DASHBOARD_ACCESS_TOKEN} from "../../../constants/constant";
import {MeDocument} from "../../../graphql/generated";
import {userState} from "../../../stores/userState";
import Container from "../../Atoms/Container/Container";
import Layout from "../../Layout/Layout";

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({onFinished}: SplashScreenProps) => {
  const router = useRouter();
  const setUserInfo = useSetRecoilState(userState);

  const init = async () => {
    try {
      const token = localStorage.getItem(INTOUCH_DASHBOARD_ACCESS_TOKEN);
      if (token) {
        console.log("refresh");
        const userInfo = JSON.parse(token);
        graphlqlRequestClient.setHeader("authorization", userInfo.accessToken);
        const result = await graphlqlRequestClient.request(MeDocument);
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
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="relative w-full max-w-lg aspect-square">
            <Image
              src={"/images/splashscreen_002.webp"}
              alt=""
              layout="fill"
              className="rounded-lg"
            />
          </div>
          <h6 className="animate-pulse mt-2 text-center">
            데시보드도 지어져 가는 중입니다
            <br />
            잠시만 기다려주세요
          </h6>
        </div>
      </Container>
    </Layout>
  );
};

export default SplashScreen;
