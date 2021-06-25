//chakra-ui
import { Text, Flex, IconButton, IconButtonProps } from '@chakra-ui/react';
//resources
import React from 'react';
import { IconType } from 'react-icons';

const containerProps: IconButtonProps = {
  flexDir: 'column',
  'aria-label': 'share button',
  justifyContent: 'center',
  color: 'white',
  cursor: 'pointer',
  colorScheme: 'red',
  h: 20,
  w: 20,
  p: 6,
  m: 1,
  rounded: 24,
};

interface IProps {
  title: string;
  icon: IconType;
  onClick?: () => void;
}

export const ShareButton = ({ title, icon, onClick, ...props }: IProps) => {
  return (
    <Flex flexDir="column" align="center" {...props}>
      <IconButton as={icon} onClick={onClick} {...containerProps} />
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        {title}
      </Text>
    </Flex>
  );
};

export default ShareButton;
