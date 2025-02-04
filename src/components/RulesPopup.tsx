import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface RulesPopupProps {
  onClose: () => void
  isFirstTime: boolean
}

const rules = [
  {
    text: "手をWebカメラにかざすとUnity上に手のポイントが出現します。",
    image: "/images/rule1.png",
  },
  {
    text: "上部でOKマークをかざすことで新しい物体が出現します。",
    image: "/images/rule2.png",
  },
  {
    text: "OKマークをかざすことで物体を掴んだり離したりできます。",
    image: "/images/rule3.png",
  },
  {
    text: "同じ物体をぶつけると合体して大きくなります。",
    image: "/images/rule4.png",
  },
  {
    text: "高く積み上げるまたは同じ物体が合体することでスコアが上がります！",
    image: "/images/rule5.png",
  },
  {
    text: "さあ、ハイスコアを目指して積み上げましょう！！",
    image: null,
  },
]

export default function RulesPopup({ onClose, isFirstTime }: RulesPopupProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < rules.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const resetSlides = () => {
    setCurrentSlide(0)
  }

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center ${isFirstTime ? "bg-black bg-opacity-50" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`bg-white p-8 rounded-lg shadow-lg ${isFirstTime ? "max-w-md w-full" : "max-w-lg w-full mx-4"}`}
        initial={isFirstTime ? { scale: 0.9, y: 20 } : { y: -50, opacity: 0 }}
        animate={isFirstTime ? { scale: 1, y: 0 } : { y: 0, opacity: 1 }}
        exit={isFirstTime ? { scale: 0.9, y: 20 } : { y: -50, opacity: 0 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Visual Stack ゲームルール</h2>
        <div className="mb-4 h-64 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {rules[currentSlide].image ? (
                <Image
                  src={rules[currentSlide].image || "/placeholder.svg"}
                  alt={`Rule ${currentSlide + 1}`}
                  layout="fill"
                  objectFit="contain"
                />
              ) : (
                <p className="text-xl font-bold text-center">{rules[currentSlide].text}</p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        {rules[currentSlide].image && <p className="text-center mb-4">{rules[currentSlide].text}</p>}
        <div className="flex justify-between items-center">
          {currentSlide === 0 ? (
            <div></div>
          ) : (
            <button
              onClick={prevSlide}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              前へ
            </button>
          )}
          {currentSlide === rules.length - 1 ? (
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              OK
            </button>
          ) : (
            <button
              onClick={nextSlide}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              次へ
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

