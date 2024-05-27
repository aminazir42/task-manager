// src/components/SplashScreen.js
"use client";

import { Box, Image } from "@chakra-ui/react";

function SplashScreen() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Image src="/public/logo.png" alt="Logo" />
    </Box>
  );
}

export default SplashScreen;
