import './App.css'
import lemonBlob from './assets/images/lemon_blob.svg'
import babyBlueBlob from './assets/images/baby_blue_blob.svg'
import StartScreen from './components/StartScreen'

function App() {
  return (
    <main id="main">
      <img src={lemonBlob} alt="" className="blob yellow-blob" />
      <img src={babyBlueBlob} alt="" className="blob blue-blob" />
      <StartScreen />
    </main>
  )
}

export default App
