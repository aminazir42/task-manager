"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import theme from "./theme";

function Providers({ children }) {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        {children}
      </ReduxProvider>
    </ChakraProvider>
  );
}

export default Providers;
