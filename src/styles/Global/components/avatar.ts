import { AvatarProps, ComponentStyleConfig } from '@chakra-ui/react';

export const baseStyle: AvatarProps = {
  boxShadow: '2xl',
  bg: 'red.500',
  border: '6px solid white',
};

export const primary = {
  mt: -28,
  w: 48,
  h: 48,
  mb: 8,
};

export const Avatar: ComponentStyleConfig = {
  baseStyle,
  defaultProps: { mt: -28, w: 48, h: 48, mb: 8 },
  variants: {
    primary,
  },
};
