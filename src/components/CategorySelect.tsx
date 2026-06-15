import React, { useState } from 'react';
import { UserLevel, GrammarCategory } from '../types';
import { CATEGORIES, categoryMeta } from '../data/questions';
import { useTheme } from '../contexts/ThemeContext';
import mikuFlowerParty from '../assets/miku-flower-party.png';
import otterWink from '../assets/otter-wink.png';
import GrammarOverview from './GrammarOverview';

interface Props {
  userLevel: UserLevel;
  completedCategories: GrammarCategory[];
  onSelect: (category: GrammarCategory) => void;
  onReset: () => void;
  onBack: () => void;
  onGoMistakes?: () => void;
  onGoVocab?: () => void;
  onGoSpeaking?: () => void;
  mistakeCount?: number;
}

type MainView = 'main' | 'grammar';

const CategorySelect: React.FC<Props> = ({
  userLevel, completedCategories, onSelect, onReset, onBack,
  onGoMistakes, onGoVocab, onGoSpeaking, mistakeCount = 0,
}) => {
  const { theme } = useTheme();
  const img = theme === 'blue' ? otterWink : mikuFlowerParty;
  const [mainView, setMainView] = useState<MainView>('main');
  const [showGrammar, setShowGrammar] = useState(false);

  const handleReset = () => {
    if (window.confirm('Вы уверены, что хотите сбросить весь прогресс?')) {
      onReset();
    }
  };

  // ── GRAMMAR OVERVIEW OVERLAY ─────────────────────────────────────
  if (showGrammar) {
    return <GrammarOverview userLevel={userLevel} onClose={() => setShowGrammar(false)} />;
  }

  // ── GRAMMAR SUB-SECTION ──────────────────────────────────────────
  if (mainView === 'grammar') {
    return (
      <div className="category-select-screen">
        <div className="cat-top-bar">
          <button className="back-btn" onClick={() => setMainView('main')} type="button" title="Назад" aria-label="Назад">⬅</button>
          <span className="cat-top-title">Грамматика</span>
          {onGoMistakes && (
            <button
              className={`cat-quick-btn cat-quick-mistakes ${mistakeCount > 0 ? 'cat-quick-mistakes-active' : ''}`}
              onClick={onGoMistakes}
              type="button"
              title="Работа над ошибками"
            >
              📕{mistakeCount > 0 ? ` (${mistakeCount})` : ''}
            </button>
          )}
        </div>

        <div className="cat-header">
          <img src={img} alt="캐릭터" className="cat-miku" />
          <h2 className="cat-title">Грамматика</h2>
          <p className="cat-subtitle">Уровень {userLevel}</p>
        </div>

        <div className="cat-cards">
          {/* Общая грамматика — opens full grammar overview */}
          <button
            className="cat-card cat-card-grammar"
            onClick={() => setShowGrammar(true)}
            type="button"
            aria-label="Открыть общую грамматику"
          >
            <div className="cat-emoji">📚</div>
            <div className="cat-names">
              <div className="cat-kr">전체 문법 정리</div>
              <div className="cat-ru">Общая грамматика</div>
            </div>
            <div className="cat-grammar-arrow">›</div>
          </button>

          {/* Individual grammar categories (quiz) */}
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
                aria-label={`${meta.nameRu}: ${isDone ? 'завершено' : 'начать'}`}
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
          <button className="reset-btn" onClick={handleReset} type="button" aria-label="Сбросить прогресс">
            🔄 Сбросить прогресс
          </button>
        )}
      </div>
    );
  }

  // ── MAIN VIEW — Словарь + Грамматика ────────────────────────────
  return (
    <div className="category-select-screen">
      <div className="cat-top-bar">
        <button className="back-btn" onClick={onBack} type="button" title="Назад" aria-label="Назад">⬅</button>
        <span className="cat-top-title">Выбери раздел</span>
        {onGoMistakes && (
          <button
            className={`cat-quick-btn cat-quick-mistakes ${mistakeCount > 0 ? 'cat-quick-mistakes-active' : ''}`}
            onClick={onGoMistakes}
            type="button"
            title="Работа над ошибками"
          >
            📕{mistakeCount > 0 ? ` (${mistakeCount})` : ''}
          </button>
        )}
      </div>

      <div className="cat-header">
        <img src={img} alt="캐릭터" className="cat-miku" />
        <h2 className="cat-title">Выбери раздел для учёбы</h2>
        <p className="cat-subtitle">Корейский · Уровень {userLevel}</p>
      </div>

      <div className="cat-main-cards">
        {/* Словарь */}
        <button
          className="cat-main-card cat-main-card-vocab"
          onClick={onGoVocab}
          type="button"
          aria-label="Открыть словарь"
        >
          <div className="cat-main-emoji">📖</div>
          <div className="cat-main-info">
            <div className="cat-main-title">Словарь</div>
            <div className="cat-main-sub">416 слов · по темам</div>
          </div>
          <div className="cat-main-arrow">›</div>
        </button>

        {/* Грамматика */}
        <button
          className="cat-main-card cat-main-card-grammar"
          onClick={() => setMainView('grammar')}
          type="button"
          aria-label="Открыть грамматику"
        >
          <div className="cat-main-emoji">📝</div>
          <div className="cat-main-info">
            <div className="cat-main-title">Грамматика</div>
            <div className="cat-main-sub">
              общая · счётные · глаголы · причина · вежливость
            </div>
          </div>
          <div className="cat-main-arrow">›</div>
        </button>

        {/* Говорение */}
        <button
          className="cat-main-card cat-main-card-speaking"
          onClick={onGoSpeaking}
          type="button"
          aria-label="Открыть говорение"
        >
          <div className="cat-main-emoji">🗣️</div>
          <div className="cat-main-info">
            <div className="cat-main-title">Говорение</div>
            <div className="cat-main-sub">말하기 · Level 1–5 · 듣기 + 고르기</div>
          </div>
          <div className="cat-main-arrow">›</div>
        </button>
      </div>
    </div>
  );
};

export default CategorySelect;
