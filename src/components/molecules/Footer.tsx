//chakra-ui
import { Box, Flex, SimpleGrid, Heading } from '@chakra-ui/react';
//core components
import Container from '@/components/molecules/Container';
//resources
import React from 'react';
import Image from 'next/image';
import * as ui from '@/config/ui';
import { zIndex } from '@/config/app';
//data
import { partners, sponsors } from '@/data/static/brands';
//types
import { BrandProps } from '@/@types/brand';

const getBrands = (brands: BrandProps[]) =>
  brands.map((b) => (
    <Flex key={b.id} pos="relative" mr={6} h={86} align="center">
      <Image
        src={`/assets/brand/${b.id}.png`}
        width={b.width}
        height={b.height}
        priority
      />
    </Flex>
  ));

export const Footer = () => {
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
        <Flex
          justifyContent="space-between"
          flexDir={{ base: 'column', lg: 'row' }}
        >
          <Box mb={12}>
            <Heading fontSize="2xl" color="white" mb={8} textAlign="left">
              PATROCÍNIO
            </Heading>
            <SimpleGrid columns={{ base: 2, md: 4 }}>
              {getBrands(sponsors)}
            </SimpleGrid>
          </Box>

          <Box mb={12} ml={{ base: 0, lg: 12 }}>
            <Heading fontSize="2xl" color="white" mb={8} textAlign="left">
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
