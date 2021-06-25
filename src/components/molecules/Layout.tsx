import * as ui from '@/config/ui';
import { Grid } from '@chakra-ui/react';
import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface IProps {
  children: JSX.Element | JSX.Element[] | any;
}

export const Layout = ({ children }: IProps) => {
  return (
    <Grid
      h="full"
      minWidth={360}
      templateRows="216px 1fr auto"
      bgImage={`url(${ui.layout.background.src})`}
      bgPosition="center"
      bgRepeat="repeat"
    >
      <Header />
      {children}
      <Footer />
    </Grid>
  );
};

export default Layout;
