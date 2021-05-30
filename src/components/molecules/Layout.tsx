
import { ui } from "@/config/app";
import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

interface IProps {
  children: JSX.Element | JSX.Element[];
};

export const Layout = ({ children }: IProps) => {
  return (
    <Grid
      templateRows="216px 1fr auto"
      h="full"
      bgImage={`url(${ui.layout.background.src})`}
      bgPosition="center"
      bgRepeat="repeat"
    >
      <Header />
        {children}
      <Footer />
    </Grid>
  )
};

export default Layout;
