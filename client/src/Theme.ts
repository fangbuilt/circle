import { extendTheme } from "@chakra-ui/react";

const theme = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false
  },
  colors: {
    circleGreen: "#04a51e",
    circleDark: "#1d1d1d",
    circleAccent: "#2a2a2a"
  },
  styles: {
    global: {
      body: {
        "backgroundColor": "circleDark"
      }
    }
  }
}

export default extendTheme(theme)