import { IconButton } from "@chakra-ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Flex, Text } from "@chakra-ui/layout"
import { useContext, useEffect, useState } from "react"
import { Calendar } from '../components/Calendar'
import { StateContext, DispatchContext } from '../Context'

import { schedulesGenerator, toMinutes } from '../utils/schedulesGenerator_v2'

const hours = [/* 1,2,3,4, */5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23]
const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'/* , 'sabado', 'domingo' */]


const Horarios = () => {

    const dispatch = useContext(DispatchContext);
    const state = useContext(StateContext)
    const [schedulesDays, setSchedulesDays] = useState([]);
    const [optionIndex, setOptionIndex] = useState(0);



    useEffect(() => {
        if (state.options) {
            setSchedulesDays(generateSchedulesDays(state.options))
        } else {
            let scheduleOptions = schedulesGenerator(state)
            dispatch({ type: "addScheduleOptions", scheduleOptions })
            setSchedulesDays(generateSchedulesDays(scheduleOptions))
        }
    }, []);

    const handleOptionChange = (value) => {
        console.log(value);
        if (0 <= value && value <= schedulesDays.length - 1) {
            console.log(schedulesDays[value]);
            console.log("TExt");
            setOptionIndex(value)
        }
    }


    const generateSchedulesDays = (options) => {
        let optionsDays = []
        console.log(options)
        console.log(state)
        options.forEach(option => {
            let days = {}
            option.forEach(lesson => {
                state.lesson[lesson].schedules.forEach(schedule => {
                    let { day, since, until } = schedule
                    day = day.toLowerCase()
                    until = toMinutes(until) / 60
                    since = toMinutes(since) / 60
                    let duration = until - since
                    let hour = { since, duration, lesson }
                    days[day] ? days[day].push(hour) : days[day] = [hour]
                })
            })
            optionsDays.push(days)
        });
        return optionsDays
    }



    return (
        <Flex flexDir="column" overflowY="auto" >
            <Flex justify="center" alignItems="baseline" m={4}>
                <IconButton
                    variant="unstyled"
                    aria-label="Previous Option"
                    fontSize="25px"
                    icon={<ChevronLeftIcon />}
                    onClick={() => { handleOptionChange(optionIndex - 1) }}
                />
                <Text fontSize="xl" mx={2}>Opction {optionIndex + 1}</Text>
                <IconButton
                    variant="unstyled"
                    aria-label="Next Option"
                    fontSize="25px"
                    icon={<ChevronRightIcon />}
                    onClick={() => { handleOptionChange(optionIndex + 1) }}
                />
            </Flex>
            <Calendar days={days} hours={hours} schedules={schedulesDays[optionIndex]} />
        </Flex >
    )
}

export default Horarios
