//chakra-ui
import { Link as CkLink, Grid, Flex, useBreakpointValue, Box } from "@chakra-ui/react"
//core components
import Container from "@/components/molecules/Container";
//resources
import React from "react";
import { ui, zIndex } from "@/config/app";
import Image from "next/image";

export interface Footer {
  hideLogo?: boolean;
};

export const Footer = ({ hideLogo, ...props }: Footer) => {

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box
      h={216}
      w="full"
      bgImage={`url(${ui.footer.background.src})`}
      bgPosition="center"
      bgRepeat="repeat"
    >
      <Box
        h={24}
        mt={-8}
        bgImage={`url(${ui.footer.hope.src})`}
        bgPosition="center"
        bgRepeat="repeatX"
      />
      <Container zIndex={zIndex.low} pos="relative">
        edede
      </Container>
    </Box>
  );
};

export default Footer;
