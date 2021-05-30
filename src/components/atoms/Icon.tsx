
import { IconButton, IconButtonProps } from "@chakra-ui/react"

export interface IconProps extends IconButtonProps {
  size?: string;
  colorScheme?: string;
  borderRadius?: number;
  icon: any;
};

export const Icon = ({icon: Icon, size, colorScheme,...props}: IconProps) => {

  return (
    <IconButton
      size={size || "sm"}
      colorScheme={colorScheme || "blue"}
      icon={<Icon />}
      {...props}
    />
  )
};

export default Icon;
