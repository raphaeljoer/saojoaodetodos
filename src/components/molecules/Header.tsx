import * as ui from '@/config/ui';
import { Box, Text } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';
import Link from '@/components/atoms/Link';

export const Header = () => {
  return (
    <>
      <Box pos="relative" h={272} w="full" maxW={863} justifySelf="center">
        <Link href="/">
          <Image
            src={ui.header.talento.src}
            alt={ui.header.talento.alt}
            layout="fill"
            objectFit="cover"
            objectPosition="top"
          />
        </Link>
      </Box>
      <Box
        pos="relative"
        h={200}
        w="full"
        maxW={863}
        mt={12}
        alignItems="center"
        justifySelf="center"
      >
        <Image
          src={ui.header.logos.src}
          alt={ui.header.logos.alt}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </Box>
    </>
  );
};

export default Header;
