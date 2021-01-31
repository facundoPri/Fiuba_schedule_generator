import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    Flex,
    Input,
    Button,
    useColorMode,
} from "@chakra-ui/react"
import { useRef } from 'react';
export const AddSubject = ({ isOpen, onToggle }) => {
    const { colorMode } = useColorMode()
    const bgColor = { light: 'gray.100', dark: 'gray.600' }
    const color = { light: 'black', dark: 'white' }
    const initialInpuRef = useRef()

    return (
        <Popover
            placement="right"
            initialFocusRef={initialInpuRef}
            isOpen={isOpen}
            onOpen={onToggle}
            onClose={onToggle}

        >
            <PopoverTrigger>
                <Button m={1} h={76} bg={bgColor[colorMode]} variant="solid" onClick={() => (onToggle())}>
                    +
            </Button>
            </PopoverTrigger>
            <PopoverContent bg={bgColor[colorMode]} p={3} border={0}>
                <PopoverArrow bg={bgColor[colorMode]} />
                <form onSumbit={(e) => (e.preventDefault() /* && onToggle() */)}>
                    <Flex w={300} minW={300} borderRadius="md" alignItems="center">
                        <Input placeholder="Codigo" borderEndRadius="none" ref={initialInpuRef} isRequired />
                        <Input placeholder="Materia" borderStartRadius="none" isRequired />
                        <Button type="submit" ml={2} px={5} color={color[colorMode]} /* onClick={onToggle} */>Crear</Button>
                    </Flex>
                </form>
            </PopoverContent>
        </Popover>
    )
}
