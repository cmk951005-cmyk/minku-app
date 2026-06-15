import React, { useState, useCallback, useEffect } from 'react';
import {
  AppStage, UserLevel, GrammarCategory, Question, UserAnswer, FeedbackState, MistakeEntry,
} from './types';
import { CATEGORIES, getMainQuestions, getRemedialQuestions, categoryMeta } from './data/questions';
import { TtsProvider } from './contexts/TtsContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { playCorrectSound, playWrongSound } from './utils/sounds';
import {
  loadCompletedCategories, saveCompletedCategories, clearProgress,
  saveMistake, loadMistakes, updateStreak, loadStats, saveStats,
} from './utils/storage';
import SplashScreen from './components/SplashScreen';
import MikuIntro from './components/MikuIntro';
import LevelSelect from './components/LevelSelect';
import CategorySelect from './components/CategorySelect';
import QuestionCard from './components/QuestionCard';
import ExplanationPopup from './components/ExplanationPopup';
import RoundComplete from './components/RoundComplete';
import ResultScreen from './components/ResultScreen';
import LevelDownPrompt from './components/LevelDownPrompt';
import MistakeReview from './components/MistakeReview';
import VocabSection from './components/VocabSection';
import SpeakingSection from './components/SpeakingSection';
import QuizNotepad from './components/QuizNotepad';
import './styles.css';
import { updateTagWeight, THETA } from './utils/tagWeights';
import { tagOntology } from './utils/tagOntology';
import { TagID } from './types';

