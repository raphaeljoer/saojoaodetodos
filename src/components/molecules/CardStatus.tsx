
import { ResultProps } from "@/@types/result";
import { Avatar, AvatarBadge, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Status from "./Status";

interface CardStatusProps {
  value: ResultProps;
}

export const CardStatus = ({ value: v }: CardStatusProps) => {
  return (
    <Flex w="full">
      <Avatar
        border="4px solid white"
        boxShadow="xl"
        size="xl"
        src={`/assets/artist/avatar/${v.id}.jpg`}
      >
        <AvatarBadge border="3px solid white" bg="tomato" boxSize={8} placement="top-left">
          <Text fontSize="xs" color="white" fontWeight="bold">{`${String(v.position)}º`}</Text>
        </AvatarBadge>
      </Avatar>
      <Flex ml={4} alignItems="flex-start" justify="center" flexDir="column" w="full">
        <Heading fontSize="2xl" color="white" textAlign="left" mb={4}>{v.name}</Heading>
        <Status percentage={v.percentage} progress={v.progress} />
      </Flex>
    </Flex>)
};

export default CardStatus;
