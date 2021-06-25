import { Avatar, Flex, FlexProps } from '@chakra-ui/react';
import React from 'react';
import Heading from '../../atoms/Heading';
import Text from '../../atoms/Text';
import { ui } from '@/config/app';
import * as Style from './styles';

interface CardProps extends FlexProps {
  id: string;
  name: string;
  variant?: 'standard' | 'share';
  isAvailable?: boolean;
  children?: JSX.Element | JSX.Element[];
}

export const Card = ({
  id,
  name,
  variant = 'standard',
  isAvailable,
  children,
  ...props
}: CardProps) => {
  return (
    <Flex
      boxShadow="2xl"
      bgImage={`url(${ui.footer.background.src})`}
      bgPosition="center"
      bgRepeat="repeat"
      border="4px solid white"
      maxW="sm"
      {...Style[variant]}
      {...props}
    >
      <Avatar {...Style.avatar} src={`/assets/artist/avatar/${id}.jpg`} />
      <Flex h={32} align="center" justifyItems="center" mb={4}>
        <Heading color="white" py={4} h="auto">
          {name}
        </Heading>
      </Flex>
      {children}
      {!isAvailable && variant === 'standard' && (
        <Text mt={4} color="white" fontWeight="700">
          Aguarde para votar novamente
        </Text>
      )}
    </Flex>
  );
};

export default Card;
