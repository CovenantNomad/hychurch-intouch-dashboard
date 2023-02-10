import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { useLayoutEffect } from "react";
import { INTOUCH_DASHBOARD_USER } from "../constants/constant";
import graphlqlRequestClient from "../client/graphqlRequestClient";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Apploading from "../components/Layout/Apploading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useLayoutEffect(() => {
    const token = localStorage.getItem(INTOUCH_DASHBOARD_USER);
    if (token) {
      console.log("refresh");
      const userInfo = JSON.parse(token);
      graphlqlRequestClient.setHeader("authorization", userInfo.accessToken);
      if (router.asPath === "/") {
        router.push("/home");
      }
    } else {
      router.push("/");
    }
  }, []);

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "#fff",
                color: "#222",
              },
            },
            error: {
              style: {
                background: "#fff",
                color: "#222",
              },
            },
          }}
        />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
