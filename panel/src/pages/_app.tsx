import { persistor, store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoginPage from "./login";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import LoggedIn from "@/components/pages/LoggedIn";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { isAuthorized } from "@/helpers";
import { ThemeProvider, createTheme } from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;

  const appTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });

  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={appTheme}>
            {store.getState().user.token ? (

              pathname != "/login" ? (
                <Layout Page={<Component {...pageProps} />} />
              ) : (
                <LoggedIn router={router} />
              )
            ) : (
              <LoginPage />
            )}
          </ThemeProvider>

        </PersistGate>
      </ReduxProvider>
    </>
  );
}
