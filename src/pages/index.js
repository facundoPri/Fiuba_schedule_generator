import { useDisclosure } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { AddSubject } from '../components/AddSubject'
import { Card } from "../components/Card"
import { Content } from '../components/Content'
import { ModalAddClass } from '../components/ModalAddClass'
import { DispatchContext, StateContext } from '../Context'


function onDragEnd(result, state, dispatch) {
  const { destination, source, draggableId } = result;

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const subject = state.subjects[source.droppableId]
  const newLessonIds = Array.from(subject.lessonIds)
  newLessonIds.splice(source.index, 1)
  newLessonIds.splice(destination.index, 0, draggableId)

  const newSubject = {
    ...subject,
    lessonIds: newLessonIds
  }

  const newState = {
    ...state,
    subjects: {
      ...state.subjects,
      [newSubject.id]: newSubject,
    }
  }

  dispatch({ type: 'reorderOnDragEnd', state: newState })

}

const Index = () => {
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure()
  const { isOpen: isOpenAddSubject, onToggle: onToggleAddSubject } = useDisclosure()
  const [subjectIdModal, setSubjectIdModal] = useState("")

  const state = useContext(StateContext)
  const dispatch = useContext(DispatchContext);

  return (<>
    <Content>
      <DragDropContext onDragEnd={(result) => (onDragEnd(result, state, dispatch))}>
        {state.subjectOrder.map(subjectId => {
          const subject = state.subjects[subjectId]
          const lessons = subject.lessonIds.map(lessonId => state.lesson[lessonId])

          return (
            <Card key={subject.id} subject={subject} lessons={lessons} openModal={() => { setSubjectIdModal(subjectId); onOpenModal() }} />
          )
        })}
      </DragDropContext>
      <AddSubject isOpen={isOpenAddSubject} onToggle={onToggleAddSubject} />
    </Content>
    <ModalAddClass isOpen={isOpenModal} onOpen={onOpenModal} subjectId={subjectIdModal} onClose={() => { onCloseModal(); setSubjectIdModal("") }} />
  </>
  )
}

export default Index
