
import { Avatar, AvatarBadge, Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";
import Heading from "../atoms/Heading";
import { ResultProps } from "@/@types/result";
import Status from "./Status";

interface CardResult extends ResultProps {
  position: number;
}

export const CardResult = ({ id, name, percentage, progress, position }: CardResult) => {
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
      >
        <AvatarBadge border="3px solid white" bg="tomato" boxSize={8} placement="top-left">
          <Text fontSize="xs" color="white" fontWeight="bold">{`${String(position)}º`}</Text>
        </AvatarBadge>
      </Avatar>
      <Flex ml={4} alignItems="flex-start" justify="center" flexDir="column" w="full">
        <Heading fontSize="2xl" color="white" mb={4}>{name}</Heading>
        <Status percentage={percentage} progress={progress} />
      </Flex>
    </Flex>
  )
};

export default CardResult;
