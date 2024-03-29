import { Box, Divider, Flex, Text } from '@chakra-ui/layout'
import { useState } from 'react'
import { subjectColorGenerator } from '../utils/subjectColorGenerator'
import { useColorMode } from '@chakra-ui/color-mode'
import { useDataStore } from '../Context'

const grid = {
  x: 80,
  y: 40
}

export const Calendar = function ({ days, hours, schedules }) {
  const { colorMode } = useColorMode()
  const [classColors, setClassColors] = useState({})

  const { subjects, lessons } = useDataStore(state => ({
    subjects: state.subjects,
    lessons: state.lessons
  }))

  return (
    <Flex flex={1}>
      <Box display='block' flexDir='column' mx={2}>
        <Flex h={grid.y + 'px'} />
        {hours.map((hour, index) => {
          return (
            <Flex
              key={`${hour}-${index}`}
              h={grid.y + 'px'}
              alignItems='flex-start'
              position='relative'
              top={-10 + 'px'}
            >
              <Text fontSize='md' minW='45px' align='end'>
                {hour}: 00
              </Text>
            </Flex>
          )
        })}
      </Box>
      <Flex flexDir='column' minW={2}>
        <Flex h={grid.y + 'px'} />
        {hours.map((hour, index) => {
          return (
            <Flex key={`${hour}-${index}`} h={grid.y + 'px'}>
              <Divider borderColor='' />
            </Flex>
          )
        })}
      </Flex>
      <Flex flexDir='column' flex={1}>
        <Flex flex={1} justify='space-around'>
          {days.map((day, index) => {
            return (
              <Flex
                key={`${day}-${index}`}
                minW={grid.x + 'px'}
                justify='center'
                alignContent='center'
              >
                <Text>{day.replace(day[0], day[0].toUpperCase())}</Text>
              </Flex>
            )
          })}
        </Flex>

        <Flex flex={1} justify='space-evenly'>
          {days.map((day, index) => {
            return (
              <>
                <Flex
                  key={`${day}-${index}`}
                  flex={1}
                  minW={grid.x + 'px'}
                  minH='40'
                  borderLeft={'1px solid'}
                  borderColor='gray.400'
                  position='relative'
                  flexDir='column'
                >
                  {hours.map((hour, index) => {
                    return (
                      <Flex
                        key={`${hour}-${index}`}
                        h={grid.y + 'px'}
                        borderTop='1px solid'
                        borderColor='gray.400'
                        minW={grid.x + 'px'}
                        position='relative'
                        top='0px'
                      ></Flex>
                    )
                  })}

                  {schedules &&
                    schedules[day] &&
                    schedules[day].map((schedule, index) => {
                      let { subjectId } = lessons[schedule.lesson]
                      let color
                      if (!classColors[subjectId]) {
                        color = subjectColorGenerator()
                        setClassColors({ ...classColors, [subjectId]: color })
                      } else {
                        color = classColors[subjectId]
                      }
                      console.log(color)

                      return (
                        <Flex
                          key={`${schedules.lesson}-${index}`}
                          flexDir='column'
                          bg={color[colorMode]}
                          minH={grid.y * schedule.duration - 1 + 'px'}
                          w='95%'
                          p={2}
                          position='absolute'
                          top={grid.y * (schedule.since - hours[0]) + 'px'}
                          borderRadius='md'
                          boxShadow='lg'
                        >
                          <Text>
                            {subjects[lessons[schedule.lesson].subjectId]?.code}-
                            {subjects[lessons[schedule.lesson].subjectId]?.name}
                          </Text>
                          <Text>
                            {lessons[schedule.lesson]?.lessonCode}-
                            {lessons[schedule.lesson]?.teacher}
                          </Text>
                        </Flex>
                      )
                    })}
                </Flex>
              </>
            )
          })}
        </Flex>
      </Flex>
    </Flex>
  )
}
