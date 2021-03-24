const initialData = {
    lesson: {
        "lesson-1": { subjectId: "subject-1", id: "lesson-1", teacher: "Catedra", lessonCode: "15b", schedules: [{ day: "Lunes", since: "18:00", until: "20:00" }, { day: "Martes", since: "8:00", until: "11:00" }] },
        "lesson-2": { subjectId: "subject-1", id: "lesson-2", teacher: "Catedra", lessonCode: "14a", schedules: [{ day: "Lunes", since: "10:00", until: "12:00" }, { day: "Martes", since: "10:00", until: "13:00" }, { day: "Martes", since: "15:00", until: "18:00" }] },
        "lesson-3": { subjectId: "subject-2", id: "lesson-3", teacher: "Catedra", lessonCode: "1b", schedules: [{ day: "Lunes", since: "10:00", until: "12:00" }, { day: "Martes", since: "12:00", until: "15:00" }] },
        "lesson-4": { subjectId: "subject-3", id: "lesson-4", teacher: "Catedra", lessonCode: "4b", schedules: [{ day: "Jueves", since: "10:00", until: "12:00" }, { day: "Miercoles", since: "12:00", until: "15:00" }] },
    },
    subjects: {
        "subject-1": { id: "subject-1", name: "Materia_1", code: 1, lessonIds: ["lesson-1", "lesson-2"] },
        "subject-2": { id: "subject-2", name: "Materia_2", code: 2, lessonIds: ["lesson-3"] },
        "subject-3": { id: "subject-3", name: "Materia_3", code: 3, lessonIds: ["lesson-4"] },
    },
    subjectOrder: ["subject-1", "subject-2", "subject-3"]
}

export default initialData
