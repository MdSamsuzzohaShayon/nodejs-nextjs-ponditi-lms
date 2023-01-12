/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
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
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
