import Head from 'next/head'
import Script from 'next/script'

export default function MetaHead() {
  return (
    <>
      <Head>
        <title>Giftee.io</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Gift exchanges with friends and family made easy!"
        />

        <meta property="og:image" content="https://i.imgur.com/RqxiclJ.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Giftee Preview" />
        <meta property="og:logo" content="https://i.imgur.com/SNeNujX.png" />
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
    </>
  );
}
