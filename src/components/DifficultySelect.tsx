import React, { useState } from 'react';
import { CategorySelection, GrammarCategory, Difficulty } from '../types';
import { categoryInfo, difficultyInfo, CATEGORIES } from '../data/questions';
import { useTts } from '../contexts/TtsContext';
import mikuHi from '../assets/miku-hi.png';

interface Props { onStart: (selections: CategorySelection[]) => void; }

const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

const DifficultySelect: React.FC<Props> = ({ onStart }) => {
  const [selected, setSelected] = useState<Record<GrammarCategory, Difficulty | null>>({
    counters: 'beginner', movement: 'beginner', reasons: 'beginner', honorifics: 'beginner',
  });
  const { speed, setSpeed } = useTts();

  const toggle = (cat: GrammarCategory, diff: Difficulty) => {
    setSelected(prev => ({ ...prev, [cat]: prev[cat] === diff ? null : diff }));
  };

  const handleStart = () => {
    const combos: CategorySelection[] = CATEGORIES
      .filter(c => selected[c] !== null)
      .map(c => ({ category: c, difficulty: selected[c] as Difficulty }));
    if (combos.length === 0) return;
    onStart(combos);
  };

  const anySelected = CATEGORIES.some(c => selected[c] !== null);

  return (
    <div className="select-screen">
      <div className="select-header">
        <img src={mikuHi} alt="미쿠" className="select-miku" />
        <div>
          <h1 className="select-title">미쿠와 함께 배우는 한국어</h1>
          <p className="select-subtitle">С Мику · Выбери тему и уровень</p>
        </div>
      </div>

      <div className="select-categories">
        {CATEGORIES.map(cat => {
          const info = categoryInfo[cat];
          return (
            <div key={cat} className={`select-card ${selected[cat] ? 'select-card-active' : ''}`}>
              <div className="select-card-title">
                <span className="select-card-emoji">{info.emoji}</span>
                <div>
                  <div className="select-card-kr">{info.nameKr}</div>
                  <div className="select-card-ru">{info.nameRu}</div>
                </div>
              </div>
              <div className="select-diff-row">
                {difficulties.map(diff => {
                  const di = difficultyInfo[diff];
                  const active = selected[cat] === diff;
                  return (
                    <button
                      key={diff}
                      className={`diff-btn ${active ? 'diff-btn-active' : ''}`}
                      style={active ? { background: di.color, borderColor: di.color } : {}}
                      onClick={() => toggle(cat, diff)}
                      type="button"
                    >
                      {di.nameKr}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* TTS Speed selector */}
      <div className="speed-selector">
        <span className="speed-label">🔊 Скорость произношения:</span>
        <div className="speed-btns">
          {[1.0, 0.6].map(s => (
            <button
              key={s}
              className={`speed-btn ${speed === s ? 'speed-btn-active' : ''}`}
              onClick={() => setSpeed(s)}
              type="button"
            >
              {s === 1.0 ? '1.0× Обычная' : '0.6× Медленно'}
            </button>
          ))}
        </div>
      </div>

      <button
        className="select-start-btn"
        onClick={handleStart}
        disabled={!anySelected}
        type="button"
      >
        Начать учиться →
      </button>
    </div>
  );
};

export default DifficultySelect;
