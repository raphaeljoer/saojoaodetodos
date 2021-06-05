import { ComponentStyleConfig } from "@chakra-ui/react";

export namespace Props {
  export const defaults = {
    fontWeight: 'bold',
    lineHeight: '120%',
    textAlign: 'center'
  }
}

export const Heading: ComponentStyleConfig = {
  defaultProps: { variant: 'h2' },
  variants: {
    h1: { fontSize: '5xl', ...Props.defaults },
    h2: { fontSize: '4xl', ...Props.defaults },
    h3: { fontSize: '3xl', ...Props.defaults },
    h4: { fontSize: '2xl', ...Props.defaults },
    h5: { fontSize: 'xl', ...Props.defaults },
    h6: { fontSize: 'lg', ...Props.defaults },
  },
};