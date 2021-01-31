import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useColorMode
} from "@chakra-ui/react"
import { useRef } from 'react'

export const ModalAddClass = ({ isOpen, onClose }) => {
    const { colorMode } = useColorMode()
    const color = { light: 'black', dark: 'white' }
    const initialRef = useRef()

    return (
        <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent color={color[colorMode]}>
                <ModalHeader>Adicionar Catedra</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Curso</FormLabel>
                        <Input ref={initialRef} placeholder="Curso" borderColor="gray.400" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Catedra</FormLabel>
                        <Input placeholder="Catedra" borderColor="gray.400" />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Horarios</FormLabel>
                        <InputGroup >
                            <Select placeholder="Dia" borderRadius="0" color="gray.400" borderColor="gray.400">
                                <option value="lunes">Lunes</option>
                                <option value="martes">Martes</option>
                                <option value="miercoles">Miercoles</option>
                                <option value="jueves">Jueves</option>
                                <option value="viernes">Viernes</option>
                                <option value="sabado">Sabado</option>
                                <option value="domingo">Domingo</option>
                            </Select>
                            <Input borderRadius="0" placeholder="Desde" borderColor="gray.400" />
                            <Input borderRadius="0" placeholder="Hasta" borderColor="gray.400" />
                        </InputGroup>
                        <InputGroup >
                            <Select placeholder="Dia" borderRadius="0" color="gray.400" borderColor="gray.400">
                                <option value="lunes">Lunes</option>
                                <option value="martes">Martes</option>
                                <option value="miercoles">Miercoles</option>
                                <option value="jueves">Jueves</option>
                                <option value="viernes">Viernes</option>
                                <option value="sabado">Sabado</option>
                                <option value="domingo">Domingo</option>
                            </Select>
                            <Input borderRadius="0" placeholder="Desde" borderColor="gray.400" />
                            <Input borderRadius="0" placeholder="Hasta" borderColor="gray.400" />
                        </InputGroup>

                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        Save
            </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
