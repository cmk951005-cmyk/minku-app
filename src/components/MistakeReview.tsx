import React, { useState, useEffect, useCallback } from 'react';
import { MistakeEntry } from '../types';
import { loadMistakes, removeMistake, clearMistakes } from '../utils/storage';
import { useTheme } from '../contexts/ThemeContext';
import otterHi from '../assets/otter-hi.png';
import mikuHi from '../assets/miku-hi.png';
import TranslationToggle from './TranslationToggle';

interface Props {
  onBack: () => void;
}

const MistakeReview: React.FC<Props> = ({ onBack }) => {
  const { theme } = useTheme();
  const img = theme === 'blue' ? otterHi : mikuHi;

  const [mistakes, setMistakes] = useState<MistakeEntry[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [mode, setMode] = useState<'list' | 'practice'>('list');
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceResult, setPracticeResult] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => { setMistakes(loadMistakes()); }, []);

  const current = mistakes[currentIdx];

  const handleRemove = useCallback((questionId: string) => {
    removeMistake(questionId);
    setMistakes(loadMistakes());
    setCurrentIdx(i => Math.max(0, i - 1));
  }, []);

  const handleClearAll = () => {
    if (window.confirm('Очистить все ошибки?')) {
      clearMistakes();
      setMistakes([]);
    }
  };

  const handlePracticeAnswer = () => {
    if (!current) return;
    const trimmed = practiceInput.trim();
    const isCorrect = current.question.acceptedAnswers.some(
      a => a.trim().replace(/\.$/, '') === trimmed.replace(/\.$/, '')
    );
    setPracticeResult(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      setTimeout(() => {
        handleRemove(current.question.id);
        setPracticeInput('');
        setPracticeResult('idle');
        setShowAnswer(false);
        setCurrentIdx(i => Math.min(i, mistakes.length - 2));
      }, 1200);
    }
  };

  const nextCard = () => {
    setCurrentIdx(i => (i + 1) % mistakes.length);
    setShowAnswer(false);
    setPracticeInput('');
    setPracticeResult('idle');
  };

  const prevCard = () => {
    setCurrentIdx(i => (i - 1 + mistakes.length) % mistakes.length);
    setShowAnswer(false);
    setPracticeInput('');
    setPracticeResult('idle');
  };

  // ── LIST MODE ──────────────────────────────────────────────────────
  if (mode === 'list') {
    return (
      <div className="mistake-review-screen">
        <div className="mistake-top-bar">
          <button className="back-btn" onClick={onBack} type="button">⬅</button>
          <h2 className="mistake-title">📕 Работа над ошибками</h2>
          {mistakes.length > 0 && (
            <button className="mistake-clear-btn" onClick={handleClearAll} type="button" title="Очистить всё">🗑️</button>
          )}
        </div>

        {mistakes.length === 0 ? (
          <div className="mistake-empty">
            <img src={img} alt="персонаж" className="mistake-empty-img" />
            <p className="mistake-empty-text">Ошибок нет! 🎉</p>
            <p className="mistake-empty-sub">Продолжай практиковаться — здесь появятся вопросы, на которые ты ответил(а) неверно.</p>
            <button className="mistake-back-btn" onClick={onBack} type="button">← Назад</button>
          </div>
        ) : (
          <>
            <p className="mistake-count">Вопросов для повторения: <strong>{mistakes.length}</strong></p>
            <button
              className="mistake-practice-btn"
              onClick={() => { setCurrentIdx(0); setMode('practice'); }}
              type="button"
            >
              🔁 Практиковать ошибки
            </button>

            <div className="mistake-list">
              {mistakes.map((entry, idx) => (
                <div key={entry.question.id} className="mistake-item">
                  <div className="mistake-item-num">{idx + 1}</div>
                  <div className="mistake-item-body">
                    <div className="mistake-item-kr">{entry.question.promptKr}</div>
                    <div className="mistake-item-ru">{entry.question.promptRu}</div>
                    <div className="mistake-item-meta">
                      <span className="mistake-wrong-ans">❌ {entry.userInput || '(пусто)'}</span>
                      <span className="mistake-right-ans">✓ {entry.question.correctAnswer}</span>
                    </div>
                  </div>
                  <button
                    className="mistake-remove-btn"
                    onClick={() => handleRemove(entry.question.id)}
                    type="button"
                    aria-label="Убрать ошибку"
                    title="Убрать"
                  >✕</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  // ── PRACTICE MODE ──────────────────────────────────────────────────
  return (
    <div className="mistake-practice-screen">
      <div className="mistake-top-bar">
        <button className="back-btn" onClick={() => { setMode('list'); setPracticeResult('idle'); }} type="button">⬅</button>
        <div className="mistake-progress-text">{currentIdx + 1} / {mistakes.length}</div>
        <div style={{ width: 36 }} />
      </div>

      <div className="mistake-progress-bar">
        <div className="mistake-progress-fill" style={{ width: `${((currentIdx + 1) / mistakes.length) * 100}%` }} />
      </div>

      {current && (
        <div className={`mistake-practice-card ${practiceResult === 'correct' ? 'mpc-correct' : practiceResult === 'wrong' ? 'mpc-wrong' : ''}`}>
          <div className="mpc-instruction">{current.question.instructionRu}</div>
          <div className="mpc-prompt-kr">{current.question.promptKr}</div>
          <TranslationToggle translationRu={current.question.promptRu} defaultVisible={false} />

          {/* Multiple choice */}
          {current.question.type === 'multiple' && current.question.choices && (
            <div className="mpc-choices">
              {current.question.choices.map(c => (
                <button
                  key={c.id}
                  className={`mpc-choice ${
                    practiceResult !== 'idle'
                      ? current.question.acceptedAnswers.includes(c.text)
                        ? 'mpc-choice-correct'
                        : practiceInput === c.text
                        ? 'mpc-choice-wrong'
                        : ''
                      : ''
                  }`}
                  onClick={() => {
                    if (practiceResult !== 'idle') return;
                    setPracticeInput(c.text);
                    const isCorrect = current.question.acceptedAnswers.some(
                      a => a.trim() === c.text.trim()
                    );
                    setPracticeResult(isCorrect ? 'correct' : 'wrong');
                    if (isCorrect) {
                      setTimeout(() => {
                        handleRemove(current.question.id);
                        setPracticeInput('');
                        setPracticeResult('idle');
                        setShowAnswer(false);
                      }, 1200);
                    }
                  }}
                  disabled={practiceResult !== 'idle'}
                  type="button"
                >
                  {c.text}
                </button>
              ))}
            </div>
          )}

          {/* Short answer */}
          {current.question.type !== 'multiple' && (
            <div className="mpc-short">
              <input
                type="text"
                className={`mpc-input ${practiceResult === 'correct' ? 'mpc-input-correct' : practiceResult === 'wrong' ? 'mpc-input-wrong' : ''}`}
                value={practiceInput}
                onChange={e => { if (practiceResult === 'idle') setPracticeInput(e.target.value); }}
                onKeyDown={e => e.key === 'Enter' && practiceResult === 'idle' && handlePracticeAnswer()}
                placeholder="Напишите ответ..."
                disabled={practiceResult !== 'idle'}
              />
              {practiceResult === 'idle' && (
                <button className="mpc-submit-btn" onClick={handlePracticeAnswer} type="button">✓</button>
              )}
            </div>
          )}

          {/* Feedback */}
          {practiceResult === 'correct' && (
            <div className="mpc-feedback mpc-feedback-correct">✅ Правильно! Вопрос убран из ошибок.</div>
          )}
          {practiceResult === 'wrong' && (
            <div className="mpc-feedback mpc-feedback-wrong">
              <div>❌ Неверно. Правильный ответ: <strong>{current.question.correctAnswer}</strong></div>
              <div className="mpc-explanation">{current.question.explanationRu}</div>
            </div>
          )}

          {/* Show answer toggle */}
          {practiceResult === 'idle' && !showAnswer && (
            <button className="mpc-hint-btn" onClick={() => setShowAnswer(true)} type="button">
              👁 Показать ответ
            </button>
          )}
          {showAnswer && practiceResult === 'idle' && (
            <div className="mpc-answer-reveal">Ответ: <strong>{current.question.correctAnswer}</strong></div>
          )}

          {/* Example */}
          <div className="mpc-example">
            <div className="mpc-example-kr">{current.question.exampleKr}</div>
            <div className="mpc-example-ru">{current.question.exampleRu}</div>
          </div>

          {/* Navigation */}
          {mistakes.length > 1 && (
            <div className="mpc-nav">
              <button className="mpc-nav-btn" onClick={prevCard} type="button">← Пред.</button>
              <button className="mpc-nav-btn" onClick={nextCard} type="button">След. →</button>
            </div>
          )}
        </div>
      )}

      {mistakes.length === 0 && (
        <div className="mistake-empty">
          <img src={img} alt="персонаж" className="mistake-empty-img" />
          <p className="mistake-empty-text">Все ошибки исправлены! 🎉</p>
          <button className="mistake-back-btn" onClick={onBack} type="button">← Вернуться</button>
        </div>
      )}
    </div>
  );
};

export default MistakeReview;
