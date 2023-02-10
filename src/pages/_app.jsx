import '@/styles/global.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import StoreProvider from 'utils/store';
import axios from 'axios';
axios.defaults.baseURL = 'https://arizona-ecommerce.vercel.app/api';

function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push('/unauthorized?message=login required')
      }
  });
  if(status === 'loading') return <h1>Loading...</h1>

  return children;
}

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {
          Component.auth? 
            <Auth><Component {...pageProps} /></Auth> 
          : <Component {...pageProps} />
        }
      </StoreProvider>
    </SessionProvider>
  )
}
