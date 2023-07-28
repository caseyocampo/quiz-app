export default function Homepage({ handleClick }) {
  return (
    <div>
      <div className="start-page">
        <h1>Quizzical - a Solo Scrimba Project</h1>
        <p style={{ maxWidth: '500px', textAlign: 'left' }}>
          To continue my React education, I've joined the{' '}
          <a href="https://scrimba.com/learn/frontend">Scrimba Front End Development Career Path</a>. We were given a
          Figma file and list of instructions to complete this assignment. This is the finished project. Enjoy!
        </p>
        <button className="button-primary" onClick={handleClick}>
          Start quiz
        </button>
      </div>
    </div>
  )
}
