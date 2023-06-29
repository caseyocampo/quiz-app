import { React, useEffect } from "react"
import lemonBlob from "../assets/images/lemon_blob.svg"
import babyBlueBlob from "../assets/images/baby_blue_blob.svg"

export default function Quiz() {
  useEffect(() => {
    const startQuizBtn = document.getElementById("startQuizBtn")
    startQuizBtn.addEventListener("click", () => {
      console.log("pressed")
    })
  }, [])

  return (
    <section>
      <img src={lemonBlob} alt="" className="yellow-blob" />
      <img src={babyBlueBlob} alt="" className="blue-blob" />
      <div className="start-page">
        <h1>Quizzical - a Scrimba Project</h1>
        <p>Quiz yourself on some good ol' Trivia!</p>
        <button className="button-primary" id="startQuizBtn">
          Start quiz
        </button>
      </div>
    </section>
  )
}
