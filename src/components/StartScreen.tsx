import React, { useState, useEffect } from 'react';
import mikuHi from '../assets/miku-hi.png';

interface Props { onStart: () => void; }

const StartScreen: React.FC<Props> = ({ onStart }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div className={`start-screen ${visible ? 'start-visible' : ''}`}>
      <div className="start-hero">
        <img src={mikuHi} alt="미쿠" className="start-miku" />
        <div className="start-bubble">Привет! 안녕!</div>
      </div>

      <div className="start-titles">
        <h1 className="start-main-title">미쿠와 함께 배우는 한국어</h1>
        <h2 className="start-sub-title">С Мику · корейская грамматика</h2>
        <p className="start-desc">
          Учим корейский через 4 темы с объяснениями на русском.
          Выбери уровень и начинай!
        </p>
      </div>

      <div className="start-features">
        {[
          { emoji: '🔢', kr: '수사 + 단위명사', ru: '개, 명, 마리, 권, 장, 잔…' },
          { emoji: '🚪', kr: '이동 · 방향 동사', ru: '들어오다/가다, 나오다/나가다' },
          { emoji: '💬', kr: '이유 · 원인 표현', ru: '아서, 니까, 덕분에, 까봐, 느라고…' },
          { emoji: '🙋', kr: '존댓말 / 반말 표현', ru: '해요, 해, 습니다, 죠…' },
        ].map(f => (
          <div key={f.kr} className="start-feature-pill">
            <span className="start-feature-icon">{f.emoji}</span>
            <div>
              <div className="start-feature-kr">{f.kr}</div>
              <div className="start-feature-ru">{f.ru}</div>
            </div>
          </div>
        ))}
      </div>

      <button className="start-btn" onClick={onStart} type="button">
        Начать →
      </button>
      <p className="start-note">4 темы · 5 уровней · Объяснения на русском</p>
    </div>
  );
};

export default StartScreen;
