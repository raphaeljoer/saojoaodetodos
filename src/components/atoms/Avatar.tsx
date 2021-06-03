
import { Box, BoxProps } from "@chakra-ui/react";
import Image from 'next/image'
import React from "react";

interface IProps extends BoxProps {
  image: string;
};

export const Avatar = ({image, ...props}: IProps) => {
  return (
    <Box
      w={24}
      h={24}
      pos="relative"
      borderRadius="full"
      overflow="hidden"
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
