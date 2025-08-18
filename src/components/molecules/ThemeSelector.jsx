import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';

const ThemeSelector = ({ currentTheme, onThemeChange, themes }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (theme) => {
    onThemeChange(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <div 
          className="w-4 h-4 rounded-full border-2 border-white/20"
          style={{ 
            background: `linear-gradient(45deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`
          }}
        />
        <span>{currentTheme.name}</span>
        <ApperIcon name="ChevronDown" size={14} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 z-50"
          >
            <Card className="p-4 min-w-80 backdrop-blur-xl border-white/10">
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Choose Theme</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <ApperIcon name="X" size={16} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        currentTheme.id === theme.id
                          ? 'border-white/40 bg-white/10'
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="space-y-2">
                        <div 
                          className="w-full h-8 rounded-md"
                          style={{ 
                            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`
                          }}
                        />
                        <div className="text-sm font-medium text-white">{theme.name}</div>
                        <div className="text-xs text-white/60">{theme.description}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;