//chakra-ui
import { Link as CkLink, Grid, Flex, useBreakpointValue, Box, GridItem, HStack, SimpleGrid } from "@chakra-ui/react"
//core components
import Container from "@/components/molecules/Container";
//resources
import React from "react";
import { ui, zIndex } from "@/config/app";
import Image from "next/image";
import Heading from "../atoms/Heading";
import { partners, sponsors } from "@/data/static/brands";
import { BrandProps } from "@/@types/brand";

export interface Footer {
  hideLogo?: boolean;
};

const getBrands = (brands: BrandProps[]) => (
  brands.map(b => (
    <Box key={b.id} pos="relative" mr={6} alignSelf="center">
      <Image
        src={`/assets/brand/${b.id}.png`}
        width={b.width}
        height={b.height}
        priority
      />
    </Box>
  ))
);

export const Footer = ({ hideLogo, ...props }: Footer) => {

  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box
      h="auto"
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
      <Container zIndex={zIndex.low} pos="relative" px={8}>
        <Flex justifyContent="space-between" flexDir={{ base: "column", lg: "row" }}>
          <Box mb={12}>
            <Heading fontSize="lg" color="white" mb={8}>
              PATROCÍNIO
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }}>
              {getBrands(sponsors)}
            </SimpleGrid>
          </Box>

          <Box mb={12} ml={{ base: 0, lg: 12 }}>
            <Heading fontSize="lg" color="white" mb={8}>
              APOIO
            </Heading>
            <SimpleGrid columns={{ base: 4, lg: 2 }}>
              {getBrands(partners)}
            </SimpleGrid>
          </Box>

        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
