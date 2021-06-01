import { ui } from "@/config/app";
import { Props } from "@/config/props";
import { Flex, FlexProps, ButtonProps } from "@chakra-ui/react";
import React, { cloneElement, Children, ReactElement } from "react";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/buttons/Button";
import Heading from "../atoms/Heading";

interface VariantProps {
  vote: FlexProps;
  share: FlexProps;
};

interface CardProps {
  id: string;
  name: string;
  variant: "vote" | "share";
  children: ReactElement<typeof Button> | Array<ReactElement<typeof Button>>;
};

export const Card: React.FC<CardProps> = ({ id, name, variant, children, ...props }: CardProps) => {

  const variantSwicher: VariantProps = {
    "vote": Props.Vote.card,
    "share": Props.Share.card
  }

  return (
    <Flex {...variantSwicher[variant]} {...props}>
      <Avatar image={ui.avatar.example.src} mb={8} />
      <Heading color="white" mb={8}>
        {name}
      </Heading>
      {Children.map(children, (child, idx) => (
        cloneElement(child, {
          mt: idx > 0 && 4,
          ...Props.Button.card,
          ...child.props,
        })
      ))}
    </Flex>
  )
};

export default Card;
