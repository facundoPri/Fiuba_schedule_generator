import { useColorModeValue } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/color-mode"

// const bgColor = useColorModeValue("purple.500", "purple.900")
// const color = useColorModeValue("white", "white")
// bg = { bgColor }
// color = { color }

// const { colorMode } = useColorMode()
// const bgColor = { light: 'gray.50', dark: 'gray.500' }
// bg = { bgColor[colorMode]}

const colors = {
  red: { light: "red.400", dark: "red.600" },
  orange: { light: "orange.300", dark: "orange.500" },
  yellow: { light: "yellow.300", dark: "yellow.500" },
  green: { light: "green.200", dark: "green.500" },
  teal: { light: "teal.200", dark: "teal.500" },
  blue: { light: "blue.300", dark: "blue.600" },
  cyan: { light: "cyan.300", dark: "cyan.600" },
  purple: { light: "purple.400", dark: "purple.800" },
}


// TODO: figure out a way to avoid repeat color when the amount of subjects is less than the amount of colors

export const subjectColorGenerator = () => {
  let colorsList = Object.keys(colors)
  const randomColor = colorsList[Math.floor(Math.random() * colorsList.length)];
  return colors[randomColor]
}
