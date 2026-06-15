import React, { useEffect, useState } from 'react';
import { AppStage, UserLevel } from '../types';
import { levelInfo } from '../data/questions';
import mikuBasic from '../assets/miku-basic.png';

const LEVELS: UserLevel[] = [1, 2, 3, 4, 5];

interface Props {
  appStage: AppStage;
  onStageChange: (s: AppStage) => void;
  onLevelSelect: (l: UserLevel) => void;
}

const OnboardingFlow: React.FC<Props> = ({ appStage, onStageChange, onLevelSelect }) => {
  const [splashOut, setSplashOut] = useState(false);
  const [mascotVisible, setMascotVisible] = useState(false);
  const [levelVisible, setLevelVisible] = useState(false);

  // ── Splash → Mascot ────────────────────────────────────────
  useEffect(() => {
    if (appStage === 'splash') {
      const t1 = setTimeout(() => setSplashOut(true), 1400);
      const t2 = setTimeout(() => onStageChange('mascot'), 1800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [appStage]);

  // ── Mascot → Level Select ──────────────────────────────────
  useEffect(() => {
    if (appStage === 'mascot') {
      setMascotVisible(false);
      const t1 = setTimeout(() => setMascotVisible(true), 50);
      const t2 = setTimeout(() => {
        setMascotVisible(false);
        setTimeout(() => onStageChange('level-select'), 400);
      }, 1800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [appStage]);

  // ── Level Select fade in ───────────────────────────────────
  useEffect(() => {
    if (appStage === 'level-select') {
      const t = setTimeout(() => setLevelVisible(true), 50);
      return () => clearTimeout(t);
    } else {
      setLevelVisible(false);
    }
  }, [appStage]);

  const handleLevelPick = (l: UserLevel) => {
    onLevelSelect(l);
    onStageChange('category-select');
  };

  // ── SPLASH ────────────────────────────────────────────────
  if (appStage === 'splash') {
    return (
      <div className={`splash-screen ${splashOut ? 'splash-out' : ''}`}>
        <div className="splash-logo">
          <span className="splash-L">L</span>
          <span className="splash-rest">ango</span>
        </div>
        <p className="splash-tagline">한국어 · Корейский</p>
      </div>
    );
  }

  // ── MASCOT ────────────────────────────────────────────────
  if (appStage === 'mascot') {
    return (
      <div className="mascot-screen">
        <div className={`mascot-content ${mascotVisible ? 'mascot-visible' : ''}`}>
          <img src={mikuBasic} alt="미쿠" className="mascot-img" />
          <div className="mascot-bubble">안녕하세요! 👋</div>
        </div>
      </div>
    );
  }

  // ── LEVEL SELECT ──────────────────────────────────────────
  return (
    <div className={`level-screen ${levelVisible ? 'level-visible' : ''}`}>
      <div className="level-header">
        <img src={mikuBasic} alt="미쿠" className="level-miku" />
        <div className="level-question">
          Насколько хорошо вы знаете корейский?
        </div>
      </div>

      <div className="level-cards">
        {LEVELS.map((lv) => (
          <button
            key={lv}
            className="level-card"
            onClick={() => handleLevelPick(lv)}
            type="button"
          >
            <span className="level-card-num">{lv}</span>
            <span className="level-card-label">{levelInfo[lv].label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OnboardingFlow;
