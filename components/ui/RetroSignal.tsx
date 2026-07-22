"use client"

import Lottie from "lottie-react"
import { useReducedMotion } from "framer-motion"
import retroSignal from "@/public/animations/retro-signal.json"

export function RetroSignal() {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className="retro-signal-animation"
      role="img"
      aria-label="Animated equalizer representing a live data signal"
    >
      <Lottie
        animationData={retroSignal}
        autoplay={!reduceMotion}
        loop={false}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  )
}
