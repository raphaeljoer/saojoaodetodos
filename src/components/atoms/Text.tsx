import React from 'react';
import { Text as CkText, TextProps as CkTextProps } from '@chakra-ui/react';

export type TextProps = CkTextProps;

export const Text = ({ children, ...props }: TextProps) => {
  return (
    <CkText lineHeight="120%" {...props}>
      {children}
    </CkText>
  );
};

export default Text;
