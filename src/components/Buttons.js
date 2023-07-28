export default function Buttons({ handleCheckAnswers, handleReturnToStartPage, handleNewQuestions }) {
  return (
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
  )
}
