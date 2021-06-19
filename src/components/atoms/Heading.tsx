import React from 'react';
import { Heading as CkHeading, HeadingProps } from '@chakra-ui/react';

export const Heading = ({ children, ...props }: HeadingProps) => {
  return (
    <CkHeading size="lg" lineHeight="120%" {...props}>
      {children}
    </CkHeading>
  );
};

export default Heading;
