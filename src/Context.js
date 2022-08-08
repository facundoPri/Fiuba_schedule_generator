import initialData from './initial-data'
import { v4 as uuid } from 'uuid'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { schedulesGenerator } from './utils/schedulesGenerator_v2'

export const useDataStore = create(
  persist(
    (set, get) => ({
      lessons: {},
      subjects: {},
      subjectsOrder: [],
      options: [],
      addSubject: subject =>
        set(state => {
          const newSubjectId = uuid()
          const newSubject = {
            id: newSubjectId,
            ...subject,
            lessonIds: []
          }
          const newSubjectsOrder = [...state.subjectsOrder, newSubjectId]
          return {
            subjects: { ...state.subjects, [newSubjectId]: newSubject },
            subjectsOrder: newSubjectsOrder
          }
        }),
      addLesson: lesson =>
        set(state => {
          const newLessonId = uuid()
          const newLesson = { id: newLessonId, ...lesson }
          let newSubject = { ...state.subjects[lesson.subjectId] }
          newSubject.lessonIds.push(newLessonId)
          return {
            subjects: { ...state.subjects, [newSubject.id]: newSubject },
            lessons: { ...state.lessons, [newLessonId]: newLesson }
          }
        }),
      deleteSubject: subjectId =>
        set(state => {
          let newLessons = { ...state.lessons }
          const subject = state.subjects[subjectId]
          subject.lessonIds.map(lessonId => {
            delete newLessons[lessonId]
          })
          let newSubjectsOrder = state.subjectsOrder.filter(subject => {
            return subject !== subjectId
          })

          let newSubjects = { ...state.subjects }
          delete newSubjects[subjectId]

          return {
            subjects: newSubjects,
            lessons: newLessons,
            subjectsOrder: newSubjectsOrder
          }
        }),
      addScheduleOptions: options =>
        set(state => ({
          options
        })),
      createScheduleOptions: options =>
        set(state => ({
          options: schedulesGenerator(state)
        })),
      reorderOnDragEnd: ({ destination, source, draggableId }) => {
        if (!destination) {
          return
        }

        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return
        }

        const subject = get().subjects[source.droppableId]
        const newLessonIds = Array.from(subject.lessonIds)
        newLessonIds.splice(source.index, 1)
        newLessonIds.splice(destination.index, 0, draggableId)

        const newSubject = {
          ...subject,
          lessonIds: newLessonIds
        }

        set(state => {
          return {
            subjects: {
              ...state.subjects,
              [newSubject.id]: newSubject
            }
          }
        })
      }
    }),
    {
      name: 'schedulerLocalState',
      getStorage: () => localStorage
    }
  )
)