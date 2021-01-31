import { Box, Flex } from '@chakra-ui/react'
import { Card } from './Card.js';

export const Content = (props) => {
    return (
        <Flex alignItems="flex-start" m={2} overflowX="scroll" flexGrow={1} {...props} />
    )
}
