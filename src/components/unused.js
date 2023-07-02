//   const [randomAnswers, setRandomAnswers] = useState([])

//   function shuffleAnswers() {
//     const correctAnswer = questions.results[0].correct_answer
//     let incorrectAnswers = questions.results[0].incorrect_answers
//     const allAnswers = []
//     allAnswers.push(correctAnswer)
//     for (let i = 0; i < incorrectAnswers.length; i++) {
//       allAnswers.push(incorrectAnswers[i])
//     }
//     function shuffle(arr) {
//       let j = ""
//       let x = ""
//       let arrIndex = ""
//       for (arrIndex = arr.length - 1; arrIndex > 0; arrIndex--) {
//         j = Math.floor(Math.random() * (arrIndex + 1))
//         x = arr[arrIndex]
//         arr[arrIndex] = arr[j]
//         arr[j] = x
//       }
//       return arr
//     }
//     const results = shuffle(allAnswers)
//     setRandomAnswers(results)
//   }

//   function getRandomItem(set) {
//     let items = Array.from(set)
//     return items[Math.floor(Math.random() * items.length)]
//   }
