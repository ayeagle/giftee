import Head from "next/head";
import Script from "next/script";
import { ReactNode } from "react";

// import  Metadata } from 'next'

export const metadata = {
  title: "WAHAHAHHA",
  description: "JHASKJHSADHKJ",
};

export default function MetaHead({ children }: { children: ReactNode }) {
  return (
    <>
      <Head>
        <title>Giftee.io</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Gift exchanges with friends and family made easy!"
        />

        <meta property="og:image" content="https://imgur.com/Th0d4eD" />
        {/* <meta property="og:image:type" content="image/png" /> */}
        {/* <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Giftee Preview" /> */}
        {/* <meta property="og:logo" content="https://i.imgur.com/tcO8WIR.png" /> */}
        <link rel="icon" type="image/png" href="https://i.imgur.com/tcO8WIR.png" />

        <meta property="og:url" content={"https://www.giftee.io/explore"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={"Giftee.io"} />
        <meta property="og:description" content={"Gift exchanges with friends and family made easy!"} />
        {/* <meta property="og:image" content={"https://i.imgur.com/SNeNujX.png"} /> */}
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Giftee Preview" />
        <meta property="og:site_name" content={"Giftee.io"} />

        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8478961908713976"
          crossOrigin="anonymous"
        ></Script>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8408575015165543"
          crossOrigin="anonymous"
        ></Script>
      </Head>
      {children}

    </>
  );
}
