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

  const [isAnswersChecked, setIsAnswersChecked] = useState('')
  const [isNewQuestion, setIsNewQuestions] = useState(false)
  const [score, setScore] = useState(0)
  const [isAlreadyRendered, setIsAlreadyRendered] = useState(false)
  const [isErrorMessage, setIsErrorMessage] = useState(false)

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
    setIsAlreadyRendered(false)
  }

  function handleReturnToStartPage() {
    setIsStartScreen((prev) => !prev)
    setIsAnswersChecked(false)
    setIsAlreadyRendered((prev) => !prev)
    setIsErrorMessage(false)
  }

  function handleCheckAnswers() {
    const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked').length
    if (selectedAnswers === 5) {
      setIsAnswersChecked((prev) => !prev)
      setIsErrorMessage(false)
    } else {
      setIsErrorMessage(true)
    }
  }

  function handleNewQuestions() {
    setIsNewQuestions((prev) => !prev)
    setIsAnswersChecked(false)
    setIsErrorMessage(false)
  }

  useEffect(() => {
    const selectedAnswers = document.querySelectorAll('input[type="radio"]:checked').length
    const correctAnswers = document.querySelectorAll('.button.correct-answer.selected.incorrect-answer').length
    const selectedIncorrectAnswers = document.querySelectorAll(
      'input[type="radio"]:checked + label.selected-wrong-answer'
    ).length
    const numberOfCorrectAnswers = document.querySelectorAll(
      'input[type="radio"]:checked + label.correct-answer.selected'
    ).length
    if (isAnswersChecked && selectedAnswers < 5) {
      setScore(0)
      setIsErrorMessage(true)
    } else {
      setScore(numberOfCorrectAnswers)
    }
  }, [isAnswersChecked])

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

  useEffect(() => {
    const content = document.getElementById('main')
    const focusable = content.querySelectorAll('button, [href], input, [tabindex="0"]')
    const firstFocusable = focusable[0]
    isStartScreen && firstFocusable.focus()
  }, [isStartScreen])

  useEffect(() => {
    const content = document.getElementById('main')
    const focusable = content.querySelectorAll('button, [href], input, [tabindex="0"]')
    const firstFocusable = focusable[0]
    isAlreadyRendered && firstFocusable.focus()
  }, [isAlreadyRendered])

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
              <fieldset>
                <legend>
                  <h2 key={`question-${index}`}>
                    <span className="sr-only">Quiz question {index + 1}</span>
                    {decode(question.question)}
                  </h2>
                </legend>

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
                            ? 'correct-answer selected'
                            : 'selected-wrong-answer incorrect-answer')
                        }
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

          <section aria-live="polite">
            {isAnswersChecked && (
              <div
                style={{ textAlign: 'center', fontWeight: '700', fontSize: '1.5rem' }}
                className={isErrorMessage ? 'hidden' : ''}
              >
                <p>You scored {score} out of 5 correct answers</p>
              </div>
            )}
          </section>

          <section aria-live="polite">
            {isErrorMessage && (
              <div style={{ textAlign: 'center', fontWeight: '700', fontSize: '1.5rem' }}>
                <p>Please complete the quiz to calculate score.</p>
              </div>
            )}
          </section>

          <div className="button-container">
            <div className="top-button-container">
              <button className="button-primary" onClick={handleCheckAnswers}>
                Check answers
              </button>
              <button className="button-secondary" onClick={handleReturnToStartPage}>
                Back to start page
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
