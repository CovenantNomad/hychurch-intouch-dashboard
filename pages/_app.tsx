import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import RootApp from "../components/Templates/RootApp";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RootApp>
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
        </RootApp>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
