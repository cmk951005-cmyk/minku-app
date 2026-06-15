import React from 'react';
import { UserLevel, GrammarCategory } from '../types';
import { CATEGORIES, categoryMeta } from '../data/questions';
import { useTheme } from '../contexts/ThemeContext';
import mikuFlowerParty from '../assets/miku-flower-party.png';
import otterWink from '../assets/otter-wink.png';

interface Props {
  userLevel: UserLevel;
  completedCategories: GrammarCategory[];
  onSelect: (category: GrammarCategory) => void;
  onReset: () => void;
  onBack: () => void;
}

const CategorySelect: React.FC<Props> = ({ completedCategories, onSelect, onReset, onBack }) => {
  const { theme } = useTheme();
  const img = theme === 'blue' ? otterWink : mikuFlowerParty;

  const handleReset = () => {
    if (window.confirm('정말 초기화하시겠습니까?\nВы уверены, что хотите сбросить весь прогресс?')) {
      onReset();
    }
  };

  return (
    <div className="category-select-screen">
      <div className="cat-top-bar">
        <button className="back-btn" onClick={onBack} type="button" title="Назад">⬅</button>
      </div>
      <div className="cat-header">
        <img src={img} alt="캐릭터" className="cat-miku" />
        <h2 className="cat-title">Выбери раздел для учёбы</h2>
        <p className="cat-subtitle">4 темы корейской грамматики</p>
      </div>
      <div className="cat-cards">
        {CATEGORIES.map(cat => {
          const meta = categoryMeta[cat];
          const isDone = completedCategories.includes(cat);
          return (
            <button
              key={cat}
              className={`cat-card ${isDone ? 'cat-card-done' : ''}`}
              onClick={() => !isDone && onSelect(cat)}
              disabled={isDone}
              type="button"
            >
              <div className="cat-emoji">{meta.emoji}</div>
              <div className="cat-names">
                <div className="cat-kr">{meta.nameKr}</div>
                <div className="cat-ru">{meta.nameRu}</div>
              </div>
              {isDone && <div className="cat-done-badge">✅ Готово</div>}
            </button>
          );
        })}
      </div>
      {completedCategories.length === CATEGORIES.length && (
        <div className="cat-all-done">Все разделы изучены! 🎉</div>
      )}
      {completedCategories.length > 0 && (
        <button className="reset-btn" onClick={handleReset} type="button">
          🔄 Сбросить прогресс
        </button>
      )}
    </div>
  );
};

export default CategorySelect;
