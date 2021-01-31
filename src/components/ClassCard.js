import {
    Flex,
    Box,
    Text,
    useColorMode,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from "@chakra-ui/react"

export const ClassCard = (props) => {
    const { colorMode } = useColorMode()
    const bgColor = { light: 'gray.50', dark: 'gray.500' }

    return (
        <Accordion /* defaultIndex={[0]} */ allowMultiple>
            <AccordionItem bg={bgColor[colorMode]} border={0} borderRadius="md" mt={2} >
                <AccordionButton>
                    <Box flex="1" textAlign="left">
                        1. Curso - Catedra
                        </Box>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                    <Flex flexDir="column">
                        <Text>xx:xx - xx:xx, Dia</Text>
                        <Text>xx:xx - xx:xx, Dia</Text>
                    </Flex>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}
