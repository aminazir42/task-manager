import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
      },
    }),
  },
});

export default customTheme;
