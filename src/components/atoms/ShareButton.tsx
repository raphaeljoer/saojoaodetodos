
import React from "react";
import { Button, Flex, FlexProps, Icon, IconButton, IconButtonProps } from "@chakra-ui/react";
import Text from '@/components/atoms/Text';
import { IconType } from "react-icons";

const containerProps: IconButtonProps = {
  flexDir: "column",
  "aria-label": "share button",
  borderRadius: "2xl",
  justifyContent: "center",
  color: "white",
  cursor: "pointer",
  colorScheme: "oilblue",
  h: 24,
  w: 24,
  p: 6,
}

interface IProps {
  title: string;
  icon: IconType;
  onClick: () => void;
};

export const ShareButton = ({ title, icon, onClick,...props }: IProps) => {
  return (
    <Flex flexDir="column" align="center">
      <IconButton as={icon} onClick={() => {}} {...containerProps} />
      <Text fontSize="lg" fontWeight="bold" mt={4}>
        {title}
      </Text>
    </Flex>
  )
};

export default ShareButton;
