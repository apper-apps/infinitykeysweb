import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import PianoKeyboard from "@/components/organisms/PianoKeyboard";
import SoundSelector from "@/components/molecules/SoundSelector";
import BeatControl from "@/components/molecules/BeatControl";
import EffectsPanel from "@/components/molecules/EffectsPanel";
import RecordingToolbar from "@/components/molecules/RecordingToolbar";
import ChordDisplay from "@/components/molecules/ChordDisplay";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import * as soundService from "@/services/api/soundService";
import * as beatService from "@/services/api/beatService";

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
    setPressedKeys(prev => [...prev.filter(k => k !== key.id), key.id]);
    
    // Simulate chord detection
    if (pressedKeys.length >= 2) {
      const chords = ["C", "Dm", "Em", "F", "G", "Am", "B°"];
      setCurrentChord(chords[Math.floor(Math.random() * chords.length)]);
      setSuggestedChords(["F", "Am", "G"]);
    }
  };

  const handleKeyRelease = (key) => {
    setPressedKeys(prev => prev.filter(k => k !== key.id));
    if (pressedKeys.length <= 1) {
      setCurrentChord("");
      setSuggestedChords([]);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-800 via-primary-500 to-primary-600 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center space-x-3">
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
              className="p-3 bg-gradient-to-br from-accent-500 to-accent-400 rounded-xl shadow-lg"
            >
              <ApperIcon name="Music" size={32} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-display font-bold text-white">
                Infinity Keys
              </h1>
              <p className="text-primary-300">Professional Music Production Studio</p>
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
          />
        </motion.div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center space-x-8 text-sm text-primary-400"
        >
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${selectedSound ? 'bg-success' : 'bg-primary-600'}`} />
            <span>Instrument: {selectedSound?.name || "None"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isBeatPlaying ? 'bg-accent-500 animate-pulse' : 'bg-primary-600'}`} />
            <span>Beat: {selectedBeat ? `${selectedBeat.name} @ ${tempo} BPM` : "None"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-error animate-pulse' : hasRecording ? 'bg-success' : 'bg-primary-600'}`} />
            <span>Recording: {isRecording ? "Active" : hasRecording ? "Ready" : "None"}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudioPage;