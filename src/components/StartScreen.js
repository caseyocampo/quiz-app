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

  const [isAnswersChecked, setIsAnswersChecked] = useState(false)
  const [isNewQuestion, setIsNewQuestions] = useState(false)

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple')
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setQuestions(data)
        }
        return { errorCode: data.status }
      })
  }, [isNewQuestion])

  function handleClick() {
    setIsStartScreen((prev) => !prev)
  }

  function handleReturnToStartPage() {
    setIsStartScreen((prev) => !prev)
    setIsAnswersChecked(false)
  }

  function handleCheckAnswers() {
    setIsAnswersChecked((prev) => !prev)
  }

  function handleNewQuestions() {
    setIsNewQuestions((prev) => !prev)
    setIsAnswersChecked(false)
  }

  function getUniqueKey(string) {
    string = string.replace(/\s+/g, '')
    return string
  }

  function shuffle(a, b) {
    let c = a
    b.push(c)
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[b[i], b[j]] = [b[j], b[i]]
    }
    const oldArr = b
    const newArr = [...new Set(oldArr)]
    return newArr
  }

  function getUniqueKey(string) {
    string = string.replace(/\s+/g, '')
    return string
  }

  return (
    <section>
      {!isStartScreen && (
        <div>
          <img src={lemonBlob} alt="" className="blob yellow-blob" />
          <img src={babyBlueBlob} alt="" className="blob blue-blob" />
          <div className="start-page">
            <h1>Quizzical - a Solo Scrimba Project</h1>
            <p style={{ maxWidth: '500px', textAlign: 'left' }}>
              To continue my React education, I've joined the{' '}
              <a href="https://scrimba.com/learn/frontend">Scrimba Front End Development Career Path</a>. We were given
              a Figma file and set of instructions to complete this assignment. This is the finished project. Enjoy!
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
              <fieldset>
                <legend className="sr-only">Quiz question</legend>
                {shuffle(question.correct_answer, question.incorrect_answers)
                  .sort()
                  .map((answer, index) => (
                    <span
                      style={{ display: 'inline-block' }}
                      key={`${getUniqueKey(decode(question.correct_answer))}-fieldset-${index}`}
                      id={`${getUniqueKey(decode(question.correct_answer))}-fieldset-${index}`}
                    >
                      <input
                        type="radio"
                        id={`${getUniqueKey(decode(question.correct_answer))}-${index}`}
                        name={`${getUniqueKey(decode(question.correct_answer))}`}
                        value={decode(question.correct_answer)}
                      />
                      <label
                        htmlFor={`${getUniqueKey(decode(question.correct_answer))}-${index}`}
                        className={`button ${
                          isAnswersChecked &&
                          (decode(question.correct_answer) == decode(answer)
                            ? 'correct-answer'
                            : 'selected-wrong-answer')
                        }
                            ${isAnswersChecked && 'incorrect-answer'}
                            `}
                      >
                        {decode(answer)}
                      </label>
                    </span>
                  ))}
              </fieldset>
              <hr className="question-divider" />
            </div>
          ))}

          <div className="button-container">
            <div className="top-button-container">
              <button className="button-secondary" onClick={handleReturnToStartPage}>
                Back to start page
              </button>

              <button className="button-primary" onClick={handleCheckAnswers}>
                Check answers
              </button>
            </div>
            <button className="button-secondary bottom-button" onClick={handleNewQuestions}>
              Load new questions
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