function App() {
  const [appStage, setAppStage] = useState<AppStage>('splash');
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [currentCategory, setCurrentCategory] = useState<GrammarCategory | null>(null);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<UserAnswer[]>([]);
  const [wrongIds, setWrongIds] = useState(new Set<string>());
  const [retryQueue, setRetryQueue] = useState<Question[]>([]);
  const [retryIdx, setRetryIdx] = useState(0);
  const [retryWrongIds, setRetryWrongIds] = useState(new Set<string>());
  const [remedialQuestions, setRemedialQuestions] = useState<Question[]>([]);
  const [remedialIdx, setRemedialIdx] = useState(0);
  const [completedCategories, setCompletedCategories] = useState<GrammarCategory[]>(loadCompletedCategories);
  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle');
  const [showExplanation, setShowExplanation] = useState(false);
  const [lastWrongQuestion, setLastWrongQuestion] = useState<Question | null>(null);
  const [lastWrongInput, setLastWrongInput] = useState('');
  const [categoryWrongCount, setCategoryWrongCount] = useState(0);
  const [levelDownAsked, setLevelDownAsked] = useState(false);
  const [pendingLevelDownOffer, setPendingLevelDownOffer] = useState(false);
  const [showLevelDownPrompt, setShowLevelDownPrompt] = useState(false);
  // Notepad
  const [showNotepad, setShowNotepad] = useState(false);
  // GAP barrier detection
  const [detectedBarrierTag, setDetectedBarrierTag] = useState<TagID | null>(null);
  const [showBarrierPopup, setShowBarrierPopup] = useState(false);
  // Streak / stats (P2)
  const [streak, setStreak] = useState(() => loadStats().streak);

  // Save progress whenever completedCategories changes
  useEffect(() => { saveCompletedCategories(completedCategories); }, [completedCategories]);

  // Update streak on app open
  useEffect(() => {
    const updated = updateStreak();
    setStreak(updated.streak);
  }, []);

  // Splash auto-advance
  useEffect(() => {
    if (appStage === 'splash') {
      const t = setTimeout(() => setAppStage('miku-intro'), 1500);
      return () => clearTimeout(t);
    }
  }, [appStage]);

  useEffect(() => {
    if (appStage === 'miku-intro') {
      const t = setTimeout(() => setAppStage('level-select'), 5000);
      return () => clearTimeout(t);
    }
  }, [appStage]);

  const handleLevelSelect = useCallback((level: UserLevel) => {
    setUserLevel(level);
    setAppStage('category-select');
  }, []);

  const handleCategorySelect = useCallback((category: GrammarCategory) => {
    setCurrentCategory(category);
    const mainQs = getMainQuestions(category, userLevel!);
    setCurrentQuestions(mainQs);
    setQIndex(0);
    setAllAnswers([]);
    setWrongIds(new Set());
    setRetryQueue([]);
    setRetryIdx(0);
    setRetryWrongIds(new Set());
    setRemedialQuestions([]);
    setRemedialIdx(0);
    setFeedbackState('idle');
    setShowExplanation(false);
    setCategoryWrongCount(0);
    setLevelDownAsked(false);
    setPendingLevelDownOffer(false);
    setShowLevelDownPrompt(false);
    setAppStage('quiz');
  }, [userLevel]);

  const markComplete = useCallback((cat: GrammarCategory) => {
    setCompletedCategories(prev => {
      if (prev.includes(cat)) return prev;
      return [...prev, cat];
    });
    // Update stats
    const stats = loadStats();
    stats.sessionsCompleted = (stats.sessionsCompleted || 0) + 1;
    saveStats(stats);
  }, []);

  const proceedToNextQuestion = useCallback(() => {
    if (appStage === 'quiz') {
      const next = qIndex + 1;
      if (next < currentQuestions.length) {
        setQIndex(next); setFeedbackState('idle');
      } else if (wrongIds.size > 0) {
        setRetryQueue(currentQuestions.filter(q => wrongIds.has(q.id)));
        setRetryIdx(0); setAppStage('retry'); setFeedbackState('idle');
      } else {
        markComplete(currentCategory!); setAppStage('round-complete');
      }
    } else if (appStage === 'retry') {
      const next = retryIdx + 1;
      if (next < retryQueue.length) {
        setRetryIdx(next); setFeedbackState('idle');
      } else if (retryWrongIds.size > 0) {
        setRemedialQuestions(getRemedialQuestions(currentCategory!, userLevel!));
        setRemedialIdx(0); setAppStage('remedial'); setFeedbackState('idle');
      } else {
        markComplete(currentCategory!); setAppStage('round-complete');
      }
    } else if (appStage === 'remedial') {
      const next = remedialIdx + 1;
      if (next < remedialQuestions.length) {
        setRemedialIdx(next); setFeedbackState('idle');
      } else {
        markComplete(currentCategory!); setAppStage('round-complete');
      }
    }
  }, [appStage, qIndex, currentQuestions, wrongIds, retryIdx, retryQueue,
      remedialIdx, remedialQuestions, retryWrongIds, currentCategory, userLevel, markComplete]);

  const handleAnswer = useCallback((question: Question, userInput: string, isCorrect: boolean) => {
    const answer: UserAnswer = {
      questionId: question.id, category: question.category, stage: question.stage,
      isCorrect, userInput, timestamp: Date.now(),
    };
    setAllAnswers(prev => [...prev, answer]);
    setFeedbackState(isCorrect ? 'correct' : 'incorrect');

    // Update global stats
    const stats = loadStats();
    stats.totalAnswered = (stats.totalAnswered || 0) + 1;
    if (isCorrect) stats.totalCorrect = (stats.totalCorrect || 0) + 1;
    saveStats(stats);

    if (isCorrect) {
      playCorrectSound();
      setTimeout(proceedToNextQuestion, 700);
    } else {
      playWrongSound();
      setLastWrongQuestion(question);
      setLastWrongInput(userInput);
      if (appStage === 'quiz') setWrongIds(prev => new Set([...prev, question.id]));
      else if (appStage === 'retry') setRetryWrongIds(prev => new Set([...prev, question.id]));

      // Auto-save mistake for review (P1-4)
      const mistakeEntry: MistakeEntry = { question, userInput, timestamp: Date.now() };
      saveMistake(mistakeEntry);

      setCategoryWrongCount(prev => {
        const next = prev + 1;
        if (userLevel && userLevel > 1 && next >= 3 && !levelDownAsked) {
          setPendingLevelDownOffer(true);
        }
        return next;
      });

      setTimeout(() => setShowExplanation(true), 300);
    }

    // === TAG WEIGHT UPDATE (GAP fix) ===
    let detectedTag: TagID | undefined;
    if (!isCorrect) {
      if (question.type === 'multiple') {
        const selected = question.choices?.find(
          c => c.text === userInput || c.text === userInput.trim()
        );
        detectedTag = selected?.tagId;
      } else if (question.type === 'wordArrange') {
        detectedTag = question.primaryTagId;
      }
      // question.type === 'short': detectedTag stays undefined → no weight update
      if (detectedTag && detectedTag !== 'TAG_TYPO') {
        const newWeight = updateTagWeight(detectedTag, 'error');
        if (newWeight >= THETA) {
          setDetectedBarrierTag(detectedTag);
          setShowBarrierPopup(true);
        }
      }
    }
    if (isCorrect && question.primaryTagId) {
      updateTagWeight(question.primaryTagId, 'correct');
    }
  }, [appStage, proceedToNextQuestion, userLevel, levelDownAsked]);

  const handleExplanationContinue = useCallback(() => {
    setShowExplanation(false);
    if (pendingLevelDownOffer && userLevel && userLevel > 1) {
      setPendingLevelDownOffer(false);
      setShowLevelDownPrompt(true);
      return;
    }
    proceedToNextQuestion();
  }, [pendingLevelDownOffer, proceedToNextQuestion, userLevel]);

  // Save current wrong question to mistake review (called from ExplanationPopup)
  const handleSaveForReview = useCallback(() => {
    if (lastWrongQuestion) {
      const entry: MistakeEntry = {
        question: lastWrongQuestion,
        userInput: lastWrongInput,
        timestamp: Date.now(),
      };
      saveMistake(entry);
    }
  }, [lastWrongQuestion, lastWrongInput]);

  const resetQuestionFlow = useCallback((level: UserLevel, category: GrammarCategory) => {
    setCurrentQuestions(getMainQuestions(category, level));
    setQIndex(0);
    setAllAnswers([]);
    setWrongIds(new Set());
    setRetryQueue([]);
    setRetryIdx(0);
    setRetryWrongIds(new Set());
    setRemedialQuestions([]);
    setRemedialIdx(0);
    setFeedbackState('idle');
    setShowExplanation(false);
    setLastWrongQuestion(null);
    setLastWrongInput('');
    setCategoryWrongCount(0);
    setPendingLevelDownOffer(false);
    setShowLevelDownPrompt(false);
    setAppStage('quiz');
  }, []);

  const handleLevelDownYes = useCallback(() => {
    if (!userLevel || userLevel <= 1 || !currentCategory) {
      setShowLevelDownPrompt(false);
      proceedToNextQuestion();
      return;
    }
    const nextLevel = (userLevel - 1) as UserLevel;
    setUserLevel(nextLevel);
    setLevelDownAsked(false);
    resetQuestionFlow(nextLevel, currentCategory);
  }, [currentCategory, proceedToNextQuestion, resetQuestionFlow, userLevel]);

  const handleLevelDownNo = useCallback(() => {
    setShowLevelDownPrompt(false);
    setLevelDownAsked(true);
    proceedToNextQuestion();
  }, [proceedToNextQuestion]);

  const handleRoundContinue = useCallback(() => {
    const remaining = CATEGORIES.filter(c => !completedCategories.includes(c));
    setAppStage(remaining.length === 0 ? 'result' : 'category-select');
  }, [completedCategories]);

  const handleRestart = useCallback(() => {
    setAppStage('level-select'); setUserLevel(null); setCurrentCategory(null);
    setCurrentQuestions([]); setQIndex(0); setAllAnswers([]);
    setWrongIds(new Set()); setRetryQueue([]); setRetryIdx(0);
    setRetryWrongIds(new Set()); setRemedialQuestions([]); setRemedialIdx(0);
    setCompletedCategories([]); setFeedbackState('idle'); setShowExplanation(false);
    setCategoryWrongCount(0); setLevelDownAsked(false);
    setPendingLevelDownOffer(false); setShowLevelDownPrompt(false);
  }, []);

  const handleGoHome = useCallback(() => {
    window.speechSynthesis.cancel();
    setCurrentCategory(null); setCurrentQuestions([]); setQIndex(0);
    setAllAnswers([]); setWrongIds(new Set()); setRetryQueue([]);
    setRetryIdx(0); setRetryWrongIds(new Set()); setRemedialQuestions([]);
    setRemedialIdx(0); setFeedbackState('idle'); setShowExplanation(false);
    setCategoryWrongCount(0); setLevelDownAsked(false);
    setPendingLevelDownOffer(false); setShowLevelDownPrompt(false);
    setAppStage('level-select');
  }, []);

  const handleGoPrev = useCallback(() => {
    if (appStage === 'quiz' && qIndex === 0) {
      window.speechSynthesis.cancel();
      setCurrentCategory(null); setCurrentQuestions([]); setQIndex(0);
      setAllAnswers([]); setWrongIds(new Set()); setFeedbackState('idle');
      setShowExplanation(false); setCategoryWrongCount(0); setLevelDownAsked(false);
      setPendingLevelDownOffer(false); setShowLevelDownPrompt(false);
      setAppStage('category-select');
    } else if (appStage === 'quiz' && qIndex > 0) {
      setQIndex(qIndex - 1); setFeedbackState('idle'); setShowExplanation(false);
    } else if (appStage === 'retry' && retryIdx > 0) {
      setRetryIdx(retryIdx - 1); setFeedbackState('idle'); setShowExplanation(false);
    } else if (appStage === 'remedial' && remedialIdx > 0) {
      setRemedialIdx(remedialIdx - 1); setFeedbackState('idle'); setShowExplanation(false);
    }
  }, [appStage, qIndex, retryIdx, remedialIdx]);

  const handleResetProgress = useCallback(() => {
    clearProgress();
    setCompletedCategories([]);
  }, []);

  // Progress info
  const getProgress = useCallback(() => {
    if (appStage === 'quiz') return { cur: qIndex + 1, total: currentQuestions.length, pct: Math.round((qIndex / currentQuestions.length) * 100) };
    if (appStage === 'retry') return { cur: retryIdx + 1, total: retryQueue.length, pct: Math.round((retryIdx / retryQueue.length) * 100) };
    if (appStage === 'remedial') return { cur: remedialIdx + 1, total: remedialQuestions.length, pct: Math.round((remedialIdx / remedialQuestions.length) * 100) };
    return { cur: 0, total: 0, pct: 0 };
  }, [appStage, qIndex, currentQuestions, retryIdx, retryQueue, remedialIdx, remedialQuestions]);

  const currentQuestion = (() => {
    if (appStage === 'quiz') return currentQuestions[qIndex] || null;
    if (appStage === 'retry') return retryQueue[retryIdx] || null;
    if (appStage === 'remedial') return remedialQuestions[remedialIdx] || null;
    return null;
  })();

  const stageLabel = (() => {
    if (appStage === 'quiz') return 'Основные вопросы';
    if (appStage === 'retry') return '🔁 Повторная попытка';
    if (appStage === 'remedial') return '📖 Дополнительная практика';
    return '';
  })();

  const progress = getProgress();
  const mistakeCount = loadMistakes().length;

  return (
    <ThemeProvider>
      <TtsProvider>
        <div className="app">
          {appStage === 'splash' && <SplashScreen />}
          {appStage === 'miku-intro' && <MikuIntro onSkip={() => setAppStage('level-select')} />}
          {appStage === 'level-select' && (
            <LevelSelect
              onSelect={handleLevelSelect}
              streak={streak}
              mistakeCount={mistakeCount}
              onGoMistakes={() => setAppStage('mistake-review')}
            />
          )}
          {appStage === 'category-select' && (
            <CategorySelect
              userLevel={userLevel!}
              completedCategories={completedCategories}
              onSelect={handleCategorySelect}
              onReset={handleResetProgress}
              onBack={() => setAppStage('level-select')}
              onGoMistakes={() => setAppStage('mistake-review')}
              onGoVocab={() => setAppStage('vocabulary')}
              onGoSpeaking={() => setAppStage('speaking')}
              mistakeCount={mistakeCount}
            />
          )}

          {/* Mistake Review (P1-4) */}
          {appStage === 'mistake-review' && (
            <MistakeReview onBack={() => setAppStage(userLevel ? 'category-select' : 'level-select')} />
          )}

          {/* Vocabulary Section (P1-7) */}
          {appStage === 'vocabulary' && userLevel && (
            <VocabSection userLevel={userLevel} onBack={() => setAppStage('category-select')} />
          )}

          {/* Speaking Section */}
          {appStage === 'speaking' && userLevel && (
            <SpeakingSection userLevel={userLevel} onBack={() => setAppStage('category-select')} />
          )}

          {(appStage === 'quiz' || appStage === 'retry' || appStage === 'remedial') && (
            <div className="quiz-shell">
              <header className="quiz-header">
                <div className="quiz-header-info">
                  <div className="quiz-stage-label">{stageLabel}</div>
                  {currentCategory && (
                    <div className="quiz-category-badge">
                      {categoryMeta[currentCategory].emoji} {categoryMeta[currentCategory].nameKr}
                    </div>
                  )}
                  <div className="quiz-header-nav">
                    <button
                      className={`notepad-toggle-btn ${showNotepad ? 'notepad-toggle-btn-active' : ''}`}
                      onClick={() => setShowNotepad(v => !v)}
                      type="button"
                      title="Блокнот"
                      aria-label="Открыть блокнот"
                    >📓</button>
                    <button
                      className="back-btn"
                      onClick={handleGoPrev}
                      type="button"
                      title="Предыдущий вопрос"
                      aria-label="Предыдущий вопрос"
                      disabled={
                        (appStage === 'retry' && retryIdx === 0) ||
                        (appStage === 'remedial' && remedialIdx === 0)
                      }
                    >⬅</button>
                    <button
                      className="home-btn"
                      onClick={handleGoHome}
                      type="button"
                      title="На главную"
                      aria-label="На главную"
                    >🏠</button>
                  </div>
                </div>
                <div className="quiz-counter">
                  {progress.cur} / {progress.total}
                </div>
                <div className="quiz-progress-bar">
                  <div className="quiz-progress-fill" style={{ width: `${progress.pct}%` }} />
                </div>
              </header>

              <main className="quiz-main">
                {currentQuestion && (
                  <QuestionCard
                    key={currentQuestion.id}
                    question={currentQuestion}
                    feedbackState={feedbackState}
                    onAnswer={handleAnswer}
                    userLevel={userLevel ?? 3}
                  />
                )}
              </main>

              {showExplanation && lastWrongQuestion && (
                <ExplanationPopup
                  question={lastWrongQuestion}
                  userInput={lastWrongInput}
                  onContinue={handleExplanationContinue}
                  onSaveForReview={handleSaveForReview}
                />
              )}

              {showBarrierPopup && detectedBarrierTag && (
                <div className="barrier-popup-overlay">
                  <div className="barrier-popup">
                    <p style={{ whiteSpace: 'pre-line' }}>
                      {tagOntology[detectedBarrierTag].popupExplanationRu}
                    </p>
                    <button onClick={() => setShowBarrierPopup(false)}>Понятно</button>
                  </div>
                </div>
              )}

              {showLevelDownPrompt && userLevel && userLevel > 1 && (
                <LevelDownPrompt onYes={handleLevelDownYes} onNo={handleLevelDownNo} />
              )}

              {showNotepad && (
                <QuizNotepad onClose={() => setShowNotepad(false)} />
              )}
            </div>
          )}

          {appStage === 'round-complete' && currentCategory && (
            <RoundComplete
              category={currentCategory}
              userLevel={userLevel!}
              allAnswers={allAnswers}
              onContinue={handleRoundContinue}
              onGoMistakes={() => setAppStage('mistake-review')}
            />
          )}

          {appStage === 'result' && (
            <ResultScreen
              allAnswers={allAnswers}
              userLevel={userLevel!}
              completedCategories={completedCategories}
              onRestart={handleRestart}
              streak={streak}
              onGoMistakes={() => setAppStage('mistake-review')}
            />
          )}
        </div>
      </TtsProvider>
    </ThemeProvider>
  );
}

export default App;
