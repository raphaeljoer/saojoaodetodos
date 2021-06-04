
import { Avatar, Flex, Progress } from "@chakra-ui/react";
import React from "react";
import Heading from "../atoms/Heading";
import { ResultProps } from "@/@types/result";
import Status from "./Status";

interface CardResult extends ResultProps {}

export const CardResult = ({ id, name, percentage , progress}: CardResult) => {
  return (
    <Flex
      boxShadow="xl"
      bgColor="oilblue.500"
      borderRadius="2xl"
      p={6}
      w={{ base: "xs", sm: "sm", md: "md" }}
    >
      <Avatar
        border="4px solid white"
        boxShadow="xl"
        size="xl"
        src={`/assets/artist/avatar/${id}.jpg`}
      />
      <Flex ml={4} alignItems="flex-start" justify="center" flexDir="column" w="full">
        <Heading fontSize="2xl" color="white" mb={4}>{name}</Heading>
        <Status percentage={percentage} progress={progress}/>
      </Flex>
    </Flex>
  )
};

export default CardResult;
