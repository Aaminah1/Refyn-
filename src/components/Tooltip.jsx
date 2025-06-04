import React from 'react';
import './Tooltip.css';

let tooltipIdCounter = 0;

function Tooltip({ children, text, position = 'top' }) {
  const tooltipId = `tooltip-${++tooltipIdCounter}`;

  // Clone child and add aria-describedby
  const childWithAria = React.isValidElement(children)
    ? React.cloneElement(children, { 'aria-describedby': tooltipId })
    : children;

  return (
    <div className="tooltip-wrapper">
      {childWithAria}
      <span
        className={`tooltip-bubble tooltip-${position}`}
        role="tooltip"
        id={tooltipId}
      >
        {text}
      </span>
    </div>
  );
}

export default Tooltip;
