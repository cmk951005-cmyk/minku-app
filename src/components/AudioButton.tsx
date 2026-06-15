import React, { useState } from 'react';
import { useTts } from '../contexts/TtsContext';

interface Props { text: string; small?: boolean; }

const AudioButton: React.FC<Props> = ({ text, small = false }) => {
  const [playing, setPlaying] = useState(false);
  const { speed } = useTts();

  const speak = () => {
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = speed;
    u.onend = () => setPlaying(false);
    u.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(u);
    setPlaying(true);
  };

  return (
    <button
      onClick={speak}
      className={`audio-btn ${playing ? 'audio-btn-playing' : ''} ${small ? 'audio-btn-sm' : ''}`}
      type="button"
      aria-label="Произнести"
    >
      {playing ? (
        <svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
      )}
    </button>
  );
};

export default AudioButton;
