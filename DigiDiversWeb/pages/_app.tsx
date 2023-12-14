import '/styles/global/globals.scss';

import Head from 'next/head';
import type { AppProps } from 'next/app';

import { RecoilRoot } from 'recoil';
import { ContextProvider, Navbar } from '../components';

require('@solana/wallet-adapter-react-ui/styles.css');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DigiDivers Platform</title>
        <meta
          name="description"
          content="A webapp"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <RecoilRoot>
        <ContextProvider >
          <Navbar />
          <Component {...pageProps} />
        </ContextProvider>
      </RecoilRoot>
    </>
  );
}
