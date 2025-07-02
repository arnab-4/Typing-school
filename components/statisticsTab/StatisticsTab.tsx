import React from "react";
import { motion } from "framer-motion";

const getTopScore = (st: Statistics) => {
  if (st.length > 1) {
    const statics = [...st.slice(0).reverse()];
    let topScore = statics[0].wpm;
    let topScoreIndex = 0;
    statics.forEach((item, index) => {
      if (item.wpm > topScore) {
        topScore = item.wpm;
        topScoreIndex = index;
      }
    });
    return topScoreIndex;
  } else {
    return null;
  }
};

const isTopScore = (index: number, statistics: Statistics) => {
  const result = getTopScore(statistics);
  return result == null ? (
    <></>
  ) : index === result ? (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ repeat: Infinity, duration: 1 }}
      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
    >
      🏆 Best
    </motion.span>
  ) : (
    <></>
  );
};

type Statistics = [{ round: number; wpm: number; accuracy: number }?];

export default function StatisticsTab({
  statistics,
  round,
  finishedTime,
}: {
  round: number;
  finishedTime: string;
  statistics: Statistics;
}) {
  const latestStats = statistics[statistics.length - 1];
  
  return (
    <div className="space-y-8">
      {/* Current Round Summary */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">Round {round} Results</h3>
          <p className="text-gray-400">Completed in {finishedTime} seconds</p>
        </div>
        
        {latestStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20"
            >
              <div className="text-3xl font-bold text-cyan-400 mb-2">{latestStats.wpm}</div>
              <div className="text-gray-400 uppercase tracking-wide text-sm">Words per Minute</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20"
            >
              <div className="text-3xl font-bold text-green-400 mb-2">{latestStats.accuracy}%</div>
              <div className="text-gray-400 uppercase tracking-wide text-sm">Accuracy</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20"
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">{finishedTime}s</div>
              <div className="text-gray-400 uppercase tracking-wide text-sm">Time Taken</div>
            </motion.div>
          </div>
        )}
      </div>

      {/* History Table */}
      {statistics.length > 0 && (
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold text-white">Performance History</h3>
            <p className="text-gray-400 text-sm mt-1">Track your progress over time</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Round
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    WPM
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {statistics
                  .slice(0)
                  .reverse()
                  .map((item, index) => {
                    return index === 0 ? (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-l-4 border-cyan-400"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-white">
                          Round {item.round}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-cyan-400 font-semibold">{item.wpm} WPM</span>
                            {isTopScore(index, statistics)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-green-400 font-semibold">
                          {item.accuracy}%
                        </td>
                      </motion.tr>
                    ) : (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-300">
                          Round {item.round}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-300">{item.wpm} WPM</span>
                            {isTopScore(index, statistics)}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {item.accuracy}%
                        </td>
                      </motion.tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}