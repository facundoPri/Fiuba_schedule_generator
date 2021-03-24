import {
    Flex,
    Heading,
    Link,
    useColorMode,
} from "@chakra-ui/react"
import { Droppable } from "react-beautiful-dnd"
import { ClassCard } from "../components/ClassCard"


export const Card = ({ subject, lessons, openModal }) => {
    const { colorMode } = useColorMode()
    const bgColor = { light: 'gray.100', dark: 'gray.600' }

    return (
        <Flex flexDir="column" bg={bgColor[colorMode]} borderRadius="md" p={2} m={1} w={300} minW={300} >
            <Heading size="sm" mb={2} ml={1} mt={1}>{subject.code} {subject.name}</Heading>
            <Droppable droppableId={subject.id}>
                {provided => (
                    <Flex flexDir="column" ref={provided.innerRef} {...provided.droppableProps}>
                        {lessons.map((lesson, index) => <ClassCard key={lesson.id} lesson={lesson} index={index} />)}
                        {provided.placeholder}
                    </Flex>
                )}
            </Droppable>
            <Link mt={2} ml={1} onClick={openModal} fontSize="sm">Add Catedra...</Link>
        </Flex>
    )
}
