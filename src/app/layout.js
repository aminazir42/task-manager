// src/app/layout.js
"use client";

import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box p={4}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
