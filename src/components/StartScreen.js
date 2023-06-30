import { React, useState, useEffect } from "react"
import "../assets/css/index.css"
import lemonBlob from "../assets/images/lemon_blob.svg"
import babyBlueBlob from "../assets/images/baby_blue_blob.svg"
import { encode } from "html-entities"

encode("< > \" ' & © ∆")
// -> '&lt; &gt; &quot; &apos; &amp; © ∆'

encode("< ©", { mode: "nonAsciiPrintable" })
// -> '&lt; &copy;'

encode("< ©", { mode: "nonAsciiPrintable", level: "xml" })
// -> '&lt; &#169;'

encode("< > \" ' & ©", { mode: "nonAsciiPrintableOnly", level: "xml" })
// -> '< > " \' & &#169;'

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
          <button className="button-primary" onClick={handleClick}>
            Back to start page
          </button>
          <h1 className="title">{questions.results[0].category} Questions</h1>
          {questions.results.map((question, index) => (
            <p key={`question-${index}`}>{question.question}</p>
          ))}
          <h2>{questions.results[0].question}</h2>
          <fieldset>
            <legend className="sr-only">Select a maintenance drone:</legend>
            <input type="radio" id="one" name="quiz" value="huey" />
            <label htmlFor="one" className="button">
              {questions.results[0].correct_answer}
            </label>

            <input type="radio" id="two" name="quiz" value="dewey" />
            <label htmlFor="two" className="button">
              {questions.results[0].incorrect_answers[0]}
            </label>

            <input type="radio" id="three" name="quiz" value="louie" />
            <label htmlFor="three" className="button">
              {questions.results[0].incorrect_answers[1]}
            </label>

            <input type="radio" id="four" name="quiz" value="louie" />
            <label htmlFor="four" className="button">
              {questions.results[0].incorrect_answers[2]}
            </label>
          </fieldset>
          <hr className="question-divider" />
        </div>
      )}
    </section>
  )
}
