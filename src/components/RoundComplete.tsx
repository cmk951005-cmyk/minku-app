import React, { useEffect, useState } from 'react';
import { UserLevel, GrammarCategory, UserAnswer } from '../types';
import { categoryMeta } from '../data/questions';
import { useTheme } from '../contexts/ThemeContext';
import mikuFlower from '../assets/miku-flower.png';
import mikuFlowerParty from '../assets/miku-flower-party.png';
import mikuIce from '../assets/miku-icecream.png';
import otterHeart from '../assets/otter-heart.png';
import otterWink from '../assets/otter-wink.png';
import otterQuestion from '../assets/otter-question.png';

interface Props {
  category: GrammarCategory;
  userLevel: UserLevel;
  allAnswers: UserAnswer[];
  onContinue: () => void;
  onGoMistakes?: () => void;
}

const RoundComplete: React.FC<Props> = ({ category, allAnswers, onContinue, onGoMistakes }) => {
  const [show, setShow] = useState(false);
  const { theme } = useTheme();
  useEffect(() => { setShow(true); }, []);

  const catAnswers = allAnswers.filter(a => a.category === category);
  const correct = catAnswers.filter(a => a.isCorrect).length;
  const total = catAnswers.length;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const meta = categoryMeta[category];
  const errors = total - correct;

  // Mascot emotion based on score (P2)
  const getMascotImg = () => {
    if (theme === 'blue') {
      if (accuracy === 100) return otterHeart;
      if (accuracy >= 70) return otterWink;
      return otterQuestion;
    } else {
      if (accuracy === 100) return mikuFlowerParty;
      if (accuracy >= 70) return mikuFlower;
      return mikuIce;
    }
  };

  const getTitle = () => {
    if (accuracy === 100) return '완벽해요! Великолепно! 🎉';
    if (accuracy >= 80) return '잘했어요! Отлично! 👏';
    if (accuracy >= 60) return '좋아요! Хорошо! 💪';
    return 'Продолжай стараться! 🌱';
  };

  return (
    <div className={`round-complete ${show ? 'round-show' : ''}`}>
      <img src={getMascotImg()} alt="Персонаж" className="round-miku" />
      <h2 className="round-title">{getTitle()}</h2>
      <p className="round-cat">{meta.emoji} {meta.nameKr} · {meta.nameRu}</p>

      <div className="round-stats">
        <div className="stat-item">
          <span className="stat-num green">{correct}</span>
          <span className="stat-label">Правильно</span>
        </div>
        <div className="stat-item">
          <span className="stat-num red">{errors}</span>
          <span className="stat-label">Ошибок</span>
        </div>
        <div className="stat-item">
          <span className="stat-num accent">{accuracy}%</span>
          <span className="stat-label">Точность</span>
        </div>
      </div>

      {errors > 0 && onGoMistakes && (
        <button className="round-mistakes-btn" onClick={onGoMistakes} type="button">
          📕 Работа над ошибками ({errors})
        </button>
      )}

      <button className="round-btn" onClick={onContinue} type="button">Далее →</button>
    </div>
  );
};

export default RoundComplete;
