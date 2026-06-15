import React from 'react';
import mikuIce from '../assets/miku-icecream.png';

interface Props {
  onYes: () => void;
  onNo: () => void;
}

const LevelDownPrompt: React.FC<Props> = ({ onYes, onNo }) => {
  return (
    <div className="popup-overlay level-down-overlay">
      <div className="popup-container level-down-container">
        <div className="popup-header">
          <div className="popup-error-badge">💭 Подсказка</div>
          <img src={mikuIce} alt="미쿠" className="popup-miku" />
        </div>

        <div className="level-down-content">
          <h3 className="level-down-title">Вы хотите перейти на уровень ниже?</h3>
        </div>

        <div className="level-down-actions">
          <button className="level-down-btn yes" onClick={onYes} type="button">
            да
          </button>
          <button className="level-down-btn no" onClick={onNo} type="button">
            нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelDownPrompt;
