import React, { useState } from 'react';
import { UserLevel } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import mikuBasic from '../assets/miku-basic.png';
import otterHeart from '../assets/otter-heart.png';

const levels: { value: UserLevel; ru: string }[] = [
  { value: 1, ru: 'Новичок' },
  { value: 2, ru: 'знаю несколько простых слов' },
  { value: 3, ru: 'могу поддержать простой разговор' },
  { value: 4, ru: 'могу обсудить различные темы' },
  { value: 5, ru: 'могу подробно обсудить большинство тем' },
];

interface Props {
  onSelect: (level: UserLevel) => void;
  streak?: number;
  mistakeCount?: number;
  onGoMistakes?: () => void;
}

const LevelSelect: React.FC<Props> = ({ onSelect, streak = 0, mistakeCount = 0, onGoMistakes }) => {
  const [selected, setSelected] = useState<UserLevel | null>(null);
  const { theme, toggleTheme } = useTheme();

  const handleSelect = (level: UserLevel) => {
    setSelected(level);
    setTimeout(() => onSelect(level), 300);
  };

  const img = theme === 'blue' ? otterHeart : mikuBasic;

  return (
    <div className="level-select-screen">
      <div className="level-top-bar">
        {/* Streak indicator (P2) */}
        {streak > 0 && (
          <div className="streak-badge" title="Серия дней подряд">
            🔥 {streak} {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'}
          </div>
        )}
        <div className="level-top-right">
          {onGoMistakes && mistakeCount > 0 && (
            <button
              className="level-mistakes-btn"
              onClick={onGoMistakes}
              type="button"
              aria-label={`Работа над ошибками (${mistakeCount})`}
            >
              📕 Ошибки ({mistakeCount})
            </button>
          )}
          <button className="theme-toggle-btn" onClick={toggleTheme} type="button" aria-label="Сменить тему">
            {theme === 'pink' ? '🔵 Синий' : '🩷 Розовый'}
          </button>
        </div>
      </div>

      <div className="level-header">
        <img src={img} alt="Персонаж" className="level-miku" />
        <div className="level-title-box">
          <h2 className="level-title">Насколько хорошо вы знаете корейский?</h2>
          <p className="level-subtitle">Выбери уровень, чтобы начать</p>
        </div>
      </div>

      <div className="level-options">
        {levels.map(lv => (
          <button
            key={lv.value}
            className={`level-btn ${selected === lv.value ? 'level-btn-selected' : ''}`}
            onClick={() => handleSelect(lv.value)}
            type="button"
            aria-label={`Уровень ${lv.value}: ${lv.ru}`}
          >
            <span className="level-num">Уровень {lv.value}</span>
            <span className="level-text">{lv.ru}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelect;
