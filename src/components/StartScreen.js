import { React, useEffect, useState } from "react"
import lemonBlob from "../assets/images/lemon_blob.svg"
import babyBlueBlob from "../assets/images/baby_blue_blob.svg"

export default function StartScreen() {
  const [currentScreen, setCurrentScreen] = useState()
  function handleClick() {
    console.log("changed")
    setCurrentScreen()
  }

  return (
    <section>
      <img src={lemonBlob} alt="" className="yellow-blob" />
      <img src={babyBlueBlob} alt="" className="blue-blob" />
      <div className="start-page">
        <h1>Quizzical - a Scrimba Project</h1>
        <p>Quiz yourself on some good ol' Trivia!</p>
        <button className="button-primary" onClick={handleClick}>
          Start quiz
        </button>
      </div>
    </section>
  )
}
