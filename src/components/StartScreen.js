import { React, useState, useEffect } from "react"
import "../assets/css/index.css"
import lemonBlob from "../assets/images/lemon_blob.svg"
import babyBlueBlob from "../assets/images/baby_blue_blob.svg"
import { decode } from "html-entities"

export default function StartScreen() {
  const [isStartScreen, setIsStartScreen] = useState(false)
  const [questions, setQuestions] = useState({
    question: "",
    correct_answer: "",
    incorrect_answers: "",
    category: "",
  })
  const [isAnswersChecked, setIsAnswersChecked] = useState(false)
  const [randomAnswers, setRandomAnswers] = useState([])

  function getRandomItem(set) {
    let items = Array.from(set)
    return items[Math.floor(Math.random() * items.length)]
  }

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
  }

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

  function handleClick() {
    setIsStartScreen(prev => !prev)
    // shuffleAnswers()
  }

  function handleCheckAnswers() {
    setIsAnswersChecked(prev => !prev)
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setQuestions(data)
        }
        return { errorCode: data.status }
      })
  }, [])

  return (
    <section>
      {!isStartScreen && (
        <div>
          <img src={lemonBlob} alt="" className="yellow-blob" />
          <img src={babyBlueBlob} alt="" className="blue-blob" />
          <div className="start-page">
            <h1>Quizzical - a Scrimba Project</h1>
            <p>Quiz yourself on some good ol' Trivia!</p>
            <button className="button-primary" onClick={handleClick}>
              Start quiz
            </button>
          </div>
        </div>
      )}
      {isStartScreen && (
        <div className="questions-container">
          <img src={lemonBlob} alt="" className="yellow-blob" />
          <img src={babyBlueBlob} alt="" className="blue-blob" />

          <h1 className="title">{questions.results[0].category} Questions</h1>
          {questions.results.map((question, index) => (
            <div key={`question-container-${index}`}>
              <h2 key={`question-${index}`}>{decode(question.question)}</h2>
              {/* {question.incorrect_answers} */}
              <br />
              {shuffle(question.incorrect_answers.map(answer => decode(`${answer}, `)))}
              <br />
              {question.incorrect_answers.map(answer => decode(`${answer}, `))}
              {/* {`${decode(question.correct_answer)} ${decode(question.incorrect_answers)}`} */}

              {/* <fieldset>
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
              </fieldset> */}
            </div>
          ))}

          <div className="button-container">
            <button className="button-secondary" onClick={handleClick}>
              Back to start page
            </button>

            <button className="button-primary" onClick={handleCheckAnswers}>
              Check answers
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
