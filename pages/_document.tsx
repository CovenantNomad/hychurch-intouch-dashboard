import {Head, Html, Main, NextScript} from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="INTOUCH" />

        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Intouch Dashboard" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta name="twitter:image" content="/thumbnail.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
