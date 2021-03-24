import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import { useState } from "react";
import ScrollbarSize from 'react-scrollbar-size';

const grid = {
  x: 80,
  y: 40
}

export const Calendar = function({ days, hours }) {


  const [scrollbarCurrentWidth, setWidth] = useState(0);

  const scrollbarSizeChange = ({ width }) => {
    if (width !== scrollbarCurrentWidth) {
      setWidth(width);
    }
  };
  return (

    <Flex flexDir='column' overflowY="auto">
      <ScrollbarSize onChange={scrollbarSizeChange} />
      {/* {/\*Spacer for the fixed day bar*\/} */}
      {/* <Flex flex="1 1 auto"> */}
      {/*   <Flex minW="44px" mx={2} /> */}
      {/*   <Flex minW="7px" /> */}
      {/*   <Flex flex="1 1 auto" h="40px" mt={3} alignItems="stretch"> */}
      {/*   </Flex> */}
      {/* </Flex> */}

      {/*Day bar*/}
      <Flex flex="1 1 auto" w="100vw" bg="gray.200">
        <Flex minW="44px" mx={2} />
        <Flex minW="7px" />
        <Flex flex="1 1 auto" h="40px" mt={3} alignItems="stretch">
          {days.map((day, index) => {
            return (
              <Flex justify="center" alignItems="center" flex="1" minW={grid.x + "px"}>{day}</Flex>
            );
          })}
        </Flex>
        {/* <Flex w={scrollbarCurrentWidth + "px"} /> */}
      </Flex>
      <Flex flex="1 1 auto" >
        {/*Hour counter*/}
        <Box display="block" flexDir="column" minW="44px" mx={2}>
          <Flex h={grid.y + 'px'} />
          {hours.map(hour => {
            return (
              <Flex h={grid.y + 'px'} minW="44px" justifyContent="flex-end" alignItems="flex-start" position="relative" top={-10 + "px"}>
                <Text fontSize="md" minW="44px">
                  {hour}: 00
                </Text>
              </Flex>
            );
          })}
        </Box>
        <Flex borderRight="1px solid #000" flexDir="column" minW={2}>
          <Flex h={grid.y + 'px'} />
          {hours.map((hour, index) => {
            return (
              <Flex h={grid.y + 'px'}>
                <Divider borderColor="#000" />
              </Flex>
            );
          })}
        </Flex>
        <Flex flex="1 1 auto" justifyContent="space-around">
          {days.map((day, index) => {
            return (
              <Flex flex="1" borderRight="1px solid #000" flexDir="column">
                <Flex h={grid.y + 'px'} />
                {hours.map((hour, index) => {
                  return (
                    <Flex h={grid.y + 'px'} borderTop="1px solid #000" minW={grid.x + "px"}>
                      {/* {day},{hour} */}
                    </Flex>

                  );
                })}
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex >
  );
}
