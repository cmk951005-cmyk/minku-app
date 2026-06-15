import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import pinkIntroVideo from '../assets/pink_intro_video.mp4';
import blueIntroVideo from '../assets/blue_intro_video.mp4';

interface Props {
  onSkip: () => void;
}

const MikuIntro: React.FC<Props> = ({ onSkip }) => {
  const { theme } = useTheme();
  const videoSrc = theme === 'blue' ? blueIntroVideo : pinkIntroVideo;

  return (
    <div className="miku-intro-screen" style={{ position: 'relative' }}>
      <button
        onClick={onSkip}
        type="button"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          padding: '4px 12px',
          fontSize: '12px',
          background: 'rgba(255,255,255,0.75)',
          border: '1px solid rgba(0,0,0,0.15)',
          borderRadius: 20,
          cursor: 'pointer',
          color: '#555',
          zIndex: 10,
        }}
      >
        пропуск ›
      </button>
      <video
        key={theme}
        className="miku-intro-video"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
      />
    </div>
  );
};

export default MikuIntro;