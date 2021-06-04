
import { ui } from "@/config/app";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface IProps { };

export const Header = ({ }: IProps) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <>
      <Box pos="relative" h={272} w="full" maxW={863} justifySelf="center">
        <Image
          src={ui.header.talento.src}
          alt={ui.header.talento.alt}
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          priority
        />
      </Box>
      <Box pos="relative" h={200} w="full" maxW={863} mt={12} alignItems="center" justifySelf="center">
        <Image
          src={ui.header.logos.src}
          alt={ui.header.logos.alt}
          layout="fill"
          objectFit="contain"
          objectPosition="top"
          priority
        />
      </Box>
    </>
  )
};

export default Header;
