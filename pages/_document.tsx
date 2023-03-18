import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
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
