import React from 'react';
import {
  ComponentWithAs,
  Tooltip as CkTooltip,
  TooltipProps,
} from '@chakra-ui/react';

export const Tooltip: ComponentWithAs<'div', TooltipProps> = ({
  children,
  ...props
}: TooltipProps) => (
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
