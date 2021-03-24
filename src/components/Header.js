import { Box, Flex, Link, Spacer, useColorModeValue } from "@chakra-ui/react"
import { DarkModeSwitch } from "./DarkModeSwitch"
import NextLink from "next/link"

export const Header = () => {
    const bgColor = useColorModeValue("purple.500", "purple.800")
    const color = useColorModeValue("white", "white")
    return (
        <>
            <Flex /* position="fixed" */ as="header" bg={bgColor} color={color} w="full" h="16" justifyContent="space-around">
                <Flex align="center" flexGrow={1} maxW="sm" fontWeight='bold' fontSize={16}>
                    <Link as={NextLink} href="/">Materias</Link>
                    <Spacer />
                    <Link as={NextLink} href="/horarios">Horarios</Link>
                    <Spacer />
                    <Link as={NextLink} href="/opciones">Opciones</Link>
                </Flex>
                <Flex align="center">
                    <DarkModeSwitch />
                </Flex>
            </Flex>
            {/* <Box h="16" /> */}
        </>
    )
}
