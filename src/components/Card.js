import {
    Flex,
    Heading,
    Link,
    useColorMode,
} from "@chakra-ui/react"

export const Card = (props) => {
    const { colorMode } = useColorMode()
    const bgColor = { light: 'gray.100', dark: 'gray.600' }

    return (
        <Flex flexDir="column" bg={bgColor[colorMode]} borderRadius="md" p={2} m={1} w={300} minW={300} {...props}>
            <Heading size="sm" mb={2} ml={1} mt={1}>{props.code} {props.subject}</Heading>
            {props.children}
            <Link mt={2} ml={1} onClick={props.openModal} fontSize="sm">Add Catedra...</Link>
        </Flex>
    )
}
