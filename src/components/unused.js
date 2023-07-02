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

//   function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1))
//       ;[a[i], a[j]] = [a[j], a[i]]
//     }
//     return a
//   }

// shuffleAnswers()

/* {(allAnswers = shuffle(question.correct_answer, question.incorrect_answers))} */
/* {allAnswers.map(answer => (
            <label key={`label-${index++}`} htmlFor="" className="button">
                {answer}
            </label>
            ))} */

/* {shuffle(question.correct_answer, question.incorrect_answers).map(answer => (
                <label htmlFor="" className="button">
                  {answer}
                </label>
              ))}
              <br /> */

/* <fieldset>
    <legend className="sr-only">Quiz question:</legend>
    <input type="radio" id={`one-${index}`} name="quiz" value="huey" />
    <label htmlFor={`one-${index}`} className={`button ${isAnswersChecked && `correct-answer`}`}>
        {decode(question.correct_answer)}
    </label>
    <input type="radio" id={`two-${index}`} name="quiz" value="dewey" />
    <label htmlFor={`two-${index}`} className={`button ${isAnswersChecked && `wrong-answer`}`}>
        {decode(question.incorrect_answers[0])}
    </label>

    <input type="radio" id={`three-${index}`} name="quiz" value="louie" />
    <label htmlFor={`three-${index}`} className="button">
        {decode(question.incorrect_answers[1])}
    </label>

    <input type="radio" id={`four-${index}`} name="quiz" value="louie" />
    <label htmlFor={`four-${index}`} className="button">
        {decode(question.incorrect_answers[2])}
    </label>
    <hr className="question-divider" />
</fieldset> 
*/
