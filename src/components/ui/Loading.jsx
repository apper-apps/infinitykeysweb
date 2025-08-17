import React from "react";
import { motion } from "framer-motion";

const Loading = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <div className="space-y-4 w-full max-w-2xl">
        {/* Studio header skeleton */}
        <div className="flex items-center justify-between">
          <motion.div 
            className="h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg w-48"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="h-6 bg-gradient-to-r from-primary-600 to-primary-700 rounded w-24"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>
        
        {/* Control panels skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-br from-primary-600/20 to-primary-700/10 backdrop-blur-sm border border-primary-600/30 rounded-xl p-6 space-y-4"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <div className="h-4 bg-primary-600/40 rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-3 bg-primary-600/30 rounded w-full" />
                <div className="h-3 bg-primary-600/30 rounded w-5/6" />
              </div>
              <div className="flex space-x-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-8 w-8 bg-primary-600/40 rounded-full" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Piano keyboard skeleton */}
        <motion.div 
          className="bg-gradient-to-r from-primary-700/20 to-primary-600/10 backdrop-blur-sm border border-primary-600/30 rounded-xl p-4"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <div className="flex space-x-1 justify-center">
            {Array.from({ length: 24 }, (_, i) => (
              <div 
                key={i} 
                className={`${i % 7 === 1 || i % 7 === 3 || i % 7 === 6 ? 'h-16 bg-primary-800/60' : 'h-24 bg-primary-600/40'} w-3 rounded-b`}
              />
            ))}
          </div>
        </motion.div>
        
        <div className="text-center text-primary-300">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm"
          >
            Loading Infinity Keys Studio...
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Loading;