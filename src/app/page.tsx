"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import RulesPopup from "@/components/RulesPopup"
import UnityWebGL from "@/components/unityWebGL"
import VisualCamera from "@/components/VisualCamera"
import LoadingOverlay from "@/components/LoadingOverlay"

export default function Home() {
  const [showRules, setShowRules] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isFirstTime, setIsFirstTime] = useState(true)

  const handleStartUnity = () => {
    setIsLoading(true)
    // Unityの読み込みが完了したら以下を呼び出す
    // setIsLoading(false)
  }

  const handleCloseRules = () => {
    setShowRules(false)
    if (isFirstTime) {
      setIsFirstTime(false)
    }
  }

  return (
    <div className="relative h-full">
      <AnimatePresence>
        {showRules && <RulesPopup onClose={handleCloseRules} isFirstTime={isFirstTime} />}
      </AnimatePresence>

      <div className={`h-full flex items-center justify-center ${isFirstTime && showRules ? "hidden" : ""}`}>
        <UnityWebGL onStart={handleStartUnity} />
      </div>

      <motion.div
        className={`fixed bottom-4 left-4 h-[20vh] w-[30vh] ${isFirstTime && showRules ? "hidden" : ""}`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <VisualCamera />
      </motion.div>

      {!isFirstTime && (
        <button
          onClick={() => setShowRules(true)}
          className="fixed top-[12vh] right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          ルールを確認
        </button>
      )}

      <AnimatePresence>{isLoading && <LoadingOverlay />}</AnimatePresence>
    </div>
  )
}

