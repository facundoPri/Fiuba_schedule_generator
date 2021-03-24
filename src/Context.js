import React, { useReducer } from 'react'
import initialData from './initial-data'
import { v4 as uuid } from "uuid";

const reducer = (state, action) => {
    switch (action.type) {
        case "reorderOnDragEnd":
            return action.state
        case "addSubject":
            {
                const newSubjectId = uuid()
                const newSubject = { id: newSubjectId, ...action.subject, lessonIds: [] }
                const newSubjectOrder = [...state.subjectOrder, newSubjectId]
                return {
                    ...state,
                    subjectOrder: newSubjectOrder,
                    subjects: {
                        ...state.subjects,
                        [newSubjectId]: newSubject
                    }
                }
            }
        case "addLesson":
            {
                const newLessonId = uuid()
                const newLesson = { id: newLessonId, ...action.lesson }
                let newSubject = { ...state.subjects[action.lesson.subjectId] }
                newSubject.lessonIds.push(newLessonId)
                return {
                    ...state,
                    lesson: {
                        ...state.lesson,
                        [newLessonId]: newLesson
                    },
                    subjects: {
                        ...state.subjects,
                        [newSubject.id]: newSubject
                    }
                }
            }
        case "addScheduleOptions":
            {
                return {
                    ...state,
                    options: action.scheduleOptions

                }
            }

    }
}

const StateContext = React.createContext()
const DispatchContext = React.createContext()

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialData)

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export { StateContext, DispatchContext, StateProvider }
