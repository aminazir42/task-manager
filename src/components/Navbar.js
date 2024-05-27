// src/components/Navbar.js
import { Box, Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg="teal.500" color="white" px={4} py={2}>
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">Task Manager</Text>

      </Flex>
    </Box>
  );
};

export default Navbar;
