export default function Homepage({ handleClick }) {
  return (
    <div>
      <div className="start-page">
        <h1>Trivia Quiz App</h1>
        <p className="homepage-instructions">Press the Start Quiz button to begin!</p>
        <button className="button-primary" onClick={handleClick}>
          Start Quiz
        </button>
      </div>
    </div>
  )
}
