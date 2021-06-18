import { Props } from "@/config/props";
import { Avatar, Flex, FlexProps } from "@chakra-ui/react";
import { FiUser } from 'react-icons/fi'
import React from "react";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import { ui } from "@/config/app";

interface VariantProps {
  vote: FlexProps;
  share: FlexProps;
  standard: FlexProps;
};

interface CardProps extends FlexProps {
  id: string;
  name: string;
  variant: "vote" | "share" | "standard"; 
  isAvailable?: boolean;
  children?: JSX.Element | JSX.Element[];
};

const avatarProps = {
  mt: -28,
  w: 48,
  h: 48,
  mb: 8,

  boxShadow: "2xl",
  bg: "red.500",
  border: "6px solid white",

  icon: <FiUser color="white" fontSize="2.4rem" />
}

export const Card = ({ id, name, variant, isAvailable, children, ...props }: CardProps) => {
  

  const variantSwicher: VariantProps = {
    "standard": Props.Card.standard,
    "vote": Props.Card.vote,
    "share": Props.Card.share
  }

  return (
    <Flex
      boxShadow="2xl"
      bgImage={`url(${ui.footer.background.src})`}
      bgPosition="center"
      bgRepeat="repeat"
      border="4px solid white"
      maxW="sm"
      {...variantSwicher[variant]}
      {...props}
    >
      <Avatar {...avatarProps} src={`/assets/artist/avatar/${id}.jpg`}/>
      <Flex h={32} align="center" justifyItems="center" mb={4} >
        <Heading color="white" py={4} h="auto">
          {name}
        </Heading>
      </Flex>
      {children}
      {!isAvailable && variant === "vote" && <Text mt={4} color="white" fontWeight="700">Aguarde para votar novamente</Text>}
    </Flex>
  )
};

export default Card;
