import "../styles/globals.css";
import React, { Suspense } from "react";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import RootApp from "../components/Templates/RootApp";
import ErrorBoundary from "../components/Templates/ErrorBoundary";
import Custom404 from "../components/Templates/Custom404";

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
          <ErrorBoundary fallback={<Custom404 />}>
            <Suspense fallback={<div>Loading...</div>}>
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
            </Suspense>
          </ErrorBoundary>
        </RootApp>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
