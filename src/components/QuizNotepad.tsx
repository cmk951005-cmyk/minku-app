import React, { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'miku-notepad';

interface NoteEntry {
  id: string;
  korean: string;
  russian: string;
}

function loadEntries(): NoteEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [{ id: 'entry-0', korean: '', russian: '' }];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return [{ id: 'entry-0', korean: '', russian: '' }];
  } catch {
    return [{ id: 'entry-0', korean: '', russian: '' }];
  }
}

function saveEntries(entries: NoteEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {}
}

interface Props {
  onClose: () => void;
}

const QuizNotepad: React.FC<Props> = ({ onClose }) => {
  const [entries, setEntries] = useState<NoteEntry[]>(loadEntries);

  // Persist on every change
  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const updateEntry = useCallback((id: string, field: 'korean' | 'russian', value: string) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  }, []);

  const addEntry = useCallback(() => {
    const newEntry: NoteEntry = {
      id: `entry-${Date.now()}`,
      korean: '',
      russian: '',
    };
    setEntries(prev => [...prev, newEntry]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => {
      const filtered = prev.filter(e => e.id !== id);
      return filtered.length > 0 ? filtered : [{ id: `entry-${Date.now()}`, korean: '', russian: '' }];
    });
  }, []);

  const clearAll = useCallback(() => {
    const fresh: NoteEntry[] = [{ id: `entry-${Date.now()}`, korean: '', russian: '' }];
    setEntries(fresh);
  }, []);

  return (
    <div className="notepad-overlay" role="dialog" aria-modal="true" aria-label="Блокнот">
      <div className="notepad-panel">
        {/* Header */}
        <div className="notepad-header">
          <span className="notepad-title">📓 Блокнот</span>
          <div className="notepad-header-btns">
            <button
              className="notepad-clear-btn"
              onClick={clearAll}
              type="button"
              title="Очистить всё"
              aria-label="Очистить все записи"
            >🗑️</button>
            <button
              className="notepad-close-btn"
              onClick={onClose}
              type="button"
              aria-label="Закрыть блокнот"
            >✕</button>
          </div>
        </div>

        {/* Column labels */}
        <div className="notepad-col-labels">
          <span className="notepad-col-label">한국어</span>
          <span className="notepad-col-sep" />
          <span className="notepad-col-label">Русский</span>
          <span className="notepad-col-del-space" />
        </div>

        {/* Entries */}
        <div className="notepad-entries">
          {entries.map((entry, idx) => (
            <div key={entry.id} className="notepad-entry">
              <span className="notepad-entry-num">{idx + 1}.</span>
              <input
                className="notepad-input notepad-input-kr"
                type="text"
                value={entry.korean}
                onChange={e => updateEntry(entry.id, 'korean', e.target.value)}
                placeholder="한국어..."
                aria-label={`Корейское слово ${idx + 1}`}
                autoComplete="off"
                spellCheck={false}
              />
              <span className="notepad-entry-sep">—</span>
              <input
                className="notepad-input notepad-input-ru"
                type="text"
                value={entry.russian}
                onChange={e => updateEntry(entry.id, 'russian', e.target.value)}
                placeholder="перевод..."
                aria-label={`Перевод ${idx + 1}`}
                autoComplete="off"
              />
              <button
                className="notepad-del-btn"
                onClick={() => removeEntry(entry.id)}
                type="button"
                aria-label={`Удалить запись ${idx + 1}`}
                title="Удалить"
              >✕</button>
            </div>
          ))}
        </div>

        {/* Add button */}
        <button
          className="notepad-add-btn"
          onClick={addEntry}
          type="button"
          aria-label="Добавить запись"
        >+ Добавить</button>
      </div>
    </div>
  );
};

export default QuizNotepad;
