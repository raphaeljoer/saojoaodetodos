import { ChakraTheme, extendTheme } from '@chakra-ui/react';
import { config } from './config';
import { fonts } from './foundations/fonts';
import { colors } from './foundations/colors';
//components
import { Heading } from './components/heading';
import { Button } from './components/button';
import { Avatar } from './components/avatar';

export const theme: ChakraTheme = extendTheme({
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
    },
  },
  fonts,
  config,
  colors,
  components: {
    Avatar,
    Heading,
    Button,
  },
});

export default extendTheme(theme);
