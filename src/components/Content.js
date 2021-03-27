import { Box, Flex } from '@chakra-ui/react'
import { Card } from './Card.js';

export const Content = (props) => {
    return (
        <Flex alignItems="flex-start" mt={2} px={1} overflowX="auto" flexGrow={1} {...props} />
    )
}
