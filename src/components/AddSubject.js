import {
    Button,
    Popover,
    PopoverArrow,
    PopoverContent,
    PopoverTrigger,
    useColorMode
} from "@chakra-ui/react";
import { useRef } from 'react';
import { FormAddSubject } from "./FormAddSubject";


export const AddSubject = ({ isOpen, onToggle }) => {
    const { colorMode } = useColorMode()
    const bgColor = { light: 'gray.100', dark: 'gray.600' }
    const initialInpuRef = useRef()

    return (
        < Popover
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
                <FormAddSubject onToggle={onToggle} initialInpuRef={initialInpuRef} />
            </PopoverContent>
        </Popover >
    )
}
