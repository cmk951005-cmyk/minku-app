import React, { useEffect } from 'react';
import { UserAnswer, UserLevel, GrammarCategory } from '../types';
import { categoryMeta } from '../data/questions';
import { useTheme } from '../contexts/ThemeContext';
import mikuFlower from '../assets/miku-flower.png';
import mikuFlowerParty from '../assets/miku-flower-party.png';
import otterHeart from '../assets/otter-heart.png';
import otterWink from '../assets/otter-wink.png';

interface Props {
  allAnswers: UserAnswer[];
  userLevel: UserLevel;
  completedCategories: GrammarCategory[];
  onRestart: () => void;
  streak?: number;
  onGoMistakes?: () => void;
}

const ResultScreen: React.FC<Props> = ({
  allAnswers, completedCategories, onRestart, streak = 0, onGoMistakes,
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    try {
      localStorage.setItem('miku-last-result', JSON.stringify({
        date: new Date().toLocaleDateString('ru-RU'),
        accuracy: getOverallAccuracy(),
      }));
    } catch {}
  }, [allAnswers]);

  const getOverallAccuracy = () => {
    if (allAnswers.length === 0) return 0;
    const correct = allAnswers.filter(a => a.isCorrect).length;
    return Math.round((correct / allAnswers.length) * 100);
  };

  const overall = getOverallAccuracy();

  const getMascotImg = () => {
    if (theme === 'blue') {
      return overall >= 80 ? otterHeart : otterWink;
    }
    return overall >= 80 ? mikuFlowerParty : mikuFlower;
  };

  const getTitle = () => {
    if (overall === 100) return '완벽해요! 🎉 Идеально!';
    if (overall >= 75) return '잘했어요! 👏 Отлично!';
    if (overall >= 50) return '좋아요! 💪 Хорошо!';
    return '계속 화이팅! 🌱 Продолжай учиться!';
  };

  const totalErrors = allAnswers.filter(a => !a.isCorrect).length;

  return (
    <div className="result-screen">
      <img src={getMascotImg()} alt="Персонаж" className="result-miku" />
      <h1 className="result-title">{getTitle()}</h1>

      {/* Streak badge (P2) */}
      {streak > 0 && (
        <div className="result-streak">
          🔥 Серия: <strong>{streak}</strong> {streak === 1 ? 'день' : streak < 5 ? 'дня' : 'дней'}!
        </div>
      )}

      <div className="result-score">
        <div className="score-num">{overall}%</div>
        <div className="score-label">Всего правильно</div>
      </div>

      <div className="result-breakdown">
        {completedCategories.map(cat => {
          const catAnswers = allAnswers.filter(a => a.category === cat);
          const correct = catAnswers.filter(a => a.isCorrect).length;
          const pct = catAnswers.length > 0 ? Math.round((correct / catAnswers.length) * 100) : 0;
          const meta = categoryMeta[cat];

          return (
            <div key={cat} className="result-item">
              <div className="result-item-header">
                <span className="result-cat-name">{meta.emoji} {meta.nameRu}</span>
                <span className="result-pct" style={{ color: pct >= 70 ? '#22c55e' : '#f87171' }}>
                  {pct}%
                </span>
              </div>
              <div className="result-bar">
                <div className="result-fill" style={{ width: `${pct}%`, background: pct >= 70 ? '#22c55e' : '#f87171' }} />
              </div>
              <div className="result-counts">{correct}/{catAnswers.length}</div>
            </div>
          );
        })}
      </div>

      {totalErrors > 0 && onGoMistakes && (
        <button className="result-mistakes-btn" onClick={onGoMistakes} type="button">
          📕 Работа над ошибками ({totalErrors})
        </button>
      )}

      <button className="result-btn" onClick={onRestart} type="button">
        Начать заново 🔄
      </button>
    </div>
  );
};

export default ResultScreen;
