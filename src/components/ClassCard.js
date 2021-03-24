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
import { Draggable } from "react-beautiful-dnd"

export const ClassCard = ({ lesson, index }) => {
    const { colorMode } = useColorMode()
    const bgColor = { light: 'gray.50', dark: 'gray.500' }

    return (
        <Draggable draggableId={lesson.id} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef} >
                    <Accordion /* defaultIndex={[0]} */ allowMultiple>
                        <AccordionItem bg={bgColor[colorMode]} border={0} borderRadius="md" mt={2} >
                            <Flex alignItems="center" py={2} px={3}>
                                <Box flex="1" textAlign="left">
                                    {index + 1}. {lesson.lessonCode} - {lesson.teacher}
                                </Box>
                                <Box>
                                    <AccordionButton borderRadius="md">
                                        <AccordionIcon />
                                    </AccordionButton>
                                </Box>
                            </Flex>
                            <AccordionPanel pb={4}>
                                <Flex flexDir="column">
                                    {lesson.schedules.map((schedule, index) => {
                                        return (
                                            <Text key={schedule.id}>{schedule.since} - {schedule.until}, {schedule.day.charAt(0).toUpperCase() + schedule.day.slice(1)}</Text>
                                        )
                                    })}
                                </Flex>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}
        </Draggable >
    )
}


