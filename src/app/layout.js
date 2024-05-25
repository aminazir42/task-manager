"use client";

import { Box, Container, Heading } from '@chakra-ui/react';
import useDarkMode from './hooks/useDarkMode';

const Layout = ({ children }) => {
  return (
    <Box>
      <header>
        <Heading as="h1" size="lg" p={4} textAlign="center">
          Task Manager
        </Heading>
      </header>
      <Container maxW="md" mx="auto" p={5}>
        {children}
      </Container>
      <footer>
        <Box p={4} textAlign="center">
          <useDarkMode />
        </Box>
      </footer>
    </Box>
  );
};

export default Layout;
