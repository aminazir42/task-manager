'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './store';
import customTheme from './theme';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ChakraProvider>
    </Provider>
  );
}
