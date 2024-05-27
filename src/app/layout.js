import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

function Layout({ children }) {
  return (
    <ChakraProvider theme={theme}>
      {children}
    </ChakraProvider>
  );
}

export default Layout;
