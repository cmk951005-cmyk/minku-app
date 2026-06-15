import { GrammarCategory, MistakeEntry, SavedWord, UserStats } from '../types';

const PROGRESS_KEY = 'miku-completed-categories';
const MISTAKES_KEY = 'miku-mistakes';
const SAVED_WORDS_KEY = 'miku-saved-words';
const STATS_KEY = 'miku-user-stats';

// ── Completed categories ──────────────────────────────────────────
export function loadCompletedCategories(): GrammarCategory[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GrammarCategory[];
  } catch { return []; }
}

export function saveCompletedCategories(cats: GrammarCategory[]) {
  try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(cats)); } catch {}
}

export function clearProgress() {
  try { localStorage.removeItem(PROGRESS_KEY); } catch {}
}

// ── Mistake review (P1-4) ─────────────────────────────────────────
export function loadMistakes(): MistakeEntry[] {
  try {
    const raw = localStorage.getItem(MISTAKES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as MistakeEntry[];
  } catch { return []; }
}

export function saveMistake(entry: MistakeEntry) {
  try {
    const existing = loadMistakes();
    const filtered = existing.filter(e => e.question.id !== entry.question.id);
    const updated = [entry, ...filtered].slice(0, 100);
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(updated));
  } catch {}
}

export function removeMistake(questionId: string) {
  try {
    const existing = loadMistakes();
    const updated = existing.filter(e => e.question.id !== questionId);
    localStorage.setItem(MISTAKES_KEY, JSON.stringify(updated));
  } catch {}
}

export function clearMistakes() {
  try { localStorage.removeItem(MISTAKES_KEY); } catch {}
}

// ── Saved vocabulary words (P1-7) ─────────────────────────────────
export function loadSavedWords(): SavedWord[] {
  try {
    const raw = localStorage.getItem(SAVED_WORDS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedWord[];
  } catch { return []; }
}

export function saveWord(wordId: string) {
  try {
    const existing = loadSavedWords();
    if (existing.some(w => w.wordId === wordId)) return;
    const updated = [{ wordId, savedAt: Date.now(), known: false }, ...existing];
    localStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(updated));
  } catch {}
}

export function markWordKnown(wordId: string, known: boolean) {
  try {
    const existing = loadSavedWords();
    const updated = existing.map(w => w.wordId === wordId ? { ...w, known } : w);
    localStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(updated));
  } catch {}
}

export function removeWord(wordId: string) {
  try {
    const existing = loadSavedWords();
    const updated = existing.filter(w => w.wordId !== wordId);
    localStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(updated));
  } catch {}
}

// ── User stats / gamification (P2) ────────────────────────────────
const DEFAULT_STATS: UserStats = {
  totalCorrect: 0,
  totalAnswered: 0,
  streak: 0,
  lastStudyDate: '',
  hintsUsed: 0,
  sessionsCompleted: 0,
};

export function loadStats(): UserStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch { return { ...DEFAULT_STATS }; }
}

export function saveStats(stats: UserStats) {
  try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch {}
}

export function updateStreak(): UserStats {
  const stats = loadStats();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (stats.lastStudyDate === today) return stats;
  stats.streak = stats.lastStudyDate === yesterday ? (stats.streak || 0) + 1 : 1;
  stats.lastStudyDate = today;
  saveStats(stats);
  return stats;
}
