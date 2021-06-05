
import { ResultProps } from "@/@types/result";
import { Box, BoxProps, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import CardStatus from "./CardStatus";

interface ToastSucessProps extends BoxProps {
  value: ResultProps;
};

const boxProps: BoxProps = {
  h: "auto",
  rounded: "lg",
  w: "xs",
  bgColor: "green.600",
  p: 6
}

export const ToastSucess = ({ value: v, ...props }: ToastSucessProps) => {
  return (
    <Box {...boxProps} {...props}>
      <CardStatus value={v} />
    </Box>
  )
};

export default ToastSucess;
