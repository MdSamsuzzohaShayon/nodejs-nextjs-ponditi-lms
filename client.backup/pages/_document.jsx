import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <!-- Google Tag Manager --> */}
        <script src="/js/gtm_head.js" />
        {/* <!-- End Google Tag Manager --> */}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <body>
        <script src="/js/gtm_body.js" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
