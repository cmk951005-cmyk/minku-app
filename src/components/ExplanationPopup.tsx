import React, { useState } from 'react';
import { Question } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import mikuIce from '../assets/miku-icecream.png';
import otterQuestion from '../assets/otter-question.png';

interface Props {
  question: Question;
  userInput: string;
  onContinue: () => void;
  onSaveForReview?: () => void;
}

// ── Simple Markdown renderer (bold + tables) ──
function renderMd(text: string): React.ReactNode {
  const lines = text.split('\n');
  const nodes: React.ReactNode[] = [];
  let tableLines: string[] = [];
  let tableKey = 0;

  const flushTable = () => {
    if (tableLines.length === 0) return;
    const rows = tableLines.filter(l => !/^\|[\s\-|]+\|$/.test(l));
    nodes.push(
      <table key={`tbl-${tableKey++}`} className="exp-table">
        <tbody>
          {rows.map((row, ri) => {
            const cells = row.split('|').slice(1, -1);
            return (
              <tr key={ri}>
                {cells.map((cell, ci) => (
                  <td key={ci}>{renderInline(cell.trim())}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
    tableLines = [];
  };

  const renderInline = (s: string): React.ReactNode => {
    const parts = s.split(/\*\*(.+?)\*\*/);
    if (parts.length === 1) return s;
    return parts.map((p, i) =>
      i % 2 === 1 ? <strong key={i}>{p}</strong> : p
    );
  };

  lines.forEach((line, idx) => {
    if (line.startsWith('|')) {
      tableLines.push(line);
    } else {
      flushTable();
      if (line.trim() === '') {
        nodes.push(<br key={`br-${idx}`} />);
      } else {
        nodes.push(
          <p key={`p-${idx}`} className="exp-line">
            {renderInline(line)}
          </p>
        );
      }
    }
  });
  flushTable();
  return <>{nodes}</>;
}

/** Generate a short, contextual explanation of WHY the wrong answer is wrong (P0-3). */
function generateWhyWrongExplanation(question: Question, userInput: string): string {
  if (!userInput || userInput === question.correctAnswer) return '';
  const correct = question.correctAnswer;
  const wrong = userInput;
  const cat = question.category;

  if (cat === 'counters') {
    if (/명|마리|권|개|잔|병|장|벌|켤레|대|그릇|통|상자|봉지|봉|줄|송이|포기|알|채|척|덩어리/.test(wrong)) {
      return `«${wrong}» — это другое счётное слово. Оно используется для другого типа предметов. Правильное счётное слово «${correct}» подходит именно для этой категории объектов.`;
    }
    return `«${wrong}» — неверное счётное слово или форма числа. В корейском важно подобрать точное счётное слово к типу предмета. Правильный ответ: «${correct}».`;
  }

  if (cat === 'movement') {
    if (/가다|가요|가/.test(wrong) && /오다|와요|와/.test(correct)) {
      return `«${wrong}» содержит -가다 — движение ОТ говорящего (туда). Но в этой ситуации нужно движение К говорящему, поэтому правильно «${correct}» (-오다).`;
    }
    if (/오다|와요|와/.test(wrong) && /가다|가요|가/.test(correct)) {
      return `«${wrong}» содержит -오다 — движение К говорящему (сюда). Но в данном контексте нужно движение ОТ говорящего, поэтому правильно «${correct}» (-가다).`;
    }
    return `«${wrong}» — неверный глагол движения. Обрати внимание: -가다 (туда, от говорящего), -오다 (сюда, к говорящему). Правильный ответ: «${correct}».`;
  }

  if (cat === 'reasons') {
    const conjMap: Record<string, string> = {
      '그래서': 'выражает результат (поэтому)',
      '그리고': 'добавляет следующее действие (и, затем)',
      '하지만': 'выражает контраст (но)',
      '그러니까': 'делает вывод или даёт совет (поэтому / значит)',
      '그런데': 'переключает тему (но, кстати)',
      '그러면': 'выражает условие (тогда)',
      '때문에': 'указывает на причину (из-за)',
    };
    const wrongDesc = conjMap[wrong] ?? `союз «${wrong}»`;
    return `«${wrong}» здесь не подходит — он ${wrongDesc}. В этом предложении нужен союз «${correct}».`;
  }

  if (cat === 'honorifics') {
    const hasYo = (s: string) => /요$/.test(s.trim());
    if (hasYo(wrong) && !hasYo(correct)) {
      return `«${wrong}» — вежливая форма (존댓말, с «요»). Но здесь разговор с другом или близким, поэтому нужна разговорная форма 반말: «${correct}».`;
    }
    if (!hasYo(wrong) && hasYo(correct)) {
      return `«${wrong}» — разговорная форма (반말, без «요»). Но ситуация требует вежливой речи (존댓말): «${correct}».`;
    }
    return `«${wrong}» — неверная форма речи. В корейском важно учитывать, с кем говоришь: 존댓말(вежл.) — с незнакомыми и старшими; 반말(разг.) — с друзьями. Правильно: «${correct}».`;
  }

  return `«${wrong}» не подходит в данном контексте. Правильный ответ: «${correct}».`;
}

const ExplanationPopup: React.FC<Props> = ({ question, userInput, onContinue, onSaveForReview }) => {
  const { theme } = useTheme();
  const img = theme === 'blue' ? otterQuestion : mikuIce;
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [showWhyWrong, setShowWhyWrong] = useState(false);
  const [saved, setSaved] = useState(false);

  const whyWrong = generateWhyWrongExplanation(question, userInput);
  const isActuallyWrong = userInput !== question.correctAnswer && userInput !== '';

  const speak = (text: string, rate: number, btnId: string) => {
    if (playingId === btnId) {
      window.speechSynthesis.cancel();
      setPlayingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = rate;
    u.onend = () => setPlayingId(null);
    u.onerror = () => setPlayingId(null);
    window.speechSynthesis.speak(u);
    setPlayingId(btnId);
  };

  return (
    <div
      className="popup-overlay"
      onClick={e => e.target === e.currentTarget && onContinue()}
    >
      <div className="popup-container">
        <div className="popup-header">
          <div className="popup-error-badge">❌ Ошибка!</div>
          <img src={img} alt="캐릭터" className="popup-miku" />
        </div>

        <div className="popup-content">
          {/* ── Contrastive answer comparison (P0-3) ── */}
          <div className="explanation-answers">
            <div className="answer-box wrong">
              <div className="answer-label">Твой ответ</div>
              <div className="answer-value">{userInput || '(пусто)'}</div>
            </div>
            <div className="answer-box correct">
              <div className="answer-label">✓ Правильно</div>
              <div className="answer-value">{question.correctAnswer}</div>
            </div>
          </div>

          {/* ── Why wrong toggle (P0-3) ── */}
          {isActuallyWrong && whyWrong && (
            <div className="why-wrong-section">
              <button
                className={`why-wrong-toggle ${showWhyWrong ? 'why-wrong-open' : ''}`}
                onClick={() => setShowWhyWrong(w => !w)}
                type="button"
                aria-expanded={showWhyWrong}
              >
                {showWhyWrong ? '▲ Скрыть разбор' : '▼ Почему мой ответ неверен?'}
              </button>
              {showWhyWrong && (
                <div className="why-wrong-text" role="region" aria-live="polite">
                  {whyWrong}
                </div>
              )}
            </div>
          )}

          {/* ── Why correct is correct ── */}
          <div className="explanation-section">
            <h4 className="section-title">💡 Почему правильно</h4>
            <div className="explanation-text">
              {renderMd(question.explanationRu)}
            </div>
          </div>

          {/* ── Example with always-visible translation (P0-1) ── */}
          <div className="example-section">
            <div className="example-title-row">
              <h4 className="section-title">📝 Пример</h4>
              <div className="example-tts-buttons">
                <button
                  className={`tts-btn tts-btn-sm ${playingId === 'ex-normal' ? 'tts-btn-playing' : ''}`}
                  onClick={() => speak(question.exampleKr, 1.0, 'ex-normal')}
                  type="button"
                  title="Нормальная скорость"
                  aria-label="Прослушать пример"
                >🔊</button>
                <button
                  className={`tts-btn tts-btn-sm ${playingId === 'ex-slow' ? 'tts-btn-playing' : ''}`}
                  onClick={() => speak(question.exampleKr, 0.5, 'ex-slow')}
                  type="button"
                  title="Медленная скорость"
                  aria-label="Прослушать медленно"
                >🐌</button>
              </div>
            </div>
            <div className="example-kr">
              <span>{question.exampleKr}</span>
            </div>
            {/* Russian translation always visible in feedback screen */}
            <div className="example-ru example-ru-visible">{question.exampleRu}</div>
          </div>
        </div>

        {/* ── Actions row ── */}
        <div className="popup-actions">
          {onSaveForReview && (
            <button
              className={`popup-save-btn ${saved ? 'popup-save-btn-saved' : ''}`}
              onClick={() => { if (!saved) { onSaveForReview(); setSaved(true); } }}
              type="button"
              title="Добавить в работу над ошибками"
              aria-label="Повторить позже"
              disabled={saved}
            >
              {saved ? '📌 Сохранено' : '📌 Повторить позже'}
            </button>
          )}
          <button className="popup-btn" onClick={onContinue} type="button">
            Понятно →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExplanationPopup;
