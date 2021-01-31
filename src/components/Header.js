import { Box, Flex, Link, Spacer, useColorModeValue } from "@chakra-ui/react"
import { DarkModeSwitch } from "./DarkModeSwitch"

export const Header = () => {
    const bgColor = useColorModeValue("purple.500", "purple.900")
    const color = useColorModeValue("white", "white")
    return (
        <Flex as="header" bg={bgColor} color={color} w="full" h="16" justifyContent="space-around" >
            <Flex align="center" flexGrow={1} maxW="sm" fontWeight='bold' fontSize={16}>
                <Link>Materias</Link>
                <Spacer />
                <Link>Horarios</Link>
                <Spacer />
                <Link>Opciones</Link>
            </Flex>
            <Flex align="center">
                <DarkModeSwitch />
            </Flex>
        </Flex>
    )
}
