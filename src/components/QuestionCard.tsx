import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Question, FeedbackState } from '../types';
import TranslationToggle from './TranslationToggle';
import HangulKeyboard from './HangulKeyboard';

interface Props {
  question: Question;
  feedbackState: FeedbackState;
  onAnswer: (q: Question, input: string, correct: boolean) => void;
  userLevel?: number;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const QuestionCard: React.FC<Props> = ({ question, feedbackState, onAnswer, userLevel = 3 }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [hintVisible, setHintVisible] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showHangulKb, setShowHangulKb] = useState(false);

  // Word arrange state
  const [availableTokens, setAvailableTokens] = useState<{ id: string; text: string }[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<{ id: string; text: string }[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const isLocked = feedbackState !== 'idle';

  // Beginners always see translation; others can toggle
  const defaultTranslationVisible = userLevel <= 1;

  // Reset on question change
  useEffect(() => {
    setSelectedId(null);
    setInput('');
    setHintVisible(false);
    setPlayingId(null);
    setShowHangulKb(false);
    window.speechSynthesis.cancel();

    if (question.type === 'wordArrange' && question.wordItems) {
      const shuffled = shuffleArray(question.wordItems).map((text, i) => ({
        id: `tok-${i}-${text}`,
        text,
      }));
      setAvailableTokens(shuffled);
      setSelectedTokens([]);
    }

    if (question.type === 'short' && !showHangulKb && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [question.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const speak = (rate: number, btnId: string) => {
    if (playingId === btnId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const text = question.promptKr.replace(/___/g, '');
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = rate;
    u.onend = () => setPlayingId(null);
    u.onerror = () => setPlayingId(null);
    window.speechSynthesis.speak(u);
    setPlayingId(btnId);
  };

  const submit = (answer: string) => {
    if (isLocked) return;
    const trimmed = answer.trim();
    const isCorrect = question.acceptedAnswers.some(
      a => a.trim().replace(/\.$/, '') === trimmed.replace(/\.$/, '')
    );
    onAnswer(question, trimmed, isCorrect);
  };

  const handleChoiceClick = (id: string, text: string) => {
    if (isLocked) return;
    setSelectedId(id);
    submit(text);
  };

  const handleShortSubmit = () => {
    if (!input.trim()) return;
    submit(input);
  };

  const handleTokenSelect = useCallback(
    (tok: { id: string; text: string }) => {
      if (isLocked) return;
      setAvailableTokens(prev => prev.filter(t => t.id !== tok.id));
      setSelectedTokens(prev => [...prev, tok]);
    },
    [isLocked]
  );

  const handleTokenDeselect = useCallback(
    (tok: { id: string; text: string }) => {
      if (isLocked) return;
      setSelectedTokens(prev => prev.filter(t => t.id !== tok.id));
      setAvailableTokens(prev => [...prev, tok]);
    },
    [isLocked]
  );

  const handleWordArrangeSubmit = () => {
    if (isLocked || selectedTokens.length === 0) return;
    const answer = selectedTokens.map(t => t.text).join(' ');
    submit(answer);
  };

  const getChoiceClass = (id: string, text: string): string => {
    const base = 'question-choice';
    if (isLocked) {
      if (feedbackState === 'correct' && selectedId === id) return `${base} choice-correct`;
      if (feedbackState === 'incorrect') {
        if (selectedId === id) return `${base} choice-wrong`;
        if (question.acceptedAnswers.some(a => a.trim() === text.trim()))
          return `${base} choice-reveal`;
      }
    }
    return base;
  };

  const assembledAnswer = selectedTokens.map(t => t.text).join(' ');

  return (
    <div
      className={`question-card ${
        feedbackState === 'correct'
          ? 'qcard-correct'
          : feedbackState === 'incorrect'
          ? 'qcard-wrong'
          : ''
      }`}
    >
      {/* TTS buttons + instruction */}
      <div className="tts-buttons">
        <button
          className={`tts-btn ${playingId === 'normal' ? 'tts-btn-playing' : ''}`}
          onClick={() => speak(1.0, 'normal')}
          type="button"
          title="Прослушать"
          aria-label="Прослушать вопрос"
        >🔊</button>
        <button
          className={`tts-btn ${playingId === 'slow' ? 'tts-btn-playing' : ''}`}
          onClick={() => speak(0.5, 'slow')}
          type="button"
          title="Медленно"
          aria-label="Прослушать медленно"
        >🐌</button>
        {question.instructionRu && (
          <span className="instruction-ru-small">{question.instructionRu}</span>
        )}
      </div>

      {/* Korean prompt */}
      <div className="question-prompt-kr">
        <span className="question-text-kr">{question.promptKr}</span>
      </div>

      {/* Translation toggle (P0-1) */}
      <TranslationToggle
        translationRu={question.promptRu}
        defaultVisible={defaultTranslationVisible}
        compact
      />

      {/* Hint button — shows grammar meaning, not the full answer */}
      <div className="hint-row">
        <button
          className={`hint-toggle-btn ${hintVisible ? 'hint-toggle-open' : ''}`}
          onClick={() => setHintVisible(!hintVisible)}
          type="button"
          aria-label={hintVisible ? 'Скрыть подсказку' : 'Показать подсказку'}
          aria-expanded={hintVisible}
        >?</button>
        {hintVisible ? (
          <p className="question-prompt-ru hint-visible">
            {question.hint || question.explanationRu?.split('\n')[0] || question.promptRu}
          </p>
        ) : (
          <div className="hint-hidden-bar" />
        )}
      </div>

      {/* ── MULTIPLE CHOICE ── */}
      {question.type === 'multiple' && question.choices && (
        <div className="question-choices">
          {question.choices.map(c => (
            <button
              key={c.id}
              className={getChoiceClass(c.id, c.text)}
              onClick={() => handleChoiceClick(c.id, c.text)}
              disabled={isLocked}
              type="button"
            >
              {c.text}
            </button>
          ))}
        </div>
      )}

      {/* ── SHORT ANSWER ── */}
      {question.type === 'short' && (
        <div className="question-short-wrapper">
          <div className="question-short">
            <input
              ref={inputRef}
              type="text"
              className={`short-input ${
                feedbackState === 'correct'
                  ? 'input-correct'
                  : feedbackState === 'incorrect'
                  ? 'input-wrong'
                  : ''
              }`}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleShortSubmit()}
              disabled={isLocked}
              placeholder="Напишите ответ..."
              autoComplete="off"
              spellCheck={false}
              aria-label="Поле для ответа"
            />
            <button
              className="short-btn"
              onClick={handleShortSubmit}
              disabled={isLocked || !input.trim()}
              type="button"
              aria-label="Подтвердить ответ"
            >✓</button>
          </div>
          {/* Hangul keyboard toggle (P1-6) */}
          {!isLocked && (
            <button
              className={`hangul-kb-toggle ${showHangulKb ? 'hangul-kb-toggle-active' : ''}`}
              onClick={() => setShowHangulKb(v => !v)}
              type="button"
              aria-label={showHangulKb ? 'Скрыть корейскую клавиатуру' : 'Показать корейскую клавиатуру'}
              title="Корейская клавиатура"
            >
              🇰🇷 {showHangulKb ? 'Скрыть клавиатуру' : 'Корейская клавиатура'}
            </button>
          )}
          {showHangulKb && !isLocked && (
            <HangulKeyboard
              currentValue={input}
              onInput={val => setInput(val)}
              onClose={() => setShowHangulKb(false)}
            />
          )}
        </div>
      )}

      {/* ── WORD ARRANGE ── */}
      {question.type === 'wordArrange' && (
        <div className="word-arrange-container">
          <div
            className={`wa-answer-zone ${
              feedbackState === 'correct'
                ? 'wa-zone-correct'
                : feedbackState === 'incorrect'
                ? 'wa-zone-wrong'
                : selectedTokens.length > 0
                ? 'wa-zone-active'
                : ''
            }`}
          >
            {selectedTokens.length === 0 ? (
              <span className="wa-placeholder">Нажимай на слова ниже, чтобы составить ответ…</span>
            ) : (
              selectedTokens.map(tok => (
                <button
                  key={tok.id}
                  className="wa-token wa-token-selected"
                  onClick={() => handleTokenDeselect(tok)}
                  disabled={isLocked}
                  type="button"
                  aria-label={`Убрать слово ${tok.text}`}
                >
                  {tok.text}
                </button>
              ))
            )}
          </div>

          <div className="wa-tokens-pool">
            {availableTokens.map(tok => (
              <button
                key={tok.id}
                className="wa-token wa-token-available"
                onClick={() => handleTokenSelect(tok)}
                disabled={isLocked}
                type="button"
                aria-label={`Добавить слово ${tok.text}`}
              >
                {tok.text}
              </button>
            ))}
          </div>

          {!isLocked && (
            <div className="wa-actions">
              <button
                className="wa-reset-btn"
                onClick={() => {
                  if (question.wordItems) {
                    const all = [...availableTokens, ...selectedTokens];
                    setAvailableTokens(all);
                    setSelectedTokens([]);
                  }
                }}
                type="button"
                disabled={selectedTokens.length === 0}
                aria-label="Сбросить"
              >↺ Сброс</button>
              <button
                className="wa-submit-btn"
                onClick={handleWordArrangeSubmit}
                disabled={selectedTokens.length === 0}
                type="button"
                aria-label="Проверить ответ"
              >✓ Проверить</button>
            </div>
          )}

          {isLocked && assembledAnswer && (
            <div className="wa-assembled">{assembledAnswer}</div>
          )}
        </div>
      )}

      {/* Feedback */}
      {feedbackState === 'correct' && (
        <div className="feedback-correct" role="status">✓ Правильно! 잘했어요!</div>
      )}
      {feedbackState === 'incorrect' && (
        <div className="feedback-wrong" role="alert">
          ✗ Неверно. Правильный ответ:{' '}
          <strong className="ans-text">{question.correctAnswer}</strong>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
