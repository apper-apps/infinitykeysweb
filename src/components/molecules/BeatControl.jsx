import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Slider from "@/components/atoms/Slider";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const BeatControl = ({ 
  beats, 
  selectedBeat, 
  onBeatSelect, 
  isPlaying, 
  onTogglePlay, 
  tempo, 
  onTempoChange 
}) => {
  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <motion.div 
          className={`p-2 bg-gradient-to-br from-accent-500/20 to-info/20 rounded-lg ${isPlaying ? 'animate-pulse-beat' : ''}`}
          animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 60 / tempo, repeat: Infinity }}
        >
          <ApperIcon name="Drum" size={20} className="text-accent-400" />
        </motion.div>
        <div>
          <h3 className="text-lg font-display font-bold text-white">Beat Engine</h3>
          <p className="text-sm text-primary-300">Rhythm & tempo</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2">
            Beat Style
          </label>
          <Select 
            value={selectedBeat?.Id || ""} 
            onChange={(e) => {
              const beat = beats.find(b => b.Id === parseInt(e.target.value));
              onBeatSelect(beat);
            }}
          >
            <option value="">No beat</option>
            {beats.map(beat => (
              <option key={beat.Id} value={beat.Id}>
                {beat.name} - {beat.genre}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-300 mb-2">
            Tempo: {tempo} BPM
          </label>
          <Slider
            min={60}
            max={180}
            value={tempo}
            onChange={onTempoChange}
          />
        </div>

        <div className="flex space-x-3">
          <Button
            onClick={onTogglePlay}
            variant={isPlaying ? "secondary" : "primary"}
            className="flex-1"
          >
            <ApperIcon 
              name={isPlaying ? "Pause" : "Play"} 
              size={16} 
              className="mr-2" 
            />
            {isPlaying ? "Stop" : "Play"}
          </Button>
        </div>

        {selectedBeat && (
          <div className="bg-primary-700/30 rounded-lg p-3">
            <div className="text-xs text-primary-400 mb-1">Now playing:</div>
            <div className="text-sm text-white font-medium">{selectedBeat.name}</div>
            <div className="text-xs text-primary-300">{selectedBeat.genre} • {tempo} BPM</div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BeatControl;