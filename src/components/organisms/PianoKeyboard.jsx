import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const PianoKeyboard = ({ 
  onKeyPress, 
  onKeyRelease, 
  pressedKeys = [], 
  octaveRange = 7,
  highlightedKeys = [] 
}) => {
  const [touchedKeys, setTouchedKeys] = useState(new Set());

  // Generate piano keys for the specified octave range
  const generateKeys = () => {
    const keys = [];
    const whiteKeyPattern = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const blackKeyPattern = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];
    
    for (let octave = 2; octave < 2 + octaveRange; octave++) {
      whiteKeyPattern.forEach((note, index) => {
        const keyId = `${note}${octave}`;
        keys.push({
          id: keyId,
          note,
          octave,
          type: 'white',
          midiNote: (octave * 12) + [0, 2, 4, 5, 7, 9, 11][index]
        });
        
        // Add black key if it exists
        if (blackKeyPattern[index]) {
          const blackKeyId = `${blackKeyPattern[index]}${octave}`;
          keys.push({
            id: blackKeyId,
            note: blackKeyPattern[index],
            octave,
            type: 'black',
            midiNote: (octave * 12) + [1, 3, null, 6, 8, 10, null][index]
          });
        }
      });
    }
    
    return keys.filter(key => key !== null);
  };

  const keys = generateKeys();
  const whiteKeys = keys.filter(key => key.type === 'white');
  const blackKeys = keys.filter(key => key.type === 'black');

  const handleKeyDown = useCallback((key) => {
    setTouchedKeys(prev => new Set([...prev, key.id]));
    onKeyPress?.(key);
  }, [onKeyPress]);

  const handleKeyUp = useCallback((key) => {
    setTouchedKeys(prev => {
      const newSet = new Set(prev);
      newSet.delete(key.id);
      return newSet;
    });
    onKeyRelease?.(key);
  }, [onKeyRelease]);

  const isKeyPressed = (keyId) => {
    return pressedKeys.includes(keyId) || touchedKeys.has(keyId);
  };

  const isKeyHighlighted = (keyId) => {
    return highlightedKeys.includes(keyId);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent-500/20 to-info/20 rounded-lg">
            <ApperIcon name="Piano" size={20} className="text-accent-400" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-white">88-Key Piano</h3>
            <p className="text-sm text-primary-300">{octaveRange} octave range • Velocity sensitive</p>
          </div>
        </div>
        
        <div className="text-right text-xs text-primary-400">
          <div>Multi-touch support</div>
          <div>Press keys to play</div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-primary-800 to-primary-900 rounded-xl p-4 overflow-x-auto">
        <div className="relative inline-flex" style={{ minWidth: '800px' }}>
          {/* White keys */}
          <div className="flex">
            {whiteKeys.map((key) => (
              <motion.button
                key={key.id}
                className={`piano-key relative w-8 h-32 mx-px bg-gradient-to-b border-r border-primary-600 rounded-b-md transition-all duration-75 ${
                  isKeyPressed(key.id) 
                    ? 'from-accent-400 to-accent-500 key-pressed key-glow shadow-lg' 
                    : isKeyHighlighted(key.id)
                      ? 'from-info/20 to-info/40 border-info'
                      : 'from-gray-100 to-gray-200 hover:from-gray-50 hover:to-gray-100'
                } ${
                  isKeyPressed(key.id) ? 'text-white' : 'text-primary-800'
                }`}
                onMouseDown={() => handleKeyDown(key)}
                onMouseUp={() => handleKeyUp(key)}
                onMouseLeave={() => handleKeyUp(key)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleKeyDown(key);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  handleKeyUp(key);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute bottom-2 inset-x-0 text-center">
                  <div className="text-xs font-medium">
                    {key.note}{key.octave}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Black keys */}
          <div className="absolute top-0 flex pointer-events-none">
            {whiteKeys.map((whiteKey, index) => {
              const blackKey = blackKeys.find(bk => 
                bk.note.startsWith(whiteKey.note) && bk.octave === whiteKey.octave
              );
              
              if (!blackKey) {
                return <div key={`spacer-${whiteKey.id}`} className="w-8 mx-px" />;
              }

              return (
                <div key={`container-${whiteKey.id}`} className="relative w-8 mx-px">
                  <motion.button
                    className={`piano-key absolute right-0 w-5 h-20 -mr-2.5 bg-gradient-to-b rounded-b-md border border-primary-700 pointer-events-auto transition-all duration-75 ${
                      isKeyPressed(blackKey.id) 
                        ? 'from-accent-500 to-accent-600 key-pressed key-glow shadow-lg' 
                        : isKeyHighlighted(blackKey.id)
                          ? 'from-info/40 to-info/60 border-info'
                          : 'from-primary-900 to-primary-800 hover:from-primary-800 hover:to-primary-700'
                    }`}
                    onMouseDown={() => handleKeyDown(blackKey)}
                    onMouseUp={() => handleKeyUp(blackKey)}
                    onMouseLeave={() => handleKeyUp(blackKey)}
                    onTouchStart={(e) => {
                      e.preventDefault();
                      handleKeyDown(blackKey);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handleKeyUp(blackKey);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute bottom-1 inset-x-0 text-center">
                      <div className="text-xs font-medium text-white opacity-75">
                        {blackKey.note.replace('#', '♯')}{blackKey.octave}
                      </div>
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-primary-400">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-br from-accent-500 to-accent-400 rounded-full" />
            <span>Active note</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-br from-info to-info/60 rounded-full" />
            <span>Scale highlight</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Hand" size={12} />
            <span>Touch & mouse support</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PianoKeyboard;