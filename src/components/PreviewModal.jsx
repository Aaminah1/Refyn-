import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './PreviewModal.css';

function PreviewModal({ image, caption, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current?.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="preview-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
      ref={modalRef}
      tabIndex={-1}
    >
      <button
        className="preview-close-button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close preview"
      >
        <X size={28} />
      </button>

      <img
        src={image}
        alt="User progress preview"
        onClick={(e) => e.stopPropagation()}
      />

      <p className="preview-caption">{caption}</p>

      <div className="preview-nav">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          disabled={!hasPrev}
          aria-label="Previous image"
          className="preview-icon-button"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          disabled={!hasNext}
          aria-label="Next image"
          className="preview-icon-button"
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}

export default PreviewModal;
