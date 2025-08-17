import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message = "Something went wrong", onRetry, className = "" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="bg-gradient-to-br from-error/20 to-accent-500/10 backdrop-blur-sm border border-error/30 rounded-2xl p-8 max-w-md">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-error to-accent-500 rounded-full flex items-center justify-center">
            <ApperIcon name="AlertTriangle" size={32} className="text-white" />
          </div>
        </motion.div>
        
        <h3 className="text-xl font-display font-bold text-white mb-4">
          Studio Error
        </h3>
        
        <p className="text-primary-300 mb-6 leading-relaxed">
          {message}. The studio encountered an issue while loading your music production environment.
        </p>
        
        {onRetry && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onRetry}
              className="bg-gradient-to-r from-accent-500 to-accent-400 hover:from-accent-600 hover:to-accent-500"
            >
              <ApperIcon name="RefreshCw" size={16} className="mr-2" />
              Reload Studio
            </Button>
          </motion.div>
        )}
        
        <motion.div 
          className="mt-6 flex items-center justify-center space-x-4 text-sm text-primary-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ApperIcon name="Music" size={16} />
          <span>Infinity Keys</span>
          <ApperIcon name="Music" size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Error;