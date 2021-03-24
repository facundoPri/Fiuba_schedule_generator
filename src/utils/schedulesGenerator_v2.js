// let initialData
// initialData = {
//   lesson: {
//     "lesson-1": { id: "lesson-1", teacher: "Catedra", lessonCode: "15b", schedules: [{ day: "Lunes", since: "18:00", until: "20:00" }, { day: "Martes", since: "8:00", until: "11:00" }] },
//     "lesson-2": { id: "lesson-2", teacher: "Catedra", lessonCode: "14a", schedules: [{ day: "Lunes", since: "10:00", until: "12:00" }, { day: "Martes", since: "10:00", until: "13:00" }, { day: "Martes", since: "15:00", until: "18:00" }] },
//     "lesson-3": { id: "lesson-3", teacher: "Catedra", lessonCode: "1b", schedules: [{ day: "Lunes", since: "10:00", until: "12:00" }, { day: "Martes", since: "12:00", until: "15:00" }] },
//     "lesson-4": { id: "lesson-4", teacher: "Catedra", lessonCode: "4b", schedules: [{ day: "Jueves", since: "10:00", until: "12:00" }, { day: "Miercoles", since: "12:00", until: "15:00" }] },
//   },
//   subjects: {
//     "subject-1": { id: "subject-1", name: "Materia", code: 75.52, lessonIds: ["lesson-1", "lesson-2"] },
//     "subject-2": { id: "subject-2", name: "Materia", code: 75.52, lessonIds: ["lesson-3"] },
//     "subject-3": { id: "subject-3", name: "Materia", code: 75.52, lessonIds: ["lesson-4"] },
//   },
//   subjectOrder: ["subject-1", "subject-2", "subject-3"]
// }

// receive a time string (hh:mm) and return it value in minutes
export function toMinutes(time) {
  let hms = time.split(":")
  let minutes = (+hms[0]) * 60 + (+hms[1])
  return minutes
}

// receive two schedules arrays and return if they overlap or not
function checkScheduleCompability(schedule1, schedule2) {
  let days = {}
  let compatible = true
  schedule1.concat(schedule2).map(schedule => (days[schedule.day] = days[schedule.day] || []).push(schedule))
  for (let day in days) {
    days[day].sort((a, b) => {
      let aMin = toMinutes(a.since)
      let bMin = toMinutes(b.since)
      if (aMin > bMin) { return 1 }
      if (aMin < bMin) { return -1 }
      return 0
    })
    for (let i = 0; i < days[day].length; i++) {
      if (i == 0) continue
      let actual = days[day][i]
      let anterior = days[day][i - 1]
      if (toMinutes(anterior.until) > toMinutes(actual.since)) {
        compatible = false
        return compatible
      }
    }
  }
  return compatible
}

// receive a lesson id and return it subject
function find_subject(lessonId, data) {
  let subjectId = data.subjectOrder.find(subject => data.subjects[subject].lessonIds.includes(lessonId))
  return subjectId
}

// Receive an objects with all the subjects and it lessons, an array with the order of the subjects and a object with the lessons info
function generateCompabilityList(subjectsObject, subjectOrder, lessons) {
  let combination = {}
  subjectOrder.forEach((subjectId1, index1) => {
    subjectOrder.forEach((subjectId2, index2) => {
      if (index1 >= index2) { return }
      subjectsObject[subjectId1].forEach(lesson1 => {
        subjectsObject[subjectId2].forEach(lesson2 => {
          let lessonsValue1 = lessons[lesson1]
          let lessonsValue2 = lessons[lesson2]
          if (checkScheduleCompability(lessonsValue1.schedules, lessonsValue2.schedules)) {

            combination[lesson1] = combination[lesson1] || []
            combination[lesson1].push(lesson2)

            combination[lesson2] = combination[lesson2] || []
            combination[lesson2].push(lesson1)
          }
        })
      })
    })
  })
  return combination
}


// Receive an array and return an array with the values that repeats
function removeUniquesValues(array) {
  let result = []
  while (array.length > 0) {
    let lastValue = array.pop()
    if (array.includes(lastValue) && !result.includes(lastValue)) {
      result.push(lastValue)
    }
  }
  return result
}

// Receive a lessonId and an object with all the lessons and it compabilities
// TODO: Loot of room to improvement
function create_combinations(lessonId, lessonCompabilities, possibleCombination = [], combination = [], combinations = []) {

  if (combination.length == 0) {
    possibleCombination = lessonCompabilities[lessonId]
  } else {
    possibleCombination = removeUniquesValues(possibleCombination.concat(lessonCompabilities[lessonId]))
  }

  combination = combination.concat(lessonId)

  // if (possibleCombination.length == 0) {

  //   combinations.push(combination)
  //   combination = []
  // }
  possibleCombination.forEach(lesson => {
    lessonCompabilities[lesson] = lessonCompabilities[lesson].filter(l => l != lessonId)
    return create_combinations(lesson, lessonCompabilities, possibleCombination, combination, combinations)
  })

  combinations.push(combination)
  combination = []
  return combinations
}

// Receive an array and a value, return the score for the value
function calculateScore(value, arr) {
  len = arr.length
  index = arr.indexOf(value)
  return ((len - index) / len) * 10
}

// function for the sorting
// TODO: Improve sorting function
function sortCombinations(combinationA, combinationB) {
  return combinationB.length - combinationA.length
}

export function schedulesGenerator(data) {
  let subjectsObject = {}
  Object.entries(data.subjects).map(value => subjectsObject[value[0]] = value[1].lessonIds)
  let { subjectOrder, lesson } = data

  let lessonCompability = generateCompabilityList(subjectsObject, subjectOrder, lesson)

  let combinations = []
  subjectsObject[subjectOrder[0]].forEach(lesson => {
    combinations.push(...create_combinations(lesson, lessonCompability))
  })

  return combinations.sort(sortCombinations)
}
