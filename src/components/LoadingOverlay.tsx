import { motion } from "framer-motion"

export default function LoadingOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          <p className="text-xl font-semibold">読み込み中...</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

