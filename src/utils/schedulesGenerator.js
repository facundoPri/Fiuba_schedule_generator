let initialData
initialData = {
    lesson: {
        "lesson-1": { id: "lesson-1", teacher: "Catedra", lessonCode: "15b", schedules: [{ day: "Lunes", since: "18:00", until: "20:00" }, { day: "Martes", since: "8:00", until: "11:00" }] },
        "lesson-2": { id: "lesson-2", teacher: "Catedra", lessonCode: "14a", schedules: [{ day: "Lunes", since: "10:00", until: "12:00" }, { day: "Martes", since: "10:00", until: "13:00" }, { day: "Martes", since: "15:00", until: "18:00" }] },
        "lesson-3": { id: "lesson-3", teacher: "Catedra", lessonCode: "1b", schedules: [{ day: "Lunes", since: "10:00", until: "12:00" }, { day: "Martes", since: "12:00", until: "15:00" }] },
        "lesson-4": { id: "lesson-4", teacher: "Catedra", lessonCode: "4b", schedules: [{ day: "Jueves", since: "10:00", until: "12:00" }, { day: "Miercoles", since: "12:00", until: "15:00" }] },
    },
    subjects: {
        "subject-1": { id: "subject-1", name: "Materia", code: 75.52, lessonIds: ["lesson-1", "lesson-2"] },
        "subject-2": { id: "subject-2", name: "Materia", code: 75.52, lessonIds: ["lesson-3"] },
        "subject-3": { id: "subject-3", name: "Materia", code: 75.52, lessonIds: ["lesson-4"] },
    },
    subjectOrder: ["subject-1", "subject-2", "subject-3"]
}

schedule1 = [{ day: "Lunes", since: "18:00", until: "20:00" }, { day: "Martes", since: "8:00", until: "11:00" }]
schedule2 = [{ day: "Lunes", since: "10:00", until: "12:00" }, { day: "Martes", since: "10:00", until: "12:00" }, { day: "Martes", since: "15:00", until: "18:00" }]
schedule3 = [{ day: "Lunes", since: "10:00", until: "12:00" }, { day: "Martes", since: "12:00", until: "15:00" }]

function toMinutes(time) {
    let hms = time.split(":")
    let minutes = (+hms[0]) * 60 + (+hms[1])
    return minutes
}


function checkScheduleCompability(schedule1, schedule2) {
    let days = {}
    let compatible = true
    schedule1.concat(schedule2).map(schedule => (days[schedule.day] = days[schedule.day] || []).push(schedule))
    for (day in days) {
        // console.log(days[day])
        days[day].sort((a, b) => {
            let aMin = toMinutes(a.since)
            let bMin = toMinutes(b.since)
            if (aMin > bMin) { return 1 }
            if (aMin < bMin) { return -1 }
            return 0
        })
        // console.log(days[day])
        for (let i = 0; i < days[day].length; i++) {
            if (i == 0) continue
            // console.log(i)
            let actual = days[day][i]
            let anterior = days[day][i - 1]
            // console.log(anterior)
            // console.log(actual)
            if (toMinutes(anterior.until) > toMinutes(actual.since)) {
                compatible = false
                return compatible
            }
        }
    }
    return compatible
}
// console.log(initialData)
let data = {}
Object.entries(initialData.subjects).map(value => data[value[0]] = value[1].lessonIds)
console.log(data)
let { subjectOrder } = initialData

function generateCombination(lessonsObjects, subjectOrder, lessons) {
    let combination = {}
    subjectOrder.forEach((subjectId1, index1) => {
        subjectOrder.forEach((subjectId2, index2) => {
            if (index1 >= index2) { return }
            lessonsObjects[subjectId1].forEach(lesson1 => {
                lessonsObjects[subjectId2].forEach(lesson2 => {
                    lessonsValue1 = lessons[lesson1]
                    lessonsValue2 = lessons[lesson2]
                    if (checkScheduleCompability(lessonsValue1.schedules, lessonsValue2.schedules)) {
                        combination[lesson1] = combination[lesson1] || {}
                        combination[lesson1][subjectId2] = combination[lesson1][subjectId2] || []
                        combination[lesson1][subjectId2].push(lesson2)

                        combination[lesson2] = combination[lesson2] || {}
                        combination[lesson2][subjectId1] = combination[lesson2][subjectId1] || []
                        combination[lesson2][subjectId1].push(lesson1)

                        // combination[lesson1] = combination[lesson1] || []
                        // combination[lesson1].push(lesson2)

                        // combination[lesson2] = combination[lesson2] || []
                        // combination[lesson2].push(lesson1)
                    }
                })
            })
        })
    })
    return combination
}

let lessonCombintations = generateCombination(data, subjectOrder, initialData.lesson)
// console.log(checkScheduleCompability(schedule1, schedule3))
console.log(lessonCombintations);

// TODO: Chequear que el usuario no agrege dos horarios iguales para la misma materia
// TODO: Agredar la materia que pertenece cada lesson a la lesson (subjectId)

// test = [1, 2, 3]
// tests = {
//         1: ["a", "b", "c"],
//         2: ["d", "e", "f", "g", "h", "i", "j", "k"],
//         3: ["l", "m", "n", "o", "p"]
//     }
// let count = 0
// test.forEach((value, index, arr) => {
//         // console.log("1- " + tests[value])
//         // test[value]
//         arr.forEach((value2, index2) => {
//             if (index >= index2) {
//                 return
//             }
//             // console.log("2- " + tests[value2])
//             console.log(tests[value], tests[value2])
//             tests[value].forEach(value3 => {
//                 tests[value2].forEach(value4 => {
//                     console.log(value3, value4)
//                     count++
//                 })
//             })
//         })
//     })
// console.log(count)


function createCombinations(data, subjectList) {
    let combinations = []
    Object.keys(data).forEach((mainLesson) => {
        // console.log(mainLesson);
        // data[mainLesson].forEach((lesson) => {
        //     console.log(lesson);
        // })
    })

}

createCombinations(lessonCombintations, data)
