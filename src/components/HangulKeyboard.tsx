import React, { useState, useCallback } from 'react';

interface Props {
  onInput: (text: string) => void;
  currentValue: string;
  onClose: () => void;
}

// ── Hangul composition engine ──────────────────────────────────────────
// Based on Unicode Hangul composition algorithm
const INITIALS = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const VOWELS   = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const FINALS   = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const INITIAL_IDX: Record<string, number> = Object.fromEntries(INITIALS.map((c, i) => [c, i]));
const VOWEL_IDX:   Record<string, number> = Object.fromEntries(VOWELS.map((c, i) => [c, i]));
const FINAL_IDX:   Record<string, number> = Object.fromEntries(FINALS.map((c, i) => [c, i]));

function compose(ini: number, vow: number, fin: number): string {
  return String.fromCharCode(0xAC00 + ini * 21 * 28 + vow * 28 + fin);
}

function isHangulSyllable(ch: string): boolean {
  const code = ch.charCodeAt(0);
  return code >= 0xAC00 && code <= 0xD7A3;
}

function decompose(ch: string): [number, number, number] {
  const code = ch.charCodeAt(0) - 0xAC00;
  const fin = code % 28;
  const vow = Math.floor(code / 28) % 21;
  const ini = Math.floor(code / (28 * 21));
  return [ini, vow, fin];
}

// Compound finals that can be split when a vowel follows
const SPLIT_FINAL: Record<string, [string, string]> = {
  'ㄳ': ['ㄱ', 'ㅅ'], 'ㄵ': ['ㄴ', 'ㅈ'], 'ㄶ': ['ㄴ', 'ㅎ'],
  'ㄺ': ['ㄹ', 'ㄱ'], 'ㄻ': ['ㄹ', 'ㅁ'], 'ㄼ': ['ㄹ', 'ㅂ'],
  'ㄽ': ['ㄹ', 'ㅅ'], 'ㄾ': ['ㄹ', 'ㅌ'], 'ㄿ': ['ㄹ', 'ㅍ'],
  'ㅀ': ['ㄹ', 'ㅎ'], 'ㅄ': ['ㅂ', 'ㅅ'],
};

// Compound vowels
const COMPOUND_VOWEL: Record<string, Record<string, string>> = {
  'ㅗ': { 'ㅏ': 'ㅘ', 'ㅐ': 'ㅙ', 'ㅣ': 'ㅚ' },
  'ㅜ': { 'ㅓ': 'ㅝ', 'ㅔ': 'ㅞ', 'ㅣ': 'ㅟ' },
  'ㅡ': { 'ㅣ': 'ㅢ' },
};

// Compound initials
const COMPOUND_CONSONANT: Record<string, Record<string, string>> = {
  'ㄱ': { 'ㄱ': 'ㄲ' }, 'ㄷ': { 'ㄷ': 'ㄸ' }, 'ㅂ': { 'ㅂ': 'ㅃ' },
  'ㅅ': { 'ㅅ': 'ㅆ' }, 'ㅈ': { 'ㅈ': 'ㅉ' },
};

// Hangul composer state machine
interface ComposerState {
  initial: string | null;
  vowel: string | null;
  final: string | null;
  finalChar: string | null; // final as character if compound available
}

function buildSyllable(state: ComposerState): string {
  if (!state.initial) return state.vowel ?? '';
  if (!state.vowel) return state.initial;
  const ini = INITIAL_IDX[state.initial] ?? -1;
  const vow = VOWEL_IDX[state.vowel] ?? -1;
  if (ini === -1 || vow === -1) return state.initial + state.vowel;
  const fin = state.final ? (FINAL_IDX[state.final] ?? 0) : 0;
  return compose(ini, vow, fin);
}

// ── Keyboard layout ──────────────────────────────────────────────────
const KEYBOARD_ROWS: string[][] = [
  ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
  ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
  ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ'],
];
const SPECIAL_ROW = ['⌫', '스페이스', '확인'];

