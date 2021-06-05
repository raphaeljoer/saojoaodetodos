import { ButtonProps, FlexProps } from "@chakra-ui/react";

export namespace Props {
  export namespace Card {

    export const vote: FlexProps = {
      flexDirection: "column",
      bgColor: "#053a5e",
      borderRadius: 40,
      w: "full",
      minH: 260,
      maxW: { base: "xs", sm: "sm", md: "md", lg: "full" },
      align: "center",
      p: 8,
      mx: 8
    };

    export const share: FlexProps = {
      flexDirection: "column",
      bgColor: "#053a5e",
      borderRadius: 40,
      minH: 260,
      maxW: { base: "xs", sm: "sm", md: "md", lg: "full" },
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