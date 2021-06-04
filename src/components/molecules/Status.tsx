
import { Flex, FlexProps, Progress } from "@chakra-ui/react";
import React from "react";
import Percentage from "../atoms/Percentage";

interface StatusProps extends FlexProps {
  percentage: number;
  progress: number;
};

export const Status = ({ percentage, progress }: StatusProps) => {
  return (
    <Flex w="full" alignItems="space-between">
      <Progress
        colorScheme="red"
        w="full"
        size="lg"
        borderRadius="full"
        hasStripe
        value={progress}
      />
      <Percentage value={percentage} ml={4} />
    </Flex>)
};

export default Status;
