// SpeakingSection.tsx — Говорение 카테고리 메인 컴포넌트
// HeyKorea UX 참고, 기존 grammar/vocabulary 시스템과 완전히 독립

import React, { useState, useEffect, useRef } from 'react';
import { UserLevel } from '../types';
import { getSpeakingQuestions, SpeakingQuestion, PictureChoice } from '../data/speakingData';

// ────────────────────────────────────────────────────────────────
// 유틸
// ────────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function speakKo(text: string, rate: number) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = rate;
  window.speechSynthesis.speak(u);
}

// ────────────────────────────────────────────────────────────────
// TTS 버튼 쌍
// ────────────────────────────────────────────────────────────────
const TtsButtons: React.FC<{ text: string }> = ({ text }) => {
  const [activeRate, setActiveRate] = useState<number | null>(null);

  const handleSpeak = (rate: number) => {
    if (activeRate === rate) {
      window.speechSynthesis.cancel();
      setActiveRate(null);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = rate;
    u.onend = () => setActiveRate(null);
    u.onerror = () => setActiveRate(null);
    window.speechSynthesis.speak(u);
    setActiveRate(rate);
  };

  // 텍스트 변경 시 상태 초기화
  useEffect(() => { setActiveRate(null); }, [text]);

  return (
    <div className="sp-tts-row">
      <button
        className={`sp-tts-btn${activeRate === 1.0 ? ' sp-tts-btn-active' : ''}`}
        onClick={() => handleSpeak(1.0)}
        type="button"
        aria-label="Прослушать"
        title="Прослушать (1x)"
      >🔊</button>
      <button
        className={`sp-tts-btn sp-tts-btn-slow${activeRate === 0.6 ? ' sp-tts-btn-active' : ''}`}
        onClick={() => handleSpeak(0.6)}
        type="button"
        aria-label="Прослушать медленно"
        title="Медленно (0.6x)"
      >🐢</button>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 피드백 패널 (하단 슬라이드업)
// ────────────────────────────────────────────────────────────────
type AnswerResult = 'correct' | 'incorrect';

const FeedbackPanel: React.FC<{
  result: AnswerResult;
  correctChoice?: { korean: string; romanization?: string; emoji?: string };
  correctWord?: string;
  onContinue: () => void;
}> = ({ result, correctChoice, correctWord, onContinue }) => {
  const isCorrect = result === 'correct';
  return (
    <div className={`sp-feedback-panel ${isCorrect ? 'sp-feedback-panel-correct' : 'sp-feedback-panel-wrong'}`}>
      <div className="sp-feedback-row">
        <div className="sp-feedback-left">
          <span className="sp-feedback-icon">{isCorrect ? '✓' : '✗'}</span>
          <div className="sp-feedback-text">
            {isCorrect ? (
              <span className="sp-feedback-msg-correct">잘했어요! Правильно!</span>
            ) : (
              <>
                <span className="sp-feedback-label">Правильный ответ:</span>
                <span className="sp-feedback-answer">
                  {correctChoice
                    ? `${correctChoice.emoji ?? ''} ${correctChoice.korean} ${correctChoice.romanization ? `(${correctChoice.romanization})` : ''}`
                    : correctWord ?? ''}
                </span>
              </>
            )}
          </div>
        </div>
        <button
          className="sp-continue-btn"
          onClick={onContinue}
          type="button"
        >
          Продолжить
        </button>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 유형 1: Listening + Picture Choice
// ────────────────────────────────────────────────────────────────
const ListeningPictureQuestion: React.FC<{
  question: SpeakingQuestion;
  onContinue: (correct: boolean) => void;
}> = ({ question, onContinue }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [choices, setChoices] = useState<PictureChoice[]>([]);
  const autoPlayed = useRef(false);

  useEffect(() => {
    setSelectedId(null);
    setResult(null);
    setChoices(question.choices ? shuffle(question.choices) : []);
    autoPlayed.current = false;
  }, [question.id]);

  // 자동 재생
  useEffect(() => {
    if (!autoPlayed.current && question.audioText) {
      autoPlayed.current = true;
      const timer = setTimeout(() => speakKo(question.audioText!, 1.0), 500);
      return () => clearTimeout(timer);
    }
  }, [question.id, question.audioText]);

  const handleSelect = (choice: PictureChoice) => {
    if (result) return;
    setSelectedId(choice.id);
    setResult(choice.id === question.correctChoiceId ? 'correct' : 'incorrect');
  };

  const correctChoice = question.choices?.find(c => c.id === question.correctChoiceId);

  const cardClass = (choice: PictureChoice) => {
    if (!result) return `sp-picture-card${selectedId === choice.id ? ' sp-card-pending' : ''}`;
    if (choice.id === question.correctChoiceId) return 'sp-picture-card sp-card-correct';
    if (choice.id === selectedId) return 'sp-picture-card sp-card-wrong';
    return 'sp-picture-card sp-card-dimmed';
  };

  return (
    <div className="sp-question-wrap">
      <p className="sp-instruction">{question.instructionRu}</p>
      <TtsButtons text={question.audioText ?? ''} />
      <div className="sp-picture-grid">
        {choices.map(c => (
          <button
            key={c.id}
            className={cardClass(c)}
            onClick={() => handleSelect(c)}
            disabled={!!result}
            type="button"
          >
            <span className="sp-card-emoji">{c.emoji}</span>
            <span className="sp-card-kr">{c.korean}</span>
            <span className="sp-card-roman">{c.romanization}</span>
          </button>
        ))}
      </div>
      {result && (
        <FeedbackPanel
          result={result}
          correctChoice={result === 'incorrect' ? correctChoice : undefined}
          onContinue={() => onContinue(result === 'correct')}
        />
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 유형 2: Russian Meaning → Picture Choice
// ────────────────────────────────────────────────────────────────
const MeaningPictureQuestion: React.FC<{
  question: SpeakingQuestion;
  onContinue: (correct: boolean) => void;
}> = ({ question, onContinue }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [choices, setChoices] = useState<PictureChoice[]>([]);

  useEffect(() => {
    setSelectedId(null);
    setResult(null);
    setChoices(question.choices ? shuffle(question.choices) : []);
  }, [question.id]);

  const handleSelect = (choice: PictureChoice) => {
    if (result) return;
    setSelectedId(choice.id);
    const isCorrect = choice.id === question.correctChoiceId;
    setResult(isCorrect ? 'correct' : 'incorrect');
    // 정답 선택 시 발음 자동 재생
    if (isCorrect && question.audioText) {
      setTimeout(() => speakKo(question.audioText!, 1.0), 200);
    }
  };

  const correctChoice = question.choices?.find(c => c.id === question.correctChoiceId);

  const cardClass = (choice: PictureChoice) => {
    if (!result) return `sp-picture-card${selectedId === choice.id ? ' sp-card-pending' : ''}`;
    if (choice.id === question.correctChoiceId) return 'sp-picture-card sp-card-correct';
    if (choice.id === selectedId) return 'sp-picture-card sp-card-wrong';
    return 'sp-picture-card sp-card-dimmed';
  };

  return (
    <div className="sp-question-wrap">
      <p className="sp-instruction">{question.instructionRu}</p>
      <div className="sp-meaning-box">
        <span className="sp-meaning-text">{question.meaningRu}</span>
      </div>
      {question.audioText && <TtsButtons text={question.audioText} />}
      <div className="sp-picture-grid">
        {choices.map(c => (
          <button
            key={c.id}
            className={cardClass(c)}
            onClick={() => handleSelect(c)}
            disabled={!!result}
            type="button"
          >
            <span className="sp-card-emoji">{c.emoji}</span>
            <span className="sp-card-kr">{c.korean}</span>
            <span className="sp-card-roman">{c.romanization}</span>
          </button>
        ))}
      </div>
      {result && (
        <FeedbackPanel
          result={result}
          correctChoice={result === 'incorrect' ? correctChoice : undefined}
          onContinue={() => onContinue(result === 'correct')}
        />
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 유형 3: Complete the Sentence
// ────────────────────────────────────────────────────────────────
const CompleteSentenceQuestion: React.FC<{
  question: SpeakingQuestion;
  onContinue: (correct: boolean) => void;
}> = ({ question, onContinue }) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    setSelectedWord(null);
    setResult(null);
    setWords(question.wordChoices ? shuffle(question.wordChoices) : []);
  }, [question.id]);

  const handleSelect = (word: string) => {
    if (result) return;
    setSelectedWord(word);
    setResult(word === question.correctWord ? 'correct' : 'incorrect');
  };

  // 빈칸에 선택된 단어 채우기
  const displaySentence = selectedWord
    ? (question.sentenceKr ?? '').replace('___', selectedWord)
    : question.sentenceKr ?? '';

  const wordClass = (word: string) => {
    if (!result) return `sp-word-card${selectedWord === word ? ' sp-card-pending' : ''}`;
    if (word === question.correctWord) return 'sp-word-card sp-card-correct';
    if (word === selectedWord) return 'sp-word-card sp-card-wrong';
    return 'sp-word-card';
  };

  return (
    <div className="sp-question-wrap">
      <p className="sp-instruction">{question.instructionRu}</p>

      <div className="sp-sentence-box">
        <div className="sp-sentence-kr">{displaySentence}</div>
        {question.sentenceRu && (
          <div className="sp-sentence-ru">{question.sentenceRu}</div>
        )}
      </div>

      {question.audioText && <TtsButtons text={question.audioText} />}

      <div className="sp-sentence-divider" />

      <div className="sp-word-choices">
        {words.map((word, i) => (
          <button
            key={`${word}-${i}`}
            className={wordClass(word)}
            onClick={() => handleSelect(word)}
            disabled={!!result}
            type="button"
          >
            {word}
          </button>
        ))}
      </div>

      {result && (
        <FeedbackPanel
          result={result}
          correctWord={result === 'incorrect' ? question.correctWord : undefined}
          onContinue={() => onContinue(result === 'correct')}
        />
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 레벨 선택 화면
// ────────────────────────────────────────────────────────────────
const SpeakingLevelSelect: React.FC<{
  currentLevel: UserLevel;
  onSelectLevel: (level: UserLevel) => void;
  onBack: () => void;
}> = ({ currentLevel, onSelectLevel, onBack }) => {
  const levels: { level: UserLevel; ru: string; topics: string }[] = [
    { level: 1, ru: 'Приветствия и страны', topics: '인사 · 국가명 · 기본 표현' },
    { level: 2, ru: 'Знакомство и семья', topics: '자기소개 · 직업 · 가족' },
    { level: 3, ru: 'Повседневная жизнь', topics: '음식 · 취미 · 시간 표현' },
    { level: 4, ru: 'Путешествия и покупки', topics: '여행 · 쇼핑 · 교통' },
    { level: 5, ru: 'Разговорные фразы', topics: '복합 문장 · 실제 회화' },
  ];

  return (
    <div className="sp-level-screen">
      <div className="cat-top-bar">
        <button className="back-btn" onClick={onBack} type="button" aria-label="Назад">⬅</button>
        <span className="cat-top-title">Говорение</span>
        <div style={{ width: 36 }} />
      </div>

      <div className="sp-level-header">
        <div className="sp-big-emoji">🗣️</div>
        <h2 className="sp-level-title">Говорение · 말하기</h2>
        <p className="sp-level-sub">Выберите уровень</p>
      </div>

      <div className="sp-level-list">
        {levels.map(({ level, ru, topics }) => (
          <button
            key={level}
            className={`sp-level-row${level === currentLevel ? ' sp-level-row-current' : ''}`}
            onClick={() => onSelectLevel(level)}
            type="button"
          >
            <div className="sp-level-badge">Lv.{level}</div>
            <div className="sp-level-info">
              <div className="sp-level-name-ru">{ru}</div>
              <div className="sp-level-topics">{topics}</div>
            </div>
            <div className="sp-level-qcount">{getSpeakingQuestions(level as 1 | 2 | 3 | 4 | 5).length}문제</div>
          </button>
        ))}
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 퀴즈 진행 화면
// ────────────────────────────────────────────────────────────────
const SpeakingQuiz: React.FC<{
  level: UserLevel;
  onBack: () => void;
  onComplete: (correct: number, total: number) => void;
}> = ({ level, onBack, onComplete }) => {
  const questions = getSpeakingQuestions(level as 1 | 2 | 3 | 4 | 5);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);

  const handleContinue = (wasCorrect: boolean) => {
    const newCorrect = correct + (wasCorrect ? 1 : 0);
    const next = index + 1;
    if (next >= questions.length) {
      window.speechSynthesis.cancel();
      onComplete(newCorrect, questions.length);
    } else {
      setCorrect(newCorrect);
      setIndex(next);
    }
  };

  const q = questions[index];
  if (!q) return null;

  const pct = Math.round((index / questions.length) * 100);

  return (
    <div className="sp-quiz-shell">
      <header className="sp-quiz-header">
        <div className="sp-quiz-header-row">
          <button className="back-btn" onClick={() => { window.speechSynthesis.cancel(); onBack(); }} type="button" aria-label="Назад">⬅</button>
          <span className="sp-quiz-label">Говорение · Lv.{level}</span>
          <span className="sp-quiz-counter">{index + 1} / {questions.length}</span>
        </div>
        <div className="quiz-progress-bar" style={{ marginTop: 8 }}>
          <div className="quiz-progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </header>

      <main className="sp-quiz-main">
        {q.type === 'listening_picture' && (
          <ListeningPictureQuestion key={q.id} question={q} onContinue={handleContinue} />
        )}
        {q.type === 'meaning_picture' && (
          <MeaningPictureQuestion key={q.id} question={q} onContinue={handleContinue} />
        )}
        {q.type === 'complete_sentence' && (
          <CompleteSentenceQuestion key={q.id} question={q} onContinue={handleContinue} />
        )}
      </main>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 결과 화면
// ────────────────────────────────────────────────────────────────
const SpeakingResult: React.FC<{
  level: UserLevel;
  correct: number;
  total: number;
  onRetry: () => void;
  onBack: () => void;
}> = ({ level, correct, total, onRetry, onBack }) => {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const emoji = pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📖';
  const msg = pct >= 80
    ? '잘했어요! Отличный результат!'
    : pct >= 50
    ? 'Хорошо! Продолжайте практиковаться!'
    : 'Не сдавайтесь! 화이팅! Попробуйте ещё раз.';

  return (
    <div className="sp-result-screen">
      <div className="sp-result-emoji">{emoji}</div>
      <h2 className="sp-result-title">Level {level} 완료!</h2>
      <p className="sp-result-score">{correct} / {total}</p>
      <div className="sp-result-pct-bar">
        <div className="sp-result-pct-fill" style={{ width: `${pct}%` }} />
      </div>
      <p className="sp-result-pct-text">{pct}%</p>
      <p className="sp-result-msg">{msg}</p>
      <div className="sp-result-btns">
        <button className="sp-btn sp-btn-primary" onClick={onRetry} type="button">🔄 다시 풀기</button>
        <button className="sp-btn sp-btn-secondary" onClick={onBack} type="button">← 레벨 선택</button>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 메인 SpeakingSection 컴포넌트
// ────────────────────────────────────────────────────────────────
interface SpeakingSectionProps {
  userLevel: UserLevel;
  onBack: () => void;
}

type SpView = 'levels' | 'quiz' | 'result';

const SpeakingSection: React.FC<SpeakingSectionProps> = ({ userLevel, onBack }) => {
  const [view, setView] = useState<SpView>('levels');
  const [activeLevel, setActiveLevel] = useState<UserLevel>(userLevel);
  const [resultData, setResultData] = useState<{ correct: number; total: number } | null>(null);

  const goQuiz = (level: UserLevel) => {
    setActiveLevel(level);
    setResultData(null);
    setView('quiz');
  };

  const goResult = (correct: number, total: number) => {
    setResultData({ correct, total });
    setView('result');
  };

  const goLevels = () => {
    window.speechSynthesis.cancel();
    setResultData(null);
    setView('levels');
  };

  return (
    <div className="speaking-wrapper">
      {view === 'levels' && (
        <SpeakingLevelSelect
          currentLevel={userLevel}
          onSelectLevel={goQuiz}
          onBack={onBack}
        />
      )}
      {view === 'quiz' && (
        <SpeakingQuiz
          level={activeLevel}
          onBack={goLevels}
          onComplete={goResult}
        />
      )}
      {view === 'result' && resultData && (
        <SpeakingResult
          level={activeLevel}
          correct={resultData.correct}
          total={resultData.total}
          onRetry={() => goQuiz(activeLevel)}
          onBack={goLevels}
        />
      )}
    </div>
  );
};

export default SpeakingSection;
