
import React from 'react';
import { Tooltip as CkTooltip, TooltipProps, ComponentWithAs, ChakraComponent } from "@chakra-ui/react"

export const Tooltip: ComponentWithAs<"div", TooltipProps> = ({ label, children, ...props }: TooltipProps) => (
  <CkTooltip
    hasArrow
    label={label}
    color="oilblue.10"
    bg="orange.500"
    p={2}
    borderRadius="lg"
    {...props}
  >
    {children}
  </CkTooltip>
);

export default Tooltip;
