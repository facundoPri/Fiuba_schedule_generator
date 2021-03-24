import { useColorMode } from "@chakra-ui/color-mode"
import { Divider } from "@chakra-ui/layout"
import { Flex } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { StateContext, DispatchContext } from '../Context'
import { schedulesGenerator } from '../utils/schedulesGenerator_v2'

const Opciones = () => {
    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext)
    const { colorMode } = useColorMode()
    const bgColor = { light: 'gray.50', dark: 'gray.500' }
    const [schedules, setSchedule] = useState(state.options);


    useEffect(() => {
        let scheduleOptions = schedulesGenerator(state)
        setSchedule(scheduleOptions)
        dispatch({ type: "addScheduleOptions", scheduleOptions: scheduleOptions })
    }, []);


    return (
        <>
            <Flex alignSelf="center" alignItems="flex-start" m={2} flexWrap="wrap" maxW={1000}>
                {Array.isArray(schedules) && schedules.length > 0 ? (
                    schedules.map((schedule, index) => {
                        return (
                            <>
                                <Flex alignContent='stretch' bg="gray.100" borderRadius='md' overflow='hidden' m={1}>
                                    <Flex px={2} alignSelf="center">
                                        {index + 1}
                                    </Flex>

                                    <Flex flex={1} flexDir="column">
                                        {schedule.map(lesson => {
                                            return (
                                                <>
                                                    <Flex px={2} minW={200} py={1} bg={bgColor[colorMode]} _hover={{ bg: "gray.100" }}>{state.lesson[lesson].lessonCode} - {state.lesson[lesson].teacher}</Flex>
                                                    <Divider />
                                                </>
                                            )
                                        })}

                                    </Flex>
                                </Flex>
                            </>
                        )
                    })
                ) : (
                    <Flex m={10}>
                        <Spinner
                            thickness="3px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="gray.700"
                            size="xl"
                        />
                    </Flex>
                )}

            </Flex >
        </>
    )
}

export default Opciones
