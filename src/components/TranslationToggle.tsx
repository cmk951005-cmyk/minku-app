import React, { useState } from 'react';

interface Props {
  translationRu: string;
  defaultVisible?: boolean;
  compact?: boolean;
}

/** Reusable "Показать / Скрыть перевод" toggle. */
const TranslationToggle: React.FC<Props> = ({ translationRu, defaultVisible = false, compact = false }) => {
  const [visible, setVisible] = useState(defaultVisible);

  return (
    <div className={`translation-toggle ${compact ? 'translation-toggle-compact' : ''}`}>
      <button
        className={`trans-btn ${visible ? 'trans-btn-open' : ''}`}
        onClick={() => setVisible(v => !v)}
        type="button"
        aria-expanded={visible}
        aria-label={visible ? 'Скрыть перевод' : 'Показать перевод'}
      >
        {visible ? '🙈 Скрыть перевод' : '🌐 Показать перевод'}
      </button>
      {visible && (
        <div className="trans-text" role="region" aria-live="polite">
          {translationRu}
        </div>
      )}
    </div>
  );
};

export default TranslationToggle;
