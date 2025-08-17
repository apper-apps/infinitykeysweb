import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No recordings yet", 
  message = "Start creating music to see your recordings here", 
  actionLabel = "Start Recording",
  onAction,
  className = "" 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="bg-gradient-to-br from-primary-600/20 to-primary-700/10 backdrop-blur-sm border border-primary-600/30 rounded-2xl p-8 max-w-md">
        <motion.div
          animate={{ 
            y: [-10, 0, -10],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent-500/20 to-info/20 backdrop-blur-sm border border-accent-500/30 rounded-full flex items-center justify-center">
            <ApperIcon name="Music" size={36} className="text-accent-400" />
          </div>
        </motion.div>
        
        <h3 className="text-xl font-display font-bold text-white mb-3">
          {title}
        </h3>
        
        <p className="text-primary-300 mb-6 leading-relaxed">
          {message}
        </p>
        
        {onAction && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-6"
          >
            <Button 
              onClick={onAction}
              className="bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-600 hover:to-accent-500"
            >
              <ApperIcon name="Play" size={16} className="mr-2" />
              {actionLabel}
            </Button>
          </motion.div>
        )}
        
        <motion.div 
          className="flex items-center justify-center space-x-6 text-sm text-primary-400"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex items-center space-x-2">
            <ApperIcon name="Piano" size={16} />
            <span>Piano</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Drum" size={16} />
            <span>Beats</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Mic" size={16} />
            <span>Record</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Empty;