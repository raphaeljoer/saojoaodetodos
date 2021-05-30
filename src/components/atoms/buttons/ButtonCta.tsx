//chakra-ui
import { ButtonProps } from '@chakra-ui/react';

//core components
import Button from "@/components/atoms/buttons/Button";

//resources
import React, { ReactElement } from 'react';

interface IProps extends ButtonProps {
  variant: "hero" | "mainMenu" | "rightMenu" | "mobileMenu";
  color: "orange1" | "orange2" | "oilblue1" | "oilblue2" | "transparent";
  children: string | ReactElement;
}
interface VariantProps {
  hero: ButtonProps;
  rightMenu: ButtonProps;
  mainMenu: ButtonProps;
  mobileMenu: ButtonProps;
}
interface ColorsProps {
  orange1: ButtonProps;
  orange2: ButtonProps;
  oilblue1: ButtonProps;
  oilblue2: ButtonProps;
  transparent: ButtonProps;
}

const defaultProps: ButtonProps = {
  fontSize: 16,
  borderRadius: "xl",
  cursor: "pointer",
};

const colorProps: ColorsProps = {
  orange1: {
    variant: "solid",
    colorScheme: "orange",
    color: "oilblue.700",
    border: "1px",
    _hover: { bgColor: "transparent", color: "orange.500" },
  },
  orange2: {
    variant: "outline",
    colorScheme: "orange",
    _hover: { bgColor: "orange.500", color: "oilblue.700" },
  },
  oilblue1: {
    variant: "solid",
    colorScheme: "oilblue",
    _hover: { bgColor: "transparent", color: "oilblue.500" },
  },
  oilblue2: {
    color: "oilblue.500",
    colorScheme: "transparent",
    _hover: { bgColor: "oilblue.500", color: "oilblue.10" }
  },
  transparent: {
    color: "oilblue.10",
    colorScheme: "transparent",
    border: "none",
    variant: "ghost",
    _hover: { bgColor: "oilblue.600" },
  },
};

const variantProps: VariantProps = {
  hero: {
    h: 16,
    size: "lg",
    fontSize: { base: 18, md: 20 },
    fontWeight: 500,
  },
  rightMenu: {
    h: 12,
    px: 4,
    fontSize: 16,
    fontWeight: 500,
  },
  mainMenu: {
    h: 12,
    px: 4,
    fontSize: 16,
  },
  mobileMenu: {
    h: 16,
    fontSize: 28,
    justifyContent: "flex-start",
    w: "full",
  },
};

const ButtonCta = ({ variant, color, children, ...props }: IProps) => {

  const variantSwitcher = {
    "hero": variantProps.hero,
    "mainMenu": variantProps.mainMenu,
    "rightMenu": variantProps.rightMenu,
    "mobileMenu": variantProps.mobileMenu,
  };

  const colorSwitcher = {
    "transparent": colorProps.transparent,
    "oilblue1": colorProps.oilblue1,
    "oilblue2": colorProps.oilblue2,
    "orange1": colorProps.orange1,
    "orange2": colorProps.orange2,
  };

  return (
    <Button
      {...defaultProps}
      {...variantSwitcher[variant]}
      {...colorSwitcher[color]}
      {...props}
    >
      {children}
    </Button>
  )
};

export default ButtonCta;
