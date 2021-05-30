
import React from "react";
import { Heading as CkHeading, HeadingProps as CkHeadingProps } from "@chakra-ui/react"

export interface HeadingProps extends CkHeadingProps {
  mc?: boolean;
  tc?: boolean;
};

export const Heading = ({ mc, tc, children, ...props }: HeadingProps) => {
  return (
    <CkHeading
      m={mc ? "0 auto" : undefined}
      textAlign={tc ? "center" : undefined}
      size="lg"
      lineHeight="120%"
      {...props}
    >
      {children}
    </CkHeading>
  )
};

export default Heading;
