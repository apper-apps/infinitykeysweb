import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const PianoKeyboard = ({ 
  onKeyPress, 
  onKeyRelease, 
  pressedKeys = [], 
  octaveRange = 7,
  highlightedKeys = [],
  keyboardLayout = "azerty",
  currentOctave = 4,
  onOctaveChange,
  theme,
  onLayoutChange
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

  // Keyboard mapping for AZERTY layout
const getKeyboardMapping = () => {
    const { keyboardLayouts, getLayoutKeys } = require('@/utils/keyboardLayouts');
    const layoutConfig = getLayoutKeys(keyboardLayout);
    const layoutKeys = layoutConfig.keys;
    const notePattern = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    
    const mapping = {};
    layoutKeys.forEach((key, index) => {
      if (index < notePattern.length + 7) { // Support 19 keys for extended range
        const noteIndex = index % 12;
        const octaveOffset = Math.floor(index / 12);
        const note = notePattern[noteIndex];
        const octave = currentOctave + octaveOffset;
        mapping[key] = `${note}${octave}`;
      }
    });
    
    return mapping;
  };

  const keys = generateKeys();
  const whiteKeys = keys.filter(key => key.type === 'white');
  const blackKeys = keys.filter(key => key.type === 'black');
  const keyboardMapping = getKeyboardMapping();
  const { keyboardLayouts, getLayoutKeys } = require('@/utils/keyboardLayouts');
  const layoutConfig = getLayoutKeys(keyboardLayout);
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      
      const mappedKeyId = keyboardMapping[e.key.toLowerCase()];
      if (mappedKeyId) {
        const key = keys.find(k => k.id === mappedKeyId);
        if (key) {
          setTouchedKeys(prev => new Set([...prev, key.id]));
          onKeyPress?.(key);
        }
      }
      
      // Octave controls
      if (e.key === 'ArrowUp' && currentOctave < 7) {
        onOctaveChange?.(currentOctave + 1);
      } else if (e.key === 'ArrowDown' && currentOctave > 1) {
        onOctaveChange?.(currentOctave - 1);
      }
    };

    const handleKeyUp = (e) => {
      const mappedKeyId = keyboardMapping[e.key.toLowerCase()];
      if (mappedKeyId) {
        const key = keys.find(k => k.id === mappedKeyId);
        if (key) {
          setTouchedKeys(prev => {
            const newSet = new Set(prev);
            newSet.delete(key.id);
            return newSet;
          });
          onKeyRelease?.(key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keys, keyboardMapping, currentOctave, onKeyPress, onKeyRelease, onOctaveChange]);

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
    <Card className="p-6" style={{ background: theme?.colors.cardBg }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div 
            className="p-2 rounded-lg shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${theme?.colors.primary}, ${theme?.colors.accent})`
            }}
          >
            <ApperIcon name="Piano" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-display font-bold text-white">88-Key Piano</h3>
            <p className="text-sm text-white/70">{octaveRange} octave range • Octave {currentOctave}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right text-xs text-white/60 space-y-1">
            <div>Layout: {layoutConfig.name}</div>
            <div>↑↓ for octaves</div>
          </div>
<div className="flex items-center space-x-2">
            <select
              value={keyboardLayout}
              onChange={(e) => onLayoutChange?.(e.target.value)}
              className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs text-white backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {Object.entries(keyboardLayouts).map(([id, layout]) => (
                <option key={id} value={id} className="bg-gray-800">{layout.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => onOctaveChange?.(Math.min(currentOctave + 1, 7))}
              className="px-2 py-1 rounded text-xs text-white transition-all hover:scale-105"
              style={{ 
                background: `linear-gradient(135deg, ${theme?.colors.primary}, ${theme?.colors.accent})` 
              }}
            >
              ↑ Oct
            </button>
            <button
              onClick={() => onOctaveChange?.(Math.max(currentOctave - 1, 1))}
              className="px-2 py-1 rounded text-xs text-white transition-all hover:scale-105"
              style={{ 
                background: `linear-gradient(135deg, ${theme?.colors.primary}, ${theme?.colors.accent})` 
              }}
            >
              ↓ Oct
            </button>
          </div>
        </div>
      </div>

<div 
        className="relative rounded-xl p-4 overflow-x-auto shadow-2xl"
        style={{ 
          background: `linear-gradient(145deg, ${theme?.colors.primary}20, ${theme?.colors.accent}10)`,
          border: `1px solid ${theme?.colors.primary}30`
        }}
      >
        <div className="relative inline-flex" style={{ minWidth: '800px' }}>
          {/* White keys */}
          <div className="flex">
            {whiteKeys.map((key) => (
              <motion.button
                key={key.id}
                className={`piano-key relative w-8 h-32 mx-px bg-gradient-to-b border-r rounded-b-md transition-all duration-75 ${
                  isKeyPressed(key.id) 
                    ? 'key-pressed shadow-lg transform scale-95' 
                    : isKeyHighlighted(key.id)
                      ? 'shadow-md'
                      : 'from-gray-100 to-gray-200 hover:from-gray-50 hover:to-gray-100'
                } ${
                  isKeyPressed(key.id) ? 'text-white' : 'text-gray-800'
                }`}
                style={{
                  ...(isKeyPressed(key.id) && {
                    background: `linear-gradient(to bottom, ${theme?.colors.keyActive}, ${theme?.colors.accent})`,
                    boxShadow: `0 0 20px ${theme?.colors.keyActive}60`
                  }),
                  ...(isKeyHighlighted(key.id) && !isKeyPressed(key.id) && {
                    background: `linear-gradient(to bottom, ${theme?.colors.keyHighlight}40, ${theme?.colors.keyHighlight}20)`,
                    borderColor: theme?.colors.keyHighlight
                  }),
                  borderColor: isKeyPressed(key.id) ? theme?.colors.keyActive : '#e5e7eb'
                }}
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
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute bottom-2 inset-x-0 text-center">
                  <div className="text-xs font-bold">
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
                    className={`piano-key absolute right-0 w-5 h-20 -mr-2.5 bg-gradient-to-b rounded-b-md border pointer-events-auto transition-all duration-75 ${
                      isKeyPressed(blackKey.id) 
                        ? 'key-pressed shadow-lg transform scale-95' 
                        : isKeyHighlighted(blackKey.id)
                          ? 'shadow-md'
                          : 'from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700'
                    }`}
                    style={{
                      ...(isKeyPressed(blackKey.id) && {
                        background: `linear-gradient(to bottom, ${theme?.colors.keyActive}, ${theme?.colors.accent}cc)`,
                        boxShadow: `0 0 20px ${theme?.colors.keyActive}80`
                      }),
                      ...(isKeyHighlighted(blackKey.id) && !isKeyPressed(blackKey.id) && {
                        background: `linear-gradient(to bottom, ${theme?.colors.keyHighlight}60, ${theme?.colors.keyHighlight}40)`,
                        borderColor: theme?.colors.keyHighlight
                      }),
                      borderColor: isKeyPressed(blackKey.id) ? theme?.colors.keyActive : '#374151'
                    }}
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
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute bottom-1 inset-x-0 text-center">
                      <div className="text-xs font-bold text-white">
                        {blackKey.note.replace('#', '♯')}{blackKey.octave}
                      </div>
                    </div>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

<div className="flex items-center justify-center mt-4 space-x-6 text-xs text-white/70">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full shadow-md"
              style={{ 
                background: `linear-gradient(45deg, ${theme?.colors.keyActive}, ${theme?.colors.accent})`
              }}
            />
            <span>Active note</span>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full shadow-md"
              style={{ 
                background: `linear-gradient(45deg, ${theme?.colors.keyHighlight}, ${theme?.colors.primary})`
              }}
            />
            <span>Scale highlight</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Keyboard" size={12} />
            <span>Computer keyboard + touch</span>
          </div>
          <div className="text-xs text-white/50 max-w-xl">
            {layoutConfig.display} → C-C#-D-D#-E-F-F#-G-G#-A-A#-B-C-C#-D-D#-E-F-F#-G
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PianoKeyboard;