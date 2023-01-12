import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
        <Head>
        {/* <!-- Google Tag Manager --> */}
        {/* <Script>
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-M698T4G');
        </Script> */}
        {/* <!-- End Google Tag Manager --> */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        {/* <!-- Google Tag Manager --> */}
        {/* <Script>
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-M698T4G');
        </Script> */}
        {/* <!-- End Google Tag Manager --> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
