import React, { useState } from 'react';
import { GrammarRule } from '../data/grammarData';

interface Props {
  rule: GrammarRule;
  defaultExpanded?: boolean;
}

/** Reusable detailed grammar explanation block. */
const GrammarBlock: React.FC<Props> = ({ rule, defaultExpanded = false }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="grammar-block">
      <button
        className={`grammar-block-header ${expanded ? 'grammar-block-open' : ''}`}
        onClick={() => setExpanded(e => !e)}
        type="button"
        aria-expanded={expanded}
      >
        <div className="gb-title-row">
          <span className="gb-title">{rule.title}</span>
          <span className="gb-title-ru">{rule.titleRu}</span>
        </div>
        <span className="gb-chevron">{expanded ? '▲' : '▼'}</span>
      </button>

      {expanded && (
        <div className="grammar-block-body">
          {/* Meaning */}
          <section className="gb-section">
            <div className="gb-section-label">💡 Значение</div>
            <p className="gb-text">{rule.meaningRu}</p>
          </section>

          {/* Usage */}
          <section className="gb-section">
            <div className="gb-section-label">📌 Когда использовать</div>
            <p className="gb-text">{rule.usageRu}</p>
          </section>

          {/* Formation */}
          <section className="gb-section">
            <div className="gb-section-label">⚙️ Образование</div>
            <p className="gb-text gb-formation">{rule.formation}</p>
            {(rule.withBatchim || rule.withoutBatchim) && (
              <div className="gb-batchim-row">
                {rule.withBatchim && (
                  <div className="gb-batchim-box gb-batchim-yes">
                    <div className="gb-batchim-label">받침 있음 ✓</div>
                    <div className="gb-batchim-val">{rule.withBatchim}</div>
                  </div>
                )}
                {rule.withoutBatchim && (
                  <div className="gb-batchim-box gb-batchim-no">
                    <div className="gb-batchim-label">받침 없음 ✗</div>
                    <div className="gb-batchim-val">{rule.withoutBatchim}</div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Tense examples */}
          {(rule.presentExample || rule.pastExample || rule.futureExample) && (
            <section className="gb-section">
              <div className="gb-section-label">🕐 Примеры по времени</div>
              <div className="gb-tense-grid">
                {rule.presentExample && (
                  <div className="gb-tense-item">
                    <div className="gb-tense-label">Настоящее</div>
                    <div className="gb-tense-kr">{rule.presentExample.kr}</div>
                    <div className="gb-tense-ru">{rule.presentExample.ru}</div>
                  </div>
                )}
                {rule.pastExample && (
                  <div className="gb-tense-item">
                    <div className="gb-tense-label">Прошедшее</div>
                    <div className="gb-tense-kr">{rule.pastExample.kr}</div>
                    <div className="gb-tense-ru">{rule.pastExample.ru}</div>
                  </div>
                )}
                {rule.futureExample && (
                  <div className="gb-tense-item">
                    <div className="gb-tense-label">Будущее</div>
                    <div className="gb-tense-kr">{rule.futureExample.kr}</div>
                    <div className="gb-tense-ru">{rule.futureExample.ru}</div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Question example */}
          {rule.questionExample && (
            <section className="gb-section">
              <div className="gb-section-label">❓ Форма вопроса</div>
              <div className="gb-example-pill">
                <span className="gb-ex-kr">{rule.questionExample.kr}</span>
                <span className="gb-ex-ru">{rule.questionExample.ru}</span>
              </div>
            </section>
          )}

          {/* Irregular note */}
          {rule.irregularNote && (
            <section className="gb-section">
              <div className="gb-section-label">⚠️ Неправильные формы</div>
              <p className="gb-text gb-irregular">{rule.irregularNote}</p>
            </section>
          )}

          {/* Examples */}
          <section className="gb-section">
            <div className="gb-section-label">📝 Примеры</div>
            <div className="gb-examples-list">
              {rule.examples.map((ex, i) => (
                <div key={i} className="gb-example-item">
                  <div className="gb-ex-kr">{ex.kr}</div>
                  <div className="gb-ex-ru">{ex.ru}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Common mistakes */}
          {rule.commonMistakes.length > 0 && (
            <section className="gb-section gb-section-mistakes">
              <div className="gb-section-label">🚫 Частые ошибки</div>
              <ul className="gb-mistakes-list">
                {rule.commonMistakes.map((m, i) => (
                  <li key={i} className="gb-mistake-item">{m}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default GrammarBlock;
