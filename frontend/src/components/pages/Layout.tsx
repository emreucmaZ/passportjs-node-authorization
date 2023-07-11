import { AppProps } from "next/app";
import React from "react";
import ResponsiveAppBar from "../AppBar/ResponsiveAppBar";
import Container from "@mui/material/Container";

function Layout({ Page }: any) {
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="xl">{Page}</Container>
    </>
  );
}

export default Layout;
