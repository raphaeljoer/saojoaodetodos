
import { Avatar, Flex, Progress } from "@chakra-ui/react";
import React from "react";
import Heading from "../atoms/Heading";
import Text from "@/components/atoms/Text";
import { ResultProps } from "@/@types/result";

export const CardResult = ({ id, artist, percentual  }: ResultProps) => {
  return (
    <Flex key={id} bgColor="oilblue.500" p={6} borderRadius="2xl" w={{ base: "xs", sm: "sm", md: "md" }}>
      <Avatar border="4px solid white" size="xl" src={`/assets/artist/avatar/${id}.jpg`} />
      <Flex ml={4} alignItems="flex-start" justify="center" flexDir="column" w="full">

        <Heading fontSize="2xl" color="white" mb={4}>
          {artist}
        </Heading>

        <Flex w="full" alignItems="space-between">
          <Progress
            colorScheme="orange"
            w="full"
            size="lg"
            borderRadius="full"
            hasStripe
            value={percentual}
          />
          <Text color="white" fontWeight="700" ml={4}>
            {`${String(percentual).slice(0, 5)}%`}
          </Text>
        </Flex>

      </Flex>
    </Flex>
  )
};

export default CardResult;
