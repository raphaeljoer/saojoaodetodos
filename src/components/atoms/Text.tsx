
import React from "react";
import { Heading as CkHeading, HeadingProps as CkHeadingProps, Text as CkText, TextProps as CkTextProps } from "@chakra-ui/react"

export interface TextProps extends CkTextProps {
  mc?: boolean;
  tc?: boolean;
};

export const Text = ({ mc, tc, children, ...props }: TextProps) => {

  return (
    <CkText
      m={mc ? "0 auto" : undefined}
      textAlign={tc ? "center" : undefined}
      lineHeight="120%"
      {...props}
    >
      {children}
    </CkText>
  )
};

export default Text;
