import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode
} from '@chakra-ui/react'
import { useRef } from 'react'
import { FormLesson } from './FormLesson'
import create from 'zustand'

export const useLessonModal = create(set => ({
  isOpen: false,
  lesson: {},
  subjectId: '',
  onOpen: subjectId => set(state => ({ isOpen: true, subjectId })),
  onClose: () => set(state => ({ isOpen: false })),
  onToggle: () => set(state => ({ isOpen: !state.isOpen })),
  setLessonToEdit: lesson => set(state => ({ lesson })),
  resetLessonToEdit: () => set(state => ({ lesson: {} }))
}))

export const ModalLesson = () => {
  const { colorMode } = useColorMode()
  const color = { light: 'black', dark: 'white' }
  const initialRef = useRef()
  const { isOpen, onClose, subjectId } = useLessonModal(state => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
    subjectId: state.subjectId
  }))
  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      size='lg'
    >
      <ModalOverlay />
      <ModalContent color={color[colorMode]}>
        <ModalHeader>Adicionar Catedra</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormLesson
            onClose={onClose}
            initialRef={initialRef}
            subjectId={subjectId}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
