
//chakra-ui
import { Box, BoxProps, Heading, Text } from "@chakra-ui/react";

//resources
import React from "react";

export const Closed = ({ ...props }: BoxProps) => {
  return (
    <Box {...props}>
      <Heading mb={4} color="oilblue.500">Votações encerradas</Heading>
      <Text textAlign="center" color="oilblue.500" fontWeight="bold">em breve divulgaremos o vencedor</Text>
    </Box>
  )
};

export default Closed;
