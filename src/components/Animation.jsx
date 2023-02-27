import Typed from "react-typed"
import anime from "animejs/lib/anime.es.js"
import styles from "./TypeShuffleAnimation.module.css"

const Animation = () => {
  const animateText = () => {
    anime
      .timeline({ loop: true })
      .add({
        targets: ".type-shuffle",
        opacity: 1,
        duration: 0,
      })
      .add({
        targets: ".type-shuffle",
        translateY: ["-100%", "0%"],
        translateZ: 0,
        duration: 2000,
        easing: "easeOutExpo",
        delay: (el, i) => 60 * i,
      })
      .add({
        targets: ".type-shuffle",
        translateY: ["0%", "100%"],
        translateZ: 0,
        duration: 2000,
        easing: "easeOutExpo",
        delay: (el, i) => 60 * i,
      })
      .add({
        targets: ".type-shuffle",
        opacity: 0,
        duration: 0,
      })
  }

  return (
    <div>
      <Typed
        strings={["Hello World!", "Welcome to another learning experience."]}
        typeSpeed={100}
        backSpeed={50}
        backDelay={2000}
        loop
        onComplete={() => animateText()}
      >
        <span className={`${styles.typeShuffle}`} />
      </Typed>
    </div>
  )
}

export default Animation
