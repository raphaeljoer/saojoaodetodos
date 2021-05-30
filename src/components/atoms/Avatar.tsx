
import { Box, BoxProps } from "@chakra-ui/react";
import Image from 'next/image'
import React from "react";

interface IProps extends BoxProps {
  image: string;
};

export const Avatar = ({image, ...props}: IProps) => {
  return (
    <Box
      pos="relative"
      h={48}
      w={48}
      borderRadius="full"
      overflow="hidden"
      mt={-32}
      border="6px solid white"
      {...props}
    >
      <Image
        src={image}
        alt="avatar artist"
        layout="fill"
        objectFit="cover"
      />
    </Box>
  )
};

export default Avatar;
