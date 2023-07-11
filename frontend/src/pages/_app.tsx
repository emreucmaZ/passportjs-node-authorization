import { persistor, store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoginPage from "./login";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import LoggedIn from "@/components/pages/LoggedIn";

export default function App({ Component, pageProps }: AppProps) {

  const router = useRouter();
  const { pathname } = router;

  // `pathname` değerini kullanabilirsiniz
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {store.getState().user.token ? pathname != "/login" ? <Layout Page={<Component {...pageProps} />} /> : <LoggedIn router={router} />: <LoginPage/>}
        </PersistGate>
      </ReduxProvider>
    </>
  );
}
