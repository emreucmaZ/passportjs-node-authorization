import { persistor, store } from '@/redux/store';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {Provider as ReduxProvider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </ReduxProvider>
    </>
  )
}
