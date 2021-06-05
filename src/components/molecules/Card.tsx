import { Props } from "@/config/props";
import { Alert, AlertIcon, Avatar, Flex, FlexProps } from "@chakra-ui/react";
import { FiUser } from 'react-icons/fi'
import React, { cloneElement, Children } from "react";
import Heading from "../atoms/Heading";
import Text from "../atoms/Text";
import { ui } from "@/config/app";

interface VariantProps {
  vote: FlexProps;
  share: FlexProps;
};

interface CardProps {
  id: string;
  name: string;
  variant: "vote" | "share";
  isAvailable: boolean;
  children: JSX.Element | JSX.Element[];
};

export const Card = ({ id, name, variant, isAvailable, children, ...props }: CardProps) => {

  const variantSwicher: VariantProps = {
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
      {...variantSwicher[variant]}
      {...props}
    >
      <Avatar boxShadow="2xl" mt={-28} h={48} w={48} src={`/assets/artist/avatar/${id}.jpg`} border="6px solid white" mb={8} bg="red.500" icon={<FiUser color="white" fontSize="2.4rem" />} />
      <Flex h={24} align="center" justifyItems="center" mb={4}>
        <Heading color="white" textAlign="center" fontSize="4xl" px={{ base: 2, lg: 8 }} my={4}>
          {name}
        </Heading>
      </Flex>
      {Children.map(children, (child, idx) => (
        cloneElement(child, { ...child.props })
      ))}
      {!isAvailable && variant === "vote" && <Text mt={4} color="white" fontWeight="700">Aguarde para votar novamente</Text>}
    </Flex>
  )
};

export default Card;
