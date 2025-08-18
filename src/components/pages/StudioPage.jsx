import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PianoKeyboard from "@/components/organisms/PianoKeyboard";
import SoundSelector from "@/components/molecules/SoundSelector";
import BeatControl from "@/components/molecules/BeatControl";
import EffectsPanel from "@/components/molecules/EffectsPanel";
import RecordingToolbar from "@/components/molecules/RecordingToolbar";
import ChordDisplay from "@/components/molecules/ChordDisplay";
import ThemeSelector from "@/components/molecules/ThemeSelector";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import * as soundService from "@/services/api/soundService";
import * as beatService from "@/services/api/beatService";
import { themes, getTheme, saveTheme, loadTheme } from "@/utils/themes";
import { detectKeyboardLayout } from "@/utils/keyboardLayouts";
const StudioPage = () => {
// Data states
  const [sounds, setSounds] = useState([]);
  const [beats, setBeats] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Audio states
  const [selectedSound, setSelectedSound] = useState(null);
  const [selectedBeat, setSelectedBeat] = useState(null);
  const [isBeatPlaying, setIsBeatPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);

  // Piano states
  const [pressedKeys, setPressedKeys] = useState([]);
  const [currentChord, setCurrentChord] = useState("");
  const [suggestedChords, setSuggestedChords] = useState([]);

  // Keyboard states
  const [keyboardLayout, setKeyboardLayout] = useState(detectKeyboardLayout());
  const [currentOctave, setCurrentOctave] = useState(4);
  const [keyboardEnabled, setKeyboardEnabled] = useState(true);

  // Theme states
  const [currentTheme, setCurrentTheme] = useState(getTheme(loadTheme()));

  // Effects states
  const [effects, setEffects] = useState({
    reverb: { type: "hall", value: 25 },
    eq: { bass: 0, mid: 0, treble: 0 },
    sustain: false
  });
  const [transpose, setTranspose] = useState(0);
  const [octave, setOctave] = useState(0);

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  // Load initial data
  useEffect(() => {
    const loadStudioData = async () => {
      try {
        setLoading(true);
        setError("");
        
        const [soundsData, beatsData] = await Promise.all([
          soundService.getAll(),
          beatService.getAll()
        ]);
        
        setSounds(soundsData);
        setBeats(beatsData);
        
        // Set default sound
        if (soundsData.length > 0) {
          const grandPiano = soundsData.find(s => s.name === "Concert Grand") || soundsData[0];
          setSelectedSound(grandPiano);
        }
        
      } catch (err) {
        setError(err.message || "Failed to load studio data");
      } finally {
        setLoading(false);
      }
    };

    loadStudioData();
  }, []);

  // Recording timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

// Beat tempo sync
  useEffect(() => {
    if (selectedBeat && isBeatPlaying) {
      // Simulate beat sync
      const beatInterval = (60 / tempo) * 1000;
      const interval = setInterval(() => {
        // Visual beat indicator could be triggered here
      }, beatInterval);
      return () => clearInterval(interval);
    }
  }, [selectedBeat, isBeatPlaying, tempo]);

  // Keyboard focus management
  useEffect(() => {
    const handleFocus = () => setKeyboardEnabled(true);
    const handleBlur = () => setKeyboardEnabled(false);
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Toast notification for octave changes
  useEffect(() => {
    if (currentOctave !== 4) {
      toast.info(`Piano octave set to ${currentOctave}`, {
        icon: "🎹"
      });
    }
  }, [currentOctave]);

  const handleSoundSelect = async (sound) => {
    try {
      setSelectedSound(sound);
      toast.success(`${sound.name} loaded`, {
        icon: "🎹"
      });
    } catch (err) {
      toast.error("Failed to load sound");
    }
  };

  const handleBeatSelect = (beat) => {
    setSelectedBeat(beat);
    if (beat) {
      setTempo(beat.defaultTempo || 120);
      toast.success(`${beat.name} beat selected`, {
        icon: "🥁"
      });
    }
  };

  const handleToggleBeat = () => {
    if (!selectedBeat) {
      toast.warning("Select a beat first");
      return;
    }
    setIsBeatPlaying(!isBeatPlaying);
    toast.info(isBeatPlaying ? "Beat stopped" : "Beat playing", {
      icon: isBeatPlaying ? "⏸️" : "▶️"
    });
  };

const handleKeyPress = (key) => {
    if (!selectedSound) {
      toast.warning("Select an instrument first");
      return;
    }
    
    setPressedKeys(prev => [...prev.filter(k => k !== key.id), key.id]);
    
    // Simulate chord detection
    if (pressedKeys.length >= 2) {
      const chords = ["C", "Dm", "Em", "F", "G", "Am", "B°"];
      setCurrentChord(chords[Math.floor(Math.random() * chords.length)]);
      setSuggestedChords(["F", "Am", "G"]);
    }
    
    // Visual feedback for keyboard input
    if (keyboardEnabled) {
      // Simulate sound playing
      console.log(`Playing ${key.note}${key.octave} with ${selectedSound.name}`);
    }
  };

  const handleKeyRelease = (key) => {
    setPressedKeys(prev => prev.filter(k => k !== key.id));
    if (pressedKeys.length <= 1) {
      setCurrentChord("");
      setSuggestedChords([]);
    }
  };

  const handleOctaveChange = (newOctave) => {
    setCurrentOctave(newOctave);
  };

  const handleEffectChange = (effectType, value) => {
    setEffects(prev => ({
      ...prev,
      [effectType]: value
    }));
  };

  const handleRecord = () => {
    if (!selectedSound) {
      toast.warning("Select an instrument first");
      return;
    }
    setIsRecording(true);
    setRecordingTime(0);
    toast.success("Recording started", {
      icon: "🔴"
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setHasRecording(true);
    toast.success(`Recording saved (${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')})`, {
      icon: "💾"
    });
  };

  const handlePlayRecording = () => {
    if (!hasRecording) return;
    setIsPlaying(!isPlaying);
    toast.info(isPlaying ? "Playback stopped" : "Playing recording", {
      icon: isPlaying ? "⏸️" : "▶️"
    });
    
    if (!isPlaying) {
      // Simulate playback duration
      setTimeout(() => {
        setIsPlaying(false);
      }, 3000);
    }
  };

  const handleExport = () => {
    if (!hasRecording) return;
    // Simulate export
    toast.success("Recording exported as WAV", {
      icon: "💿"
    });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={() => window.location.reload()} />;

const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    saveTheme(theme.id);
    toast.success(`Theme changed to ${theme.name}`, {
      icon: "🎨"
    });
  };

  const handleLayoutChange = (layout) => {
    setKeyboardLayout(layout);
    toast.success(`Keyboard layout: ${layout.toUpperCase()}`, {
      icon: "⌨️"
    });
  };

  return (
    <div 
      className="min-h-screen p-4 transition-all duration-500"
      style={{ background: currentTheme.colors.background }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center space-x-3 flex-1">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="p-3 rounded-xl shadow-2xl"
                style={{ 
                  background: `linear-gradient(135deg, ${currentTheme.colors.primary}, ${currentTheme.colors.accent})`
                }}
              >
                <ApperIcon name="Music" size={32} className="text-white" />
              </motion.div>
              <div>
                <h1 className="text-4xl font-display font-bold text-white drop-shadow-lg">
                  Infinity Keys
                </h1>
                <p className="text-white/80">Professional Music Production Studio</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeSelector 
                currentTheme={currentTheme}
                onThemeChange={handleThemeChange}
                themes={themes}
              />
            </div>
          </div>
        </motion.div>

        {/* Chord Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ChordDisplay 
            currentChord={currentChord}
            suggestedChords={suggestedChords}
          />
        </motion.div>

        {/* Main Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <SoundSelector
              sounds={sounds}
              selectedSound={selectedSound}
              onSoundSelect={handleSoundSelect}
              isLoading={loading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <RecordingToolbar
              isRecording={isRecording}
              onRecord={handleRecord}
              onStop={handleStopRecording}
              onPlay={handlePlayRecording}
              onExport={handleExport}
              recordingTime={recordingTime}
              hasRecording={hasRecording}
              isPlaying={isPlaying}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <EffectsPanel
              effects={effects}
              onEffectChange={handleEffectChange}
              transpose={transpose}
              onTransposeChange={setTranspose}
              octave={octave}
              onOctaveChange={setOctave}
            />
          </motion.div>
        </div>

        {/* Beat Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <BeatControl
            beats={beats}
            selectedBeat={selectedBeat}
            onBeatSelect={handleBeatSelect}
            isPlaying={isBeatPlaying}
            onTogglePlay={handleToggleBeat}
            tempo={tempo}
            onTempoChange={setTempo}
          />
        </motion.div>

        {/* Piano Keyboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <PianoKeyboard
            onKeyPress={handleKeyPress}
            onKeyRelease={handleKeyRelease}
            pressedKeys={pressedKeys}
            octaveRange={7}
            highlightedKeys={[]}
            keyboardLayout={keyboardLayout}
            currentOctave={currentOctave}
            onOctaveChange={handleOctaveChange}
            theme={currentTheme}
            onLayoutChange={handleLayoutChange}
          />
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center space-x-8 text-sm text-white/70"
        >
          <div className="flex items-center space-x-2">
            <div 
              className="w-2 h-2 rounded-full shadow-lg"
              style={{ 
                backgroundColor: selectedSound ? currentTheme.colors.accent : '#6b7280'
              }}
            />
            <span>Instrument: {selectedSound?.name || "None"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              className={`w-2 h-2 rounded-full shadow-lg ${isBeatPlaying ? 'animate-pulse' : ''}`}
              style={{ 
                backgroundColor: isBeatPlaying ? currentTheme.colors.keyActive : '#6b7280'
              }}
            />
            <span>Beat: {selectedBeat ? `${selectedBeat.name} @ ${tempo} BPM` : "None"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div 
              className={`w-2 h-2 rounded-full shadow-lg ${isRecording ? 'animate-pulse' : ''}`}
              style={{ 
                backgroundColor: isRecording ? '#ef4444' : hasRecording ? '#10b981' : '#6b7280'
              }}
            />
            <span>Recording: {isRecording ? "Active" : hasRecording ? "Ready" : "None"}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudioPage;