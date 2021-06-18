import { ButtonProps, FlexProps } from "@chakra-ui/react";

export namespace Props {
  export namespace Card {

    export const standard: FlexProps = {
      flexDirection: "column",
      bgColor: "#053a5e",
      borderRadius: 40,
      minH: 260,
      align: "center",
      w: "full",
      maxW: "sm",
      p: 8,
      mx: 8
    };

    export const vote: FlexProps = {
      flexDirection: "column",
      bgColor: "#053a5e",
      borderRadius: 40,
      minH: 260,
      align: "center",
      w: "full",
      maxW: "sm",
      p: 8,
      mx: 8
    };

    export const share: FlexProps = {
      flexDirection: "column",
      bgColor: "#053a5e",
      borderRadius: 40,
      minH: 260,
      align: "center",
      w: "full",
      p: 8,
      mx: 8,
      alignContent: "center",
      margin: "0 auto",
      mt: 32
    };
  };
}