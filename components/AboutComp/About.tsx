import { motion } from "framer-motion";
import Img from "../Image/Img";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl mx-auto px-6"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-shrink-0"
          >
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-cyan-400 to-blue-500 p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                <Img src="Arnab.png" alt="About picture" className="w-full h-full object-cover opacity-90" />
              </div>
            </div>
          </motion.div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              Why Practice Typing?
            </motion.h3>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4 text-gray-300 leading-relaxed"
            >
              <p>
                Most jobs don't explicitly require certain typing speeds, but that's because basic typing skills are
                taken as a given. You should{" "}
                <span className="font-semibold text-cyan-400">aim for at least 40 WPM</span> to maintain
                a standard level of efficiency at work.
              </p>
              
              <p>
                Whether you're a beginner looking to improve your accuracy or an experienced typist striving for
                greater efficiency, our platform offers a range of exercises and challenges to suit your needs.
              </p>
              
              <p>
                Join our community, track your progress, and embark on a journey towards becoming a more proficient
                typist. Start typing your way to success today!
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-2 justify-center md:justify-start"
            >
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30">
                Speed Training
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30">
                Accuracy Focus
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm border border-purple-500/30">
                Progress Tracking
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}