
import React from 'react';
import { Tooltip as CkTooltip, TooltipProps, ComponentWithAs } from "@chakra-ui/react"

export const Tooltip: ComponentWithAs<"div", TooltipProps> = ({ children, ...props }: TooltipProps) => (
  <CkTooltip
    hasArrow
    colorScheme="red"
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
