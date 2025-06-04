import React, { useEffect, useRef } from 'react';
import './ConfirmDialog.css';

function ConfirmDialog({ message, onConfirm, onCancel }) {
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    // Focus the cancel button on open
    if (cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="confirm-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-desc"
      onClick={onCancel}
    >
      <div className="confirm-box" onClick={(e) => e.stopPropagation()}>
        <p id="confirm-desc" className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button
            className="confirm-btn cancel"
            onClick={onCancel}
            ref={cancelButtonRef}
          >
            Cancel
          </button>
          <button
            className="confirm-btn delete"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
