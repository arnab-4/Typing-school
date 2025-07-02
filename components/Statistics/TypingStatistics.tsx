import { motion } from "framer-motion";
import StatisticsTab from "../statisticsTab/StatisticsTab";
import RestartIcon from "../Icons/RestartIcon";
import About from "../AboutComp/About";
import { Statistics } from "../Types/types";
import { MutableRefObject } from "react";

type Props = {
  restart: () => void;
  statistics: Statistics;
  roundCounter: number;
  timeToType: number;
  seconds: MutableRefObject<number>;
};

export default function TypingStatistics(props: Props) {
  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
          Test Complete!
        </h2>
        <p className="text-gray-400 text-lg">Here's how you performed</p>
      </motion.div>

      {/* Action Controls */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12"
      >
        {/* Restart Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            console.log("Restarted By a click!!!!");
            props.restart();
          }}
          className="group flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
        >
          <div className="w-6 h-6">
            <RestartIcon />
          </div>
          <span className="text-white font-semibold">Try Again</span>
        </motion.div>

        {/* Keyboard Shortcuts */}
        <div className="flex items-center space-x-4 text-gray-400 text-sm">
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">/</kbd>
          </div>
          <span>or</span>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Cmd</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">/</kbd>
          </div>
        </div>
      </motion.section>

      {/* Statistics */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <StatisticsTab
          statistics={props.statistics}
          round={props.roundCounter}
          finishedTime={(props.timeToType - props.seconds.current).toString()}
        />
      </motion.section>

      {/* About Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <About />
      </motion.div>
    </div>
  );
}