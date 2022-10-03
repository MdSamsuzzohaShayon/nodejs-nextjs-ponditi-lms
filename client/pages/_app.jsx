/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import { Provider } from 'react-redux';
import store from '../redux/store';
import '../styles/globals.scss';



export default function MyApp(props) {
  const { Component, pageProps } = props;

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
