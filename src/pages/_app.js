import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { Header } from '../components/Header'
import { Container } from '../components/Container'

import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
        }}
      >
          <Container minH="100vh">
            <Header />
            <Component {...pageProps} />
          </Container >
      </ColorModeProvider>
    </ChakraProvider>
  )
}
export default MyApp
