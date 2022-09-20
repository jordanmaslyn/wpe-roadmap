import "faustnx.config";
import React from "react";
import client from "client";
import { FaustNXProvider } from "../faust-nx/dist/mjs";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FaustNXProvider client={client} pageProps={pageProps}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </FaustNXProvider>
  );
}
