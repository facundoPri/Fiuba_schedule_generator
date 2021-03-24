import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import { StateProvider } from '../Context';
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
        <StateProvider>
          <Container minH="100vh">
            <Header />
            <Component {...pageProps} />
          </Container >
        </StateProvider>
      </ColorModeProvider>
    </ChakraProvider>
  )
}
export default MyApp
