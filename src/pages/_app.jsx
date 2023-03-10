import '@/styles/global.css';
import { SessionProvider } from 'next-auth/react';
import StoreProvider from 'utils/store';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  )
}
