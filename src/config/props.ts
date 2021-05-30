import { ButtonProps, FlexProps } from "@chakra-ui/react";

export namespace Props {
  export namespace Vote {
    export const card: FlexProps = {
      flexDirection: "column",
      bgColor: "#053a5e",
      borderRadius: 24,
      w: "full",
      minH: 260,
      maxW: { base: "xs", sm: "sm", md: "md", lg: "full" },
      align: "center",
      p: 8,
      mx: 8
    };

    export const button: ButtonProps = {
      w: "full",
      h: 14,
      borderRadius: "xl",
      fontSize: 20,
      color: "#333",
      fontWeight: "700",
      bgColor: "#e09133"
    };

  }

  export namespace Share {
    export const card: FlexProps = {
      flexDirection: "column",
      bgColor: "#053a5e",
      borderRadius: 24,
      minH: 260,
      maxW: { base: "xs", sm: "sm", md: "md", lg: "full" },
      align: "center",
      w: "sm",
      p: 8,
      mx: 8,
      alignContent: "center",
      margin: "0 auto",
      mt: 32
    };
  };

  export namespace Button {
    export const card: ButtonProps = {
      w: "full",
      h: 14,
      borderRadius: "xl",
      fontSize: 20,
      color: "#333",
      fontWeight: "700",
      bgColor: "#e09133"
    };
  }
}