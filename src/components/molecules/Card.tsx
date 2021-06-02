import { ui } from "@/config/app";
import { Props } from "@/config/props";
import { Flex, FlexProps, ButtonProps, Box } from "@chakra-ui/react";
import React, { cloneElement, Children, ReactElement } from "react";
import Avatar from "../atoms/Avatar";
import Heading from "../atoms/Heading";

interface VariantProps {
  vote: FlexProps;
  share: FlexProps;
};

interface CardProps {
  id: string;
  name: string;
  variant: "vote" | "share";
  children: JSX.Element | JSX.Element[];
};

export const Card = ({ id, name, variant, children, ...props }: CardProps) => {

  const variantSwicher: VariantProps = {
    "vote": Props.Card.vote,
    "share": Props.Card.share
  }

  return (
    <Flex {...variantSwicher[variant]} {...props}>
      <Avatar image={`/assets/artist/avatar/${id}.jpg`} mb={8} />
      <Flex h={24} align="center" justifyItems="center" mb={4}>
        <Heading color="white" textAlign="center">
          {name}
        </Heading>
      </Flex>
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
