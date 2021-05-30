
import { ArtistProps } from "@/@types/artist";
import { ui } from "@/config/app";
import { Props } from "@/config/props";
import { ButtonProps, Flex, FlexProps } from "@chakra-ui/react";
import React, { cloneElement, Children } from "react";
import Avatar from "../atoms/Avatar";
import Button from "../atoms/buttons/Button";
import Heading from "../atoms/Heading";

type Props = FlexProps & ButtonProps & ArtistProps;

interface VariantProps {
  vote: FlexProps;
  share: FlexProps;
}

interface CardProps {
  id: string;
  name: string;
  variant: "vote" | "share";
  children: JSX.Element | JSX.Element[];
};

export const Card = ({ id, name, variant, children, ...props }: CardProps) => {

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
          ...child.props,
          ...Props.Button.card,
          mt: idx > 0 && 4
        })
      ))}
    </Flex>
  )
};

export default Card;
