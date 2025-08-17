import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const ChordDisplay = ({ currentChord, suggestedChords }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent-500/20 to-info/20 rounded-lg">
            <ApperIcon name="Music2" size={16} className="text-accent-400" />
          </div>
          <div>
            <span className="text-sm text-primary-300">Current Chord</span>
            <div className="text-xl font-display font-bold text-white">
              {currentChord || "—"}
            </div>
          </div>
        </div>
        
        {suggestedChords?.length > 0 && (
          <div className="text-right">
            <div className="text-xs text-primary-400 mb-1">Suggested</div>
            <div className="flex space-x-2">
              {suggestedChords.slice(0, 3).map((chord, index) => (
                <motion.div
                  key={chord}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-2 py-1 bg-primary-600/40 rounded text-xs text-primary-200"
                >
                  {chord}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ChordDisplay;