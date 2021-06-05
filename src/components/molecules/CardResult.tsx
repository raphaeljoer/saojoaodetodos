
import { Avatar, AvatarBadge, Box, Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";
import Heading from "../atoms/Heading";
import { ResultProps } from "@/@types/result";
import Status from "./Status";
import CardStatus from "./CardStatus";

interface CardResult extends ResultProps {
  value: ResultProps;
}

export const CardResult = ({ value: v }: CardResult) => {
  return (
    <Flex
      boxShadow="xl"
      bgColor="oilblue.500"
      rounded={32}
      p={6}
      // w={{ base: "xs", sm: "sm", md: "md" }}
    >
      <CardStatus value={v} />
    </Flex>
  )
};

export default CardResult;
