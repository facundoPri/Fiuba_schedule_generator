import { useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { AddSubject } from '../components/AddSubject'
import { Card } from '../components/Card'
import { Content } from '../components/Content'
import { ModalAddClass } from '../components/ModalAddClass'
import { useDataStore } from '../ContextZustand'

const Index = () => {
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal
  } = useDisclosure()
  const {
    isOpen: isOpenAddSubject,
    onToggle: onToggleAddSubject
  } = useDisclosure()
  const [subjectIdModal, setSubjectIdModal] = useState('')

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
                  setSubjectIdModal(subjectId)
                  onOpenModal()
                }}
              />
            )
          })}
        </DragDropContext>
        <AddSubject isOpen={isOpenAddSubject} onToggle={onToggleAddSubject} />
      </Content>
      <ModalAddClass
        isOpen={isOpenModal}
        onOpen={onOpenModal}
        subjectId={subjectIdModal}
        onClose={() => {
          onCloseModal()
          setSubjectIdModal('')
        }}
      />
    </>
  )
}

export default Index
