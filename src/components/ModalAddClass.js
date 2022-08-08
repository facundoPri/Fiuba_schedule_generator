import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useColorMode
} from "@chakra-ui/react";
import { useRef } from 'react';
import { FormAddLesson } from './FormAddLesson';

export const ModalAddClass = ({ isOpen, onClose, subjectId }) => {
    const { colorMode } = useColorMode()
    const color = { light: 'black', dark: 'white' }
    const initialRef = useRef()
    // TODO: use global state for this
    return (
        <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
        >
            <ModalOverlay />
            <ModalContent color={color[colorMode]}>
                <ModalHeader>Adicionar Catedra</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormAddLesson onClose={onClose} initialRef={initialRef} subjectId={subjectId} />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}