const HangulKeyboard: React.FC<Props> = ({ onInput, currentValue, onClose }) => {
  const [composed, setComposed] = useState(currentValue);
  const [state, setState] = useState<ComposerState>({ initial: null, vowel: null, final: null, finalChar: null });

  // Flush current syllable and return committed string
  const flush = useCallback((cur: string, st: ComposerState): [string, ComposerState] => {
    const syl = buildSyllable(st);
    return [cur + syl, { initial: null, vowel: null, final: null, finalChar: null }];
  }, []);

  const handleKey = useCallback((key: string) => {
    if (key === '⌫') {
      // Backspace: remove last composed char
      setComposed(prev => {
        if (state.final) {
          // Remove final from current syllable
          const ini = INITIAL_IDX[state.initial!] ?? 0;
          const vow = VOWEL_IDX[state.vowel!] ?? 0;
          const newStr = prev.slice(0, -1) + compose(ini, vow, 0);
          setState(s => ({ ...s, final: null, finalChar: null }));
          return newStr;
        }
        if (state.vowel && state.initial) {
          setState(s => ({ ...s, vowel: null }));
          return prev.slice(0, -1) + (state.initial ?? '');
        }
        if (state.initial) {
          setState({ initial: null, vowel: null, final: null, finalChar: null });
          return prev.slice(0, -1);
        }
        // No active state — delete last char from committed string
        if (prev.length > 0) return prev.slice(0, -1);
        return prev;
      });
      return;
    }

    if (key === '스페이스') {
      let newComposed = composed;
      let newState = state;
      if (state.initial || state.vowel) {
        const [nc, ns] = flush(composed, state);
        newComposed = nc;
        newState = ns;
      }
      newComposed += ' ';
      setComposed(newComposed);
      setState(newState);
      onInput(newComposed);
      return;
    }

    if (key === '확인') {
      let final = composed;
      if (state.initial || state.vowel) {
        const [nc] = flush(composed, state);
        final = nc;
      }
      onInput(final);
      onClose();
      return;
    }

    const isVowel = VOWEL_IDX[key] !== undefined;
    const isConsonant = !isVowel;

    setComposed(prev => {
      let cur = prev;
      let st = { ...state };

      if (isConsonant) {
        // If no state yet — start new syllable with this initial
        if (!st.initial && !st.vowel) {
          // Check compound consonant with prev char
          const lastChar = cur.slice(-1);
          if (lastChar && COMPOUND_CONSONANT[lastChar]?.[key]) {
            const compound = COMPOUND_CONSONANT[lastChar][key];
            setState({ initial: compound, vowel: null, final: null, finalChar: null });
            return cur.slice(0, -1);
          }
          setState({ initial: key, vowel: null, final: null, finalChar: null });
          return cur;
        }

        if (st.initial && !st.vowel) {
          // Consecutive consonant — flush and start new
          const syl = st.initial;
          setState({ initial: key, vowel: null, final: null, finalChar: null });
          return cur + syl;
        }

        if (st.initial && st.vowel && !st.final) {
          // Add as final
          if (FINAL_IDX[key] !== undefined) {
            const ini = INITIAL_IDX[st.initial] ?? 0;
            const vow = VOWEL_IDX[st.vowel] ?? 0;
            const fin = FINAL_IDX[key] ?? 0;
            const newChar = compose(ini, vow, fin);
            setState({ ...st, final: key, finalChar: null });
            return cur.slice(0, -1) + newChar;
          }
          // Not a valid final — flush and start new
          const [nc, ns] = flush(cur.slice(0, -1) + buildSyllable(st), { initial: key, vowel: null, final: null, finalChar: null });
          setState({ initial: key, vowel: null, final: null, finalChar: null });
          return cur + buildSyllable(st);
        }

        if (st.final) {
          // Start new syllable — final might split
          const split = SPLIT_FINAL[st.final];
          const ini = INITIAL_IDX[st.initial!] ?? 0;
          const vow = VOWEL_IDX[st.vowel!] ?? 0;
          const finIdx = split ? (FINAL_IDX[split[0]] ?? 0) : 0;
          const newPrev = compose(ini, vow, finIdx);
          setState({ initial: split ? split[1] : st.final, vowel: null, final: null, finalChar: null });
          // Also try compound with the new consonant
          const nextIni = split ? split[1] : st.final;
          const compound = COMPOUND_CONSONANT[nextIni]?.[key];
          if (compound) {
            setState({ initial: compound, vowel: null, final: null, finalChar: null });
            return cur.slice(0, -1) + newPrev;
          }
          setState({ initial: nextIni, vowel: null, final: null, finalChar: null });
          // Flush and start new with key — wait, we need another key press to be an initial
          // Actually just start new syllable with key
          setState({ initial: key, vowel: null, final: null, finalChar: null });
          return cur.slice(0, -1) + newPrev + nextIni;
        }
      }

      if (isVowel) {
        if (!st.initial && !st.vowel) {
          // Standalone vowel, possibly with ㅇ placeholder
          setState({ initial: 'ㅇ', vowel: key, final: null, finalChar: null });
          const idx = VOWEL_IDX[key] ?? 0;
          return cur + compose(INITIAL_IDX['ㅇ'], idx, 0);
        }

        if (st.initial && !st.vowel) {
          // Add vowel to initial
          const ini = INITIAL_IDX[st.initial] ?? -1;
          const vow = VOWEL_IDX[key] ?? 0;
          if (ini >= 0) {
            setState({ ...st, vowel: key });
            return cur + compose(ini, vow, 0);
          }
          // Not a valid initial (shouldn't happen)
          setState({ initial: 'ㅇ', vowel: key, final: null, finalChar: null });
          return cur + st.initial + compose(INITIAL_IDX['ㅇ'], VOWEL_IDX[key] ?? 0, 0);
        }

        if (st.vowel && !st.final) {
          // Try compound vowel
          const compound = COMPOUND_VOWEL[st.vowel]?.[key];
          if (compound && st.initial) {
            const ini = INITIAL_IDX[st.initial] ?? 0;
            const vow = VOWEL_IDX[compound] ?? 0;
            setState({ ...st, vowel: compound });
            return cur.slice(0, -1) + compose(ini, vow, 0);
          }
          // Flush current and start new with vowel
          const [nc] = flush(cur, st);
          setState({ initial: 'ㅇ', vowel: key, final: null, finalChar: null });
          return nc + compose(INITIAL_IDX['ㅇ'], VOWEL_IDX[key] ?? 0, 0);
        }

        if (st.final) {
          // Final becomes initial of new syllable
          const split = SPLIT_FINAL[st.final];
          const ini = INITIAL_IDX[st.initial!] ?? 0;
          const vow = VOWEL_IDX[st.vowel!] ?? 0;
          const finIdx = split ? (FINAL_IDX[split[0]] ?? 0) : 0;
          const prevSyl = compose(ini, vow, finIdx);
          const newIni = split ? split[1] : st.final;
          const newIniIdx = INITIAL_IDX[newIni] ?? -1;
          if (newIniIdx >= 0) {
            setState({ initial: newIni, vowel: key, final: null, finalChar: null });
            return cur.slice(0, -1) + prevSyl + compose(newIniIdx, VOWEL_IDX[key] ?? 0, 0);
          }
          setState({ initial: 'ㅇ', vowel: key, final: null, finalChar: null });
          return cur.slice(0, -1) + prevSyl + compose(INITIAL_IDX['ㅇ'], VOWEL_IDX[key] ?? 0, 0);
        }
      }

      return cur;
    });
  }, [state, composed, flush, onInput, onClose]);

  // Sync composed to parent on each change
  const getDisplayValue = () => {
    if (state.initial || state.vowel) {
      return composed; // already includes current syllable being built
    }
    return composed;
  };

  return (
    <div className="hangul-keyboard">
      <div className="hk-preview-row">
        <div className="hk-preview">{getDisplayValue() || <span className="hk-placeholder">여기에 입력...</span>}</div>
        <button className="hk-close-btn" onClick={onClose} type="button" aria-label="Закрыть клавиатуру">✕</button>
      </div>

      <div className="hk-rows">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="hk-row">
            {row.map(key => (
              <button
                key={key}
                className="hk-key"
                onPointerDown={e => { e.preventDefault(); handleKey(key); }}
                type="button"
                aria-label={key}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="hk-row hk-special-row">
          <button className="hk-key hk-key-back" onPointerDown={e => { e.preventDefault(); handleKey('⌫'); }} type="button" aria-label="Удалить">⌫</button>
          <button className="hk-key hk-key-space" onPointerDown={e => { e.preventDefault(); handleKey('스페이스'); }} type="button" aria-label="Пробел">пробел</button>
          <button className="hk-key hk-key-ok" onPointerDown={e => { e.preventDefault(); handleKey('확인'); }} type="button" aria-label="Готово">OK</button>
        </div>
      </div>
    </div>
  );
};

export default HangulKeyboard;
