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

  function handleClick() {
    setIsStartScreen(prev => !prev)
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setQuestions(data)
          //   console.log(questions)
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
              <fieldset>
                <legend className="sr-only">Select a maintenance drone:</legend>
                <input type="radio" id={`one-${index}`} name="quiz" value="huey" />
                <label htmlFor={`one-${index}`} className="button">
                  {decode(question.correct_answer)}
                </label>
                <input type="radio" id={`two-${index}`} name="quiz" value="dewey" />
                <label htmlFor={`two-${index}`} className="button">
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
            </div>
          ))}

          <div className="button-container">
            <button className="button-secondary" onClick={handleClick}>
              Back to start page
            </button>

            <button className="button-primary" onClick={handleClick}>
              Check answers
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
