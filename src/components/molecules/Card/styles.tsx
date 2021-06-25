//chakra-ui
import { AvatarProps, FlexProps } from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
//resources
import React from 'react';

export const standard: FlexProps = {
  flexDirection: 'column',
  bgColor: '#053a5e',
  borderRadius: 40,
  minH: 260,
  align: 'center',
  w: 'full',
  p: 8,
  mx: 8,
  maxW: 'sm',
};

export const share: FlexProps = {
  ...standard,
  alignContent: 'center',
  margin: '0 auto',
  mt: 32,
};

export const avatar: AvatarProps = {
  mt: -28,
  w: 48,
  h: 48,
  mb: 8,
  boxShadow: '2xl',
  bg: 'red.500',
  border: '6px solid white',
  icon: <FiUser color="white" fontSize="2.4rem" />,
};
