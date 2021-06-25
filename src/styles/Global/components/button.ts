import { ButtonProps, ComponentStyleConfig } from '@chakra-ui/react';

export const baseStyle: ButtonProps = {
  color: 'white',
  bgColor: 'red.500',
  rounded: '2xl',
  _hover: { bgColor: 'red.600', _disabled: { bgColor: 'red.700' } },
};

const primary: ButtonProps = {
  fontSize: 'xl',
  fontWeight: '700',
  w: 'full',
  h: 16,
};

export const Button: ComponentStyleConfig = {
  baseStyle,
  defaultProps: { variant: 'primary' },
  variants: {
    primary,
  },
};

export default Button;
