import { React, useState, useEffect } from 'react'
import '../assets/css/index.css'
import lemonBlob from '../assets/images/lemon_blob.svg'
import babyBlueBlob from '../assets/images/baby_blue_blob.svg'
import { decode } from 'html-entities'

export default function StartScreen() {
  const [isStartScreen, setIsStartScreen] = useState(false)
  const [questions, setQuestions] = useState({
    question: '',
    correct_answer: '',
    incorrect_answers: '',
    category: '',
  })
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setQuestions(data)
        }
        return { errorCode: data.status }
      })
  }, [])

  function shuffle(a, b) {
    let c = [a]
    b.push(c)
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[b[i], b[j]] = [b[j], b[i]]
    }
    return b
  }

  function handleClick() {
    setIsStartScreen((prev) => !prev)
  }

  function getUniqueKey(string) {
    // let string = "  casey ocampo  "
    string = string.replace(/\s+/g, '')
    console.log(string)
    return string
  }

  return (
    <section>
      {!isStartScreen && (
        <div>
          <img src={lemonBlob} alt="" className="yellow-blob" />
          <img src={babyBlueBlob} alt="" className="blue-blob" />
          <div className="start-page">
            <h1>Quizzical - a Solo Scrimba Project</h1>
            <p style={{ maxWidth: '500px', textAlign: 'left' }}>
              As a student of the Scrimba Front End Development Career Path, we were given a Figma file and set of
              instructions to complete this project.
            </p>
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
            <div key={`question-container-${index}`} id={`question-container-${index}`}>
              <h2 key={`question-${index}`}>{decode(question.question)}</h2>

              {shuffle(question.correct_answer, question.incorrect_answers).map((answer, index) => (
                <fieldset
                  key={`${getUniqueKey(decode(question.correct_answer))}-answer-container-${index}`}
                  id={`${getUniqueKey(decode(question.correct_answer))}-answer-container-${index}`}
                >
                  <input
                    type="radio"
                    id={`${getUniqueKey(decode(question.correct_answer))}-${index}`}
                    name={`${getUniqueKey(decode(question.correct_answer))}`}
                    value="huey"
                  />
                  <label htmlFor={`${getUniqueKey(decode(question.correct_answer))}-${index}`} className="button">
                    {decode(answer)}
                  </label>
                </fieldset>
              ))}

              <br />
            </div>
          ))}

          <div className="button-container">
            <button className="button-secondary" onClick={handleClick}>
              Back to start page
            </button>

            {/* <button className="button-primary" onClick={handleCheckAnswers}>
              Check answers
            </button> */}
          </div>
        </div>
      )}
    </section>
  )
}
