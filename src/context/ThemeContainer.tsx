import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/styles/Global/theme';

interface ThemeContainerProps {
  children: any;
}

export const ThemeContainer = ({ children }: ThemeContainerProps) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ThemeContainer;
