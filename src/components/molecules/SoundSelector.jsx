import React from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const SoundSelector = ({ sounds, selectedSound, onSoundSelect, isLoading }) => {
  const categories = [...new Set(sounds.map(sound => sound.category))];

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-br from-accent-500/20 to-info/20 rounded-lg">
          <ApperIcon name="Piano" size={20} className="text-accent-400" />
        </div>
        <div>
          <h3 className="text-lg font-display font-bold text-white">Sound Library</h3>
          <p className="text-sm text-primary-300">Choose your instrument</p>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map(category => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-medium text-primary-300 uppercase tracking-wider">
              {category}
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {sounds
                .filter(sound => sound.category === category)
                .map(sound => (
                  <motion.div
                    key={sound.Id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedSound?.Id === sound.Id ? "primary" : "ghost"}
                      className={`w-full justify-start ${selectedSound?.Id === sound.Id ? 'bg-gradient-to-r from-accent-500 to-accent-400' : ''}`}
                      onClick={() => onSoundSelect(sound)}
                      disabled={isLoading}
                    >
                      <ApperIcon name={sound.icon} size={16} className="mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{sound.name}</div>
                        <div className="text-xs opacity-75">{sound.description}</div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SoundSelector;