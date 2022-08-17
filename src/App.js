import "./App.css"
import lemonBlob from "./assets/images/lemon_blob.svg"
import babyBlueBlob from "./assets/images/baby_blue_blob.svg"

function App() {
  return (
    <main>
      <img src={lemonBlob} alt="decorative lemon colored blob fixed to the top right of the screen" className="lemon-blob" />
      <img src={babyBlueBlob} alt="decorative lemon colored blob fixed to the top right of the screen" className="baby-blue-blob" />
      <div className="start-page">
        <h1>Quizzical</h1>
        <p>Quiz yourself on some good ol' Trivia!</p>
        <button className="button-primary">Start quiz</button>
      </div>
    </main>
  )
}

export default App
