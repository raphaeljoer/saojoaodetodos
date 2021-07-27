import { Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';
import { ResultProps } from '@/@Entities/result';
import CardStatus from './CardStatus';

interface CardResult extends FlexProps {
  value: ResultProps;
}

export const CardResult = ({ value, ...props }: CardResult) => {
  return (
    <Flex boxShadow="xl" bgColor="oilblue.500" rounded={32} p={6} {...props}>
      <CardStatus value={value} />
    </Flex>
  );
};

export default CardResult;
