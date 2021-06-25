import { ComponentStyleConfig } from '@chakra-ui/react';

export const defaults = {
  fontWeight: 'bold',
  lineHeight: '120%',
  textAlign: 'center',
  textTransform: 'uppercase',
};

export const Heading: ComponentStyleConfig = {
  defaultProps: { variant: 'h2' },
  variants: {
    h1: { fontSize: '5xl', ...defaults },
    h2: { fontSize: '5xl', ...defaults },
    h3: { fontSize: '3xl', ...defaults },
    h4: { fontSize: '2xl', ...defaults },
    h5: { fontSize: 'xl', ...defaults },
    h6: { fontSize: 'lg', ...defaults },
  },
};
