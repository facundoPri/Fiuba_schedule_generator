import { Flex, useColorMode } from '@chakra-ui/react'

export const Container = (props) => {
  const { colorMode } = useColorMode()
  const bgColor = { light: 'gray.200', dark: 'gray.700' }
  const color = { light: 'black', dark: 'white' }

  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100vw"
      overflow="hidden"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  )
}
