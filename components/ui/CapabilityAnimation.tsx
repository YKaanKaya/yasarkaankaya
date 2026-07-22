"use client"

import { useEffect, useRef } from "react"
import Lottie, { type LottieRefCurrentProps } from "lottie-react"
import { useReducedMotion } from "framer-motion"
import platformFlow from "@/public/animations/platform-flow.json"
import predictiveForecast from "@/public/animations/predictive-forecast.json"
import shapAttribution from "@/public/animations/shap-attribution.json"
import causalGraph from "@/public/animations/causal-graph.json"

const animations = {
  platform: platformFlow,
  predictive: predictiveForecast,
  shap: shapAttribution,
  causal: causalGraph,
} as const

export type CapabilityKind = keyof typeof animations

export function CapabilityAnimation({ kind }: { kind: CapabilityKind }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)
  const shouldReduceMotion = Boolean(useReducedMotion())
  const animationData = animations[kind]

  useEffect(() => {
    const player = lottieRef.current
    if (!player) return

    if (shouldReduceMotion) {
      player.goToAndStop(animationData.op - 1, true)
      return
    }

    player.goToAndPlay(animationData.ip, true)
  }, [animationData, shouldReduceMotion])

  const handleDOMLoaded = () => {
    const player = lottieRef.current
    if (!player) return

    if (shouldReduceMotion) {
      player.goToAndStop(animationData.op - 1, true)
      return
    }

    player.goToAndPlay(animationData.ip, true)
  }

  return (
    <div className="retro-capability-visual" aria-hidden="true">
      <Lottie
        key={kind}
        lottieRef={lottieRef}
        animationData={animationData}
        autoplay={!shouldReduceMotion}
        loop={false}
        onDOMLoaded={handleDOMLoaded}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
