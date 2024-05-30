
"use client";
import Providers from "../providers";
import { Box } from "@chakra-ui/react";
import Head from "next/head";

function Layout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Task Manager</title>
      </Head>
      <body>
        <Providers>
          <Box p={4}>
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}

export default Layout;
