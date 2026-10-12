import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Square, SkipBack, SkipForward, 
  Volume2, VolumeX, Mic, Headphones, Settings, 
  ChevronDown, X, Clock, Gauge
} from 'lucide-react';

interface AudioPlayerProps {
  text: string;
  darkMode: boolean;
  chapterTitle: string;
}

export default function AudioPlayer({ text, darkMode, chapterTitle }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState('');
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordsRef = useRef<string[]>([]);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Try to select a good default voice
      const preferred = availableVoices.find(v => 
        v.lang.startsWith('en') && v.name.includes('Google')
      ) || availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
      
      if (preferred && !selectedVoice) {
        setSelectedVoice(preferred);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Calculate estimated reading time
  useEffect(() => {
    const words = text.split(/\s+/).length;
    const wordsPerMinute = 150 * rate;
    const minutes = Math.ceil(words / wordsPerMinute);
    setEstimatedTime(minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`);
  }, [text, rate]);

  const startSpeaking = useCallback(() => {
    if (!text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = isMuted ? 0 : volume;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Track progress
    const totalWords = text.split(/\s+/).length;
    wordsRef.current = text.split(/\s+/);
    startTimeRef.current = Date.now();

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const textBefore = text.substring(0, charIndex);
        const wordCount = textBefore.split(/\s+/).length;
        setCurrentWordIndex(wordCount);
        setProgress(Math.min((wordCount / totalWords) * 100, 100));
      }
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      setCurrentWordIndex(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);

    // Update progress periodically
    intervalRef.current = window.setInterval(() => {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        const wordsPerSecond = (150 * rate) / 60;
        const currentWord = Math.floor(elapsed * wordsPerSecond);
        const prog = Math.min((currentWord / totalWords) * 100, 100);
        setProgress(prog);
        setCurrentWordIndex(currentWord);
      }
    }, 500);
  }, [text, rate, pitch, volume, selectedVoice, isMuted]);

  const togglePlayPause = () => {
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      startTimeRef.current = Date.now() - (progress / 100) * (text.split(/\s+/).length / ((150 * rate) / 60)) * 1000;
      intervalRef.current = window.setInterval(() => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          const wordsPerSecond = (150 * rate) / 60;
          const currentWord = Math.floor(elapsed * wordsPerSecond);
          const totalWords = text.split(/\s+/).length;
          const prog = Math.min((currentWord / totalWords) * 100, 100);
          setProgress(prog);
          setCurrentWordIndex(currentWord);
        }
      }, 500);
    } else {
      startSpeaking();
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setCurrentWordIndex(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const restartAudio = () => {
    stopSpeaking();
    setTimeout(() => startSpeaking(), 100);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      utteranceRef.current.volume = isMuted ? volume : 0;
    }
  };

  // Group voices by language
  const voicesByLang = voices.reduce((acc, voice) => {
    const lang = voice.lang.split('-')[0];
    if (!acc[lang]) acc[lang] = [];
    acc[lang].push(voice);
    return acc;
  }, {} as Record<string, SpeechSynthesisVoice[]>);

  return (
    <div className={`rounded-2xl border overflow-hidden ${
      darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white border-amber-200 shadow-sm'
    }`}>
      {/* Header */}
      <div className={`px-4 py-3 flex items-center justify-between ${
        darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-amber-50 to-orange-50'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${
            isPlaying ? 'bg-green-500/20' : darkMode ? 'bg-gray-700' : 'bg-amber-100'
          }`}>
            <Headphones className={`w-4 h-4 ${
              isPlaying ? 'text-green-500' : darkMode ? 'text-amber-400' : 'text-amber-600'
            }`} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Audio Reader</h3>
            <p className={`text-[10px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {chapterTitle} • {estimatedTime}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-1.5 rounded-lg transition-colors ${
            showSettings
              ? 'bg-amber-600 text-white'
              : darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-amber-100 text-gray-500'
          }`}
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className={`px-4 pt-3 ${darkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className={`h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center justify-between mt-1">
          <span className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {Math.round(progress)}%
          </span>
          <span className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            {currentWordIndex} / {text.split(/\s+/).length} words
          </span>
        </div>
      </div>

      {/* Main Controls */}
      <div className={`px-4 py-4 flex items-center justify-center gap-3 ${
        darkMode ? 'bg-gray-800/50' : 'bg-white'
      }`}>
        {/* Restart */}
        <button
          onClick={restartAudio}
          disabled={!isPlaying}
          className={`p-2.5 rounded-full transition-all ${
            !isPlaying
              ? 'opacity-30 cursor-not-allowed'
              : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-amber-100 text-gray-700'
          }`}
          title="Restart"
        >
          <SkipBack className="w-5 h-5" />
        </button>

        {/* Play/Pause - Main Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={togglePlayPause}
          className={`p-4 rounded-full shadow-lg transition-all ${
            isPlaying && !isPaused
              ? 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-500/30'
          }`}
        >
          {isPlaying && !isPaused ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-0.5" />
          )}
        </motion.button>

        {/* Stop */}
        <button
          onClick={stopSpeaking}
          disabled={!isPlaying && !isPaused}
          className={`p-2.5 rounded-full transition-all ${
            !isPlaying && !isPaused
              ? 'opacity-30 cursor-not-allowed'
              : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-amber-100 text-gray-700'
          }`}
          title="Stop"
        >
          <Square className="w-5 h-5" />
        </button>

        {/* Mute */}
        <button
          onClick={toggleMute}
          className={`p-2.5 rounded-full transition-all ${
            isMuted
              ? 'bg-red-500/20 text-red-400'
              : darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-amber-100 text-gray-700'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      </div>

      {/* Speed Controls */}
      <div className={`px-4 pb-3 flex items-center justify-center gap-2 ${
        darkMode ? 'bg-gray-800/50' : 'bg-white'
      }`}>
        <Gauge className={`w-3.5 h-3.5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        {[0.5, 0.75, 1, 1.25, 1.5, 2].map(speed => (
          <button
            key={speed}
            onClick={() => {
              setRate(speed);
              if (isPlaying) {
                window.speechSynthesis.cancel();
                setTimeout(() => startSpeaking(), 100);
              }
            }}
            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
              rate === speed
                ? 'bg-amber-600 text-white shadow-sm'
                : darkMode
                  ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-amber-100'
            }`}
          >
            {speed}x
          </button>
        ))}
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`overflow-hidden border-t ${darkMode ? 'border-gray-700' : 'border-amber-100'}`}
          >
            <div className={`p-4 space-y-4 ${darkMode ? 'bg-gray-800' : 'bg-amber-50/50'}`}>
              {/* Voice Selection */}
              <div>
                <label className={`text-xs font-medium mb-1.5 block ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <Mic className="w-3 h-3 inline mr-1" />
                  Voice ({voices.length} available)
                </label>
                <select
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const voice = voices.find(v => v.name === e.target.value);
                    if (voice) setSelectedVoice(voice);
                  }}
                  className={`w-full px-3 py-2 rounded-lg text-sm border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-amber-200 text-gray-800'
                  }`}
                >
                  {Object.entries(voicesByLang).map(([lang, langVoices]) => (
                    <optgroup key={lang} label={lang.toUpperCase()}>
                      {langVoices.map(voice => (
                        <option key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Volume Slider */}
              <div>
                <label className={`text-xs font-medium mb-1.5 flex items-center justify-between ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span><Volume2 className="w-3 h-3 inline mr-1" /> Volume</span>
                  <span>{Math.round(volume * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Pitch Slider */}
              <div>
                <label className={`text-xs font-medium mb-1.5 flex items-center justify-between ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <span>Pitch</span>
                  <span>{pitch}</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visualizer (when playing) */}
      {isPlaying && !isPaused && (
        <div className={`px-4 py-2 flex items-center justify-center gap-1 ${
          darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-amber-50 to-orange-50'
        }`}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-1 rounded-full ${
                darkMode ? 'bg-amber-500' : 'bg-amber-400'
              }`}
              animate={{
                height: [4, Math.random() * 16 + 4, 4],
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
