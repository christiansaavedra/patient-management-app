import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Lato', sans-serif`,
  },
  components: {
    Button: {
      variants: {
        solid: {
          backgroundColor: "blue.200",
          _hover: {
            backgroundColor: "blue.100",
          },
        },
      },
    },
    Input: {
      variants: {
        backgroundFix: {
          field: {
            border: "2px solid",
            borderColor: "teal.400",
            background: "white",
            borderRadius: "8px",
            _hover: {
              borderColor: "teal.500",
            },
            _focus: {
              borderColor: "teal.400",
              boxShadow: "0 0 0 1px teal.400",
            },
          },
        },
      },
      defaultProps: {
        variant: "backgroundFix",
      },
    },
  },
});

export default theme;
