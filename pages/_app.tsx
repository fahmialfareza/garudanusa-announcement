import "../styles/globals.css";
import "nprogress/nprogress.css";
import "../styles/nprogress.css";
import { useEffect } from "react";
import type { AppProps } from "next/app";
import Router from "next/router";
import { Provider } from "react-redux";
import Head from "next/head";
import NProgress from "nprogress";

import store from "../redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackgroundImage from "../components/BackgroundImage";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>PENGUMUMAN SELEKSI GARUDA NUSA</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>

      <BackgroundImage />

      <Navbar />

      <Component {...pageProps} />

      <Footer />
    </Provider>
  );
}
