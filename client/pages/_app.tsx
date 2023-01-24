// Typescript
/*
import React from 'react';
import '../styles/globals.scss';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
*/

// Javascript
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import Head from 'next/head';
import { Provider } from 'react-redux';
// import TagManager from 'react-gtm-module';
import store from '../redux/store';
import '../styles/globals.scss';

// const tagManagerArgs = {
//   gtmId: process.env.NEXT_PUBLIC_GTM_ID
// }

export default function MyApp(props) {
  const { Component, pageProps } = props;

  // useEffect(()=>{
  //   TagManager.initialize(tagManagerArgs);
  // }, []);

  return (
    <div>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

