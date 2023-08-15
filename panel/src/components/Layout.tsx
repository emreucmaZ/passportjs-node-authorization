import { AppProps } from "next/app";
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "./AppBar/ResponsiveAppBar";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { isAuthorized } from "@/helpers";
import { logOut } from "@/redux/actions/user";
import { IRootState } from "@/redux/interfaces/IRootState";
import LoginPage from "@/pages/login";

function Layout({ Page }: any) {
  const state = useSelector((state: IRootState) => state);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    return () => {
      isAuthorized(state.user.token, setIsLoggedIn)
    }
  }, [])

  return isLoggedIn ? (
    <>

      <ResponsiveAppBar />
      <Container maxWidth="xl">{Page}</Container>
    </>
  ) : <LoginPage />
}

export default Layout;
