import type {AppProps} from "next/app";
import {Suspense, useEffect} from "react";
import {Toaster} from "react-hot-toast";
import {QueryClient, QueryClientProvider} from "react-query";
import {RecoilRoot} from "recoil";
import Custom404 from "../components/Templates/Custom404";
import ErrorBoundary from "../components/Templates/ErrorBoundary";
import RootApp from "../components/Templates/RootApp";
import "../styles/globals.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({Component, pageProps}: AppProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((error) => {
        console.error("Service Worker 등록 실패:", error);
      });
    }
  }, []);

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
