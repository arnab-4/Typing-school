import {motion} from "framer-motion"

export default function CursorCarotComp() {
  return (
    <motion.span
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: [1, 0] }}
      transition={{
        opacity: { duration: 0.8, repeat: Infinity },
      }}
      className="absolute left-0 w-[3px] lg:h-8 sm:bottom-0 top-1 sm:h-6 h-5 rounded bg-gradient-to-b from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/50"
    ></motion.span>
  )
}