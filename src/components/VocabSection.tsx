import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { UserLevel } from '../types';
import { TOPIC_META, getWordsByTopic } from '../data/vocabulary';
import { vocabularyByLevel, VocabularyCategory, VocabularyEntry } from '../data/questions';
import { loadSavedWords, saveWord, removeWord } from '../utils/storage';
import { useTheme } from '../contexts/ThemeContext';
import otterHeart from '../assets/otter-heart.png';
import mikuFlower from '../assets/miku-flower.png';

interface Props {
  userLevel: UserLevel;
  onBack: () => void;
}

type ViewMode = 'topics' | 'list' | 'flashcard' | 'saved';

interface UnifiedWord {
  id: string;
  korean: string;
  russian: string;
  romanization?: string;
  exampleKr?: string;
  exampleRu?: string;
  emoji?: string;
}

function speakWord(
  text: string,
  rate: number,
  playingRef: React.MutableRefObject<string | null>,
  id: string,
  setPlaying: (id: string | null) => void
) {
  if (playingRef.current === id) { window.speechSynthesis.cancel(); setPlaying(null); return; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR'; u.rate = rate;
  u.onend = () => setPlaying(null);
  u.onerror = () => setPlaying(null);
  window.speechSynthesis.speak(u);
  setPlaying(id);
}

const WordTTSButtons: React.FC<{ korean: string }> = ({ korean }) => {
  const [playing, setPlaying] = useState<string | null>(null);
  const playingRef = useRef<string | null>(null);
  playingRef.current = playing;
  const speak = (rate: number, btnId: string) => speakWord(korean, rate, playingRef, btnId, setPlaying);
  return (
    <div className="vwi-tts-btns">
      <button
        className={`vwi-tts-btn ${playing === 'normal' ? 'vwi-tts-btn-playing' : ''}`}
        onClick={e => { e.stopPropagation(); speak(1.0, 'normal'); }}
        type="button" title="Прослушать"
      >🔊</button>
      <button
        className={`vwi-tts-btn ${playing === 'slow' ? 'vwi-tts-btn-playing' : ''}`}
        onClick={e => { e.stopPropagation(); speak(0.6, 'slow'); }}
        type="button" title="Медленно"
      >🐌</button>
    </div>
  );
};

const ALL_VOCAB_TOPICS = Object.keys(TOPIC_META) as (keyof typeof TOPIC_META)[];

function buildLevel1Categories(): VocabularyCategory[] {
  return ALL_VOCAB_TOPICS.map(topic => {
    const meta = TOPIC_META[topic];
    const words = getWordsByTopic(topic);
    return {
      id: topic,
      level: 1 as UserLevel,
      nameKr: meta.nameKr,
      nameRu: meta.nameRu,
      emoji: meta.emoji,
      words: words.map(w => ({
        id: w.id,
        level: 1 as UserLevel,
        categoryId: topic,
        categoryKr: meta.nameKr,
        categoryRu: meta.nameRu,
        korean: w.korean,
        russian: w.russian,
        pronunciation: w.romanization || '',
        partOfSpeech: '명사' as VocabularyEntry['partOfSpeech'],
        emoji: w.emoji || meta.emoji,
        exampleKr: w.exampleKr || '',
        exampleRu: w.exampleRu || '',
      })),
    };
  });
}

function entryToWord(entry: VocabularyEntry): UnifiedWord {
  return {
    id: entry.id,
    korean: entry.korean,
    russian: entry.russian,
    romanization: entry.pronunciation || undefined,
    exampleKr: entry.exampleKr || undefined,
    exampleRu: entry.exampleRu || undefined,
    emoji: entry.emoji || undefined,
  };
}

const VocabSection: React.FC<Props> = ({ userLevel, onBack }) => {
  const { theme } = useTheme();
  const img = theme === 'blue' ? otterHeart : mikuFlower;
  const [view, setView] = useState<ViewMode>('topics');
  const [selectedCategory, setSelectedCategory] = useState<VocabularyCategory | null>(null);
  const [categoryWords, setCategoryWords] = useState<UnifiedWord[]>([]);
  const [flashIdx, setFlashIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [savedWords, setSavedWordsState] = useState<UnifiedWord[]>([]);
  const [flashPlaying, setFlashPlaying] = useState<string | null>(null);
  const flashPlayingRef = useRef<string | null>(null);
  flashPlayingRef.current = flashPlaying;

  const vocabCategories: VocabularyCategory[] = useMemo(() => {
    if (userLevel === 1) return buildLevel1Categories();
    const levelCats = vocabularyByLevel[userLevel];
    return (levelCats && levelCats.length > 0) ? levelCats : buildLevel1Categories();
  }, [userLevel]);

  const allWords: UnifiedWord[] = useMemo(
    () => vocabCategories.flatMap(cat => cat.words.map(entryToWord)),
    [vocabCategories]
  );

  const reloadSaved = useCallback(() => {
    const sw = loadSavedWords();
    setSavedIds(new Set(sw.map(w => w.wordId)));
    const savedVocab = sw
      .map(s => allWords.find(w => w.id === s.wordId))
      .filter((w): w is UnifiedWord => w !== undefined);
    setSavedWordsState(savedVocab);
  }, [allWords]);

  useEffect(() => { reloadSaved(); }, [reloadSaved]);

  const handleCategorySelect = (cat: VocabularyCategory) => {
    const words = cat.words.map(entryToWord);
    setSelectedCategory(cat);
    setCategoryWords(words);
    setFlashIdx(0); setFlipped(false); setView('list');
  };

  const startFlashcards = (words: UnifiedWord[]) => {
    setCategoryWords(words); setFlashIdx(0); setFlipped(false); setView('flashcard');
  };

  const toggleSave = (wordId: string) => {
    if (savedIds.has(wordId)) { removeWord(wordId); } else { saveWord(wordId); }
    reloadSaved();
  };

  const speakFlash = (rate: number, btnId: string) => {
    if (!currentFlash) return;
    speakWord(currentFlash.korean, rate, flashPlayingRef, btnId, setFlashPlaying);
  };

  const currentFlash = categoryWords[flashIdx];

  // TOPICS VIEW
  if (view === 'topics') {
    return (
      <div className="vocab-screen">
        <div className="vocab-top-bar">
          <button className="back-btn" onClick={onBack} type="button">⬅</button>
          <h2 className="vocab-title">
            📖 {userLevel === 1 ? 'Словарь' : `Словарь · Lv.${userLevel}`}
          </h2>
          <button
            className={`vocab-saved-btn ${savedWords.length > 0 ? 'vocab-saved-btn-active' : ''}`}
            onClick={() => setView('saved')} type="button"
          >⭐ {savedWords.length}</button>
        </div>
        <div className="vocab-header">
          <img src={img} alt="персонаж" className="vocab-header-img" />
          <p className="vocab-subtitle">Выбери тему для изучения слов</p>
        </div>
        {vocabCategories.length === 0 ? (
          <div className="vocab-empty-state">
            <p>Для этого уровня словарь ещё не добавлен.</p>
          </div>
        ) : (
          <div className="vocab-topic-grid">
            {vocabCategories.map(cat => (
              <button key={cat.id} className="vocab-topic-card"
                onClick={() => handleCategorySelect(cat)} type="button">
                <div className="vtc-emoji">{cat.emoji}</div>
                <div className="vtc-names">
                  <div className="vtc-ru">{cat.nameRu}</div>
                  <div className="vtc-kr">{cat.nameKr}</div>
                </div>
                <div className="vtc-count">{cat.words.length} слов</div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // WORD LIST VIEW
  if (view === 'list' && selectedCategory) {
    return (
      <div className="vocab-screen">
        <div className="vocab-top-bar">
          <button className="back-btn" onClick={() => setView('topics')} type="button">⬅</button>
          <h2 className="vocab-title">
            {selectedCategory.emoji} {selectedCategory.nameRu}
            {selectedCategory.nameKr
              ? <span className="vocab-title-kr"> / {selectedCategory.nameKr}</span>
              : null}
          </h2>
          {categoryWords.length > 0 && (
            <button className="vocab-flashcard-start-btn"
              onClick={() => startFlashcards(categoryWords)} type="button">
              🃏 Карточки
            </button>
          )}
        </div>
        <div className="vocab-word-list">
          {categoryWords.length === 0 && <p className="vocab-empty">Слов нет.</p>}
          {categoryWords.map(word => (
            <div key={word.id} className="vocab-word-item">
              <div className="vwi-left">
                {word.emoji && <span className="vwi-emoji">{word.emoji}</span>}
                <div className="vwi-text">
                  <div className="vwi-kr">{word.korean}</div>
                  {word.romanization && <div className="vwi-roman">[{word.romanization}]</div>}
                  <div className="vwi-ru">{word.russian}</div>
                  {word.exampleKr && (
                    <div className="vwi-example">
                      <span className="vwi-ex-kr">{word.exampleKr}</span>
                      {word.exampleRu && <span className="vwi-ex-ru">{word.exampleRu}</span>}
                    </div>
                  )}
                </div>
              </div>
              <div className="vwi-actions">
                <WordTTSButtons korean={word.korean} />
                <button
                  className={`vwi-save-btn ${savedIds.has(word.id) ? 'vwi-save-btn-saved' : ''}`}
                  onClick={() => toggleSave(word.id)} type="button"
                  aria-label={savedIds.has(word.id) ? 'Убрать' : 'Сохранить слово'}
                >{savedIds.has(word.id) ? '⭐' : '☆'}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FLASHCARD VIEW
  if (view === 'flashcard' && currentFlash) {
    return (
      <div className="vocab-screen">
        <div className="vocab-top-bar">
          <button className="back-btn" onClick={() => setView('list')} type="button">⬅</button>
          <div className="vocab-flash-progress">{flashIdx + 1} / {categoryWords.length}</div>
          <button
            className={`vwi-save-btn ${savedIds.has(currentFlash.id) ? 'vwi-save-btn-saved' : ''}`}
            onClick={() => toggleSave(currentFlash.id)} type="button"
          >{savedIds.has(currentFlash.id) ? '⭐' : '☆'}</button>
        </div>
        <div className="flash-progress-bar">
          <div className="flash-progress-fill" style={{ width: `${((flashIdx + 1) / categoryWords.length) * 100}%` }} />
        </div>
        <div className="flash-tts-row">
          <button
            className={`tts-btn ${flashPlaying === 'normal' ? 'tts-btn-playing' : ''}`}
            onClick={() => speakFlash(1.0, 'normal')} type="button"
          >🔊</button>
          <button
            className={`tts-btn ${flashPlaying === 'slow' ? 'tts-btn-playing' : ''}`}
            onClick={() => speakFlash(0.6, 'slow')} type="button"
          >🐌</button>
        </div>
        <div
          className={`flashcard ${flipped ? 'flashcard-flipped' : ''}`}
          onClick={() => setFlipped(f => !f)}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
        >
          <div className="flashcard-inner">
            <div className="flashcard-front">
              {currentFlash.emoji && <div className="flash-emoji">{currentFlash.emoji}</div>}
              <div className="flash-kr">{currentFlash.korean}</div>
              {currentFlash.romanization && (
                <div className="flash-roman">[{currentFlash.romanization}]</div>
              )}
              <div className="flash-tap-hint">Нажми, чтобы увидеть перевод</div>
            </div>
            <div className="flashcard-back">
              <div className="flash-ru">{currentFlash.russian}</div>
              {currentFlash.exampleKr && (
                <div className="flash-example">
                  <div className="flash-ex-kr">{currentFlash.exampleKr}</div>
                  {currentFlash.exampleRu && <div className="flash-ex-ru">{currentFlash.exampleRu}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flashcard-actions">
          <button className="flash-nav-btn"
            onClick={() => { setFlashIdx(i => Math.max(0, i - 1)); setFlipped(false); }}
            disabled={flashIdx === 0} type="button">← Назад</button>
          <button className="flash-nav-btn flash-nav-next"
            onClick={() => { setFlashIdx(i => Math.min(categoryWords.length - 1, i + 1)); setFlipped(false); }}
            disabled={flashIdx === categoryWords.length - 1} type="button">Далее →</button>
        </div>
      </div>
    );
  }

  // SAVED WORDS VIEW
  if (view === 'saved') {
    return (
      <div className="vocab-screen">
        <div className="vocab-top-bar">
          <button className="back-btn" onClick={() => setView('topics')} type="button">⬅</button>
          <h2 className="vocab-title">⭐ Сохранённые слова</h2>
          {savedWords.length > 0 && (
            <button className="vocab-flashcard-start-btn"
              onClick={() => startFlashcards(savedWords)} type="button">
              🃏 Карточки
            </button>
          )}
        </div>
        {savedWords.length === 0 ? (
          <div className="vocab-empty-state">
            <p>Сохранённых слов пока нет.</p>
            <p>Нажимай ☆ рядом со словом, чтобы сохранить.</p>
            <button className="mistake-back-btn" onClick={() => setView('topics')} type="button">← К темам</button>
          </div>
        ) : (
          <div className="vocab-word-list">
            {savedWords.map(word => (
              <div key={word.id} className="vocab-word-item">
                <div className="vwi-left">
                  {word.emoji && <span className="vwi-emoji">{word.emoji}</span>}
                  <div className="vwi-text">
                    <div className="vwi-kr">{word.korean}</div>
                    {word.romanization && <div className="vwi-roman">[{word.romanization}]</div>}
                    <div className="vwi-ru">{word.russian}</div>
                  </div>
                </div>
                <div className="vwi-actions">
                  <WordTTSButtons korean={word.korean} />
                  <button className="vwi-save-btn vwi-save-btn-saved"
                    onClick={() => toggleSave(word.id)} type="button">⭐</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default VocabSection;
