import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>ICPC Grind</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="A focused platform for ICPC preparation." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ToastContainer/>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
