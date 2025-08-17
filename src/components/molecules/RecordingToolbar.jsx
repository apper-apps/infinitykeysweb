import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";

const RecordingToolbar = ({ 
  isRecording, 
  onRecord, 
  onStop, 
  onPlay, 
  onExport, 
  recordingTime, 
  hasRecording,
  isPlaying 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div 
            className={`p-2 rounded-lg ${isRecording ? 'bg-error/20 animate-pulse' : 'bg-gradient-to-br from-accent-500/20 to-info/20'}`}
          >
            <ApperIcon 
              name={isRecording ? "Square" : "Mic"} 
              size={20} 
              className={isRecording ? "text-error" : "text-accent-400"} 
            />
          </motion.div>
          <div>
            <h3 className="text-lg font-display font-bold text-white">Studio Recorder</h3>
            <p className="text-sm text-primary-300">
              {isRecording ? "Recording..." : hasRecording ? "Ready to playback" : "Ready to record"}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-mono font-bold text-white">
            {formatTime(recordingTime)}
          </div>
          <div className="text-xs text-primary-400">
            {format(new Date(), "HH:mm:ss")}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-3 mt-6">
        {!isRecording ? (
          <Button
            onClick={onRecord}
            variant="primary"
            className="bg-gradient-to-r from-error to-accent-500 hover:from-error/80 hover:to-accent-600"
          >
            <ApperIcon name="Circle" size={16} className="mr-2 fill-current" />
            Record
          </Button>
        ) : (
          <Button
            onClick={onStop}
            variant="secondary"
          >
            <ApperIcon name="Square" size={16} className="mr-2" />
            Stop
          </Button>
        )}

        <Button
          onClick={onPlay}
          variant="ghost"
          disabled={!hasRecording || isRecording}
        >
          <ApperIcon name={isPlaying ? "Pause" : "Play"} size={16} className="mr-2" />
          {isPlaying ? "Pause" : "Play"}
        </Button>

        <Button
          onClick={onExport}
          variant="outline"
          disabled={!hasRecording || isRecording}
        >
          <ApperIcon name="Download" size={16} className="mr-2" />
          Export
        </Button>
      </div>

      {hasRecording && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 p-3 bg-primary-700/30 rounded-lg"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary-300">Last recording:</span>
            <span className="text-white font-mono">{formatTime(recordingTime)}</span>
          </div>
        </motion.div>
      )}
    </Card>
  );
};

export default RecordingToolbar;