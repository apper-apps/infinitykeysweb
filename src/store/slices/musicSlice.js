import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Beat Control
  bpm: 120,
  isPlaying: false,
  currentBeat: 0,
  
  // Sound Selection
  selectedSound: 'piano',
  availableSounds: [],
  
  // Piano Keyboard
  activeKeys: [],
  octave: 4,
  
  // Recording
  isRecording: false,
  recordingData: null,
  recordings: [],
  
  // Effects
  effects: {
    reverb: 0,
    delay: 0,
    distortion: 0,
    filter: 0,
  },
  
  // UI State
  loading: false,
  error: null,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    // Beat Control Actions
    setBpm: (state, action) => {
      state.bpm = Math.max(60, Math.min(200, action.payload));
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
      if (!state.isPlaying) {
        state.currentBeat = 0;
      }
    },
    setCurrentBeat: (state, action) => {
      state.currentBeat = action.payload;
    },
    
    // Sound Selection Actions
    setSelectedSound: (state, action) => {
      state.selectedSound = action.payload;
    },
    setAvailableSounds: (state, action) => {
      state.availableSounds = action.payload;
    },
    
    // Piano Keyboard Actions
    addActiveKey: (state, action) => {
      const key = action.payload;
      if (!state.activeKeys.includes(key)) {
        state.activeKeys.push(key);
      }
    },
    removeActiveKey: (state, action) => {
      const key = action.payload;
      state.activeKeys = state.activeKeys.filter(k => k !== key);
    },
    clearActiveKeys: (state) => {
      state.activeKeys = [];
    },
    setOctave: (state, action) => {
      state.octave = Math.max(1, Math.min(7, action.payload));
    },
    
    // Recording Actions
    startRecording: (state) => {
      state.isRecording = true;
      state.recordingData = {
        startTime: Date.now(),
        notes: [],
      };
    },
    stopRecording: (state) => {
      if (state.isRecording && state.recordingData) {
        state.isRecording = false;
        state.recordings.push({
          id: Date.now(),
          ...state.recordingData,
          endTime: Date.now(),
        });
        state.recordingData = null;
      }
    },
    addNoteToRecording: (state, action) => {
      if (state.isRecording && state.recordingData) {
        state.recordingData.notes.push({
          ...action.payload,
          timestamp: Date.now() - state.recordingData.startTime,
        });
      }
    },
    deleteRecording: (state, action) => {
      state.recordings = state.recordings.filter(r => r.id !== action.payload);
    },
    
    // Effects Actions
    setEffect: (state, action) => {
      const { effect, value } = action.payload;
      if (state.effects.hasOwnProperty(effect)) {
        state.effects[effect] = Math.max(0, Math.min(100, value));
      }
    },
    resetEffects: (state) => {
      state.effects = {
        reverb: 0,
        delay: 0,
        distortion: 0,
        filter: 0,
      };
    },
    
    // UI Actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setBpm,
  togglePlay,
  setCurrentBeat,
  setSelectedSound,
  setAvailableSounds,
  addActiveKey,
  removeActiveKey,
  clearActiveKeys,
  setOctave,
  startRecording,
  stopRecording,
  addNoteToRecording,
  deleteRecording,
  setEffect,
  resetEffects,
  setLoading,
  setError,
  clearError,
} = musicSlice.actions;

export default musicSlice.reducer;