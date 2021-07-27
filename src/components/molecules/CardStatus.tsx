//chakra-ui
import {
  Avatar,
  AvatarBadge,
  AvatarProps,
  Flex,
  FlexProps,
  Heading,
  Text,
  TextProps,
} from '@chakra-ui/react';
//core-components
import Status from './Status';
//resources
import React from 'react';
//types
import { ResultProps } from '@/@Entities/result';

interface CardStatusProps extends FlexProps {
  value: ResultProps;
  statusProps?: FlexProps;
  avatarProps?: AvatarProps;
  nameProps?: TextProps;
}

export const CardStatus = ({
  value: v,
  avatarProps,
  nameProps,
  statusProps,
  ...props
}: CardStatusProps) => {
  return (
    <Flex w="full" color="white" {...props}>
      <Avatar
        border="4px solid white"
        boxShadow="xl"
        size="xl"
        src={`/assets/artist/avatar/${v.id}.jpg`}
        {...avatarProps}
      >
        <AvatarBadge
          border="3px solid white"
          bg="tomato"
          boxSize={8}
          placement="top-left"
        >
          <Text fontSize="xs" fontWeight="bold">
            {`${String(v.position)}º`}
          </Text>
        </AvatarBadge>
      </Avatar>
      <Flex
        ml={4}
        alignItems="flex-start"
        justify="center"
        flexDir="column"
        w="full"
      >
        <Heading fontSize="2xl" textAlign="left" mb={4} {...nameProps}>
          {v.name}
        </Heading>
        <Status
          percentage={v.percentage}
          progress={v.progress}
          {...statusProps}
        />
      </Flex>
    </Flex>
  );
};

export default CardStatus;
