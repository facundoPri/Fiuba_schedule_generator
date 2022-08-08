import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { AddSubject } from '../components/AddSubject'
import { Card } from '../components/Card'
import { Content } from '../components/Content'
import { ModalAddClass } from '../components/ModalAddClass'
import { ModalLesson, useLessonModal } from '../components/ModalLesson'
import { useDataStore } from '../Context'

const Index = () => {
  const {onOpenModal, onCloseModal} = useLessonModal(state => ({
    onOpenModal: state.onOpen,
    onCloseModal: state.onClose
    }))
  const {
    isOpen: isOpenAddSubject,
    onToggle: onToggleAddSubject
  } = useDisclosure()

  const { subjectsOrder, subjects, lessons,reorderOnDragEnd } = useDataStore(state => ({
    subjectsOrder: state.subjectsOrder,
    subjects: state.subjects,
    lessons: state.lessons,
    reorderOnDragEnd: state.reorderOnDragEnd
  }))
  console.log({ subjectsOrder, subjects, lessons })

  return (
    <>
      <Content>
        <DragDropContext
          onDragEnd={result => reorderOnDragEnd(result)}
        >
          {subjectsOrder?.map(subjectId => {
            const subject = subjects[subjectId]
            const subjectLessons = subject.lessonIds.map(lessonId => lessons[lessonId])

            return (
              <Card
                key={subject.id}
                subject={subject}
                lessons={subjectLessons}
                openModal={() => {
                  onOpenModal(subjectId)
                }}
              />
            )
          })}
        </DragDropContext>
        <AddSubject isOpen={isOpenAddSubject} onToggle={onToggleAddSubject} />
      </Content>
      <ModalLesson />
    </>
  )
}

export default Index
