
import { ui } from "@/config/app";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface IProps { };

export const Header = ({ }: IProps) => {
  return (
    <Box pos="relative" h={272} w="full" maxW={863} justifySelf="center">
      <Image 
        src={ui.header.image.src}
        alt={ui.header.image.alt}
        layout="fill"
        objectFit="cover"
        objectPosition="top"
      />
    </Box>
  )
};

export default Header;
