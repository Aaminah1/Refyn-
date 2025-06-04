import React from 'react';
import './Tooltip.css';

function Tooltip({ children, text, position = 'top' }) {
  return (
    <div className="tooltip-wrapper">
      {children}
      <span className={`tooltip-bubble tooltip-${position}`} role="tooltip">
        {text}
      </span>
    </div>
  );
}

export default Tooltip;
