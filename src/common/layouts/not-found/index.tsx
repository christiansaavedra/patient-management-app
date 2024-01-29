import { Box, Heading, Text } from "@chakra-ui/react";
import { pxToRem } from "common/helpers";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundLayout = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: pxToRem(8),
      }}
    >
      <Heading>Page not found!</Heading>
      <Text sx={{ color: "blue.400" }}>
        <Link to="/patients">Let's go back home</Link>
      </Text>
    </Box>
  );
};

export default NotFoundLayout;
