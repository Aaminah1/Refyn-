import React, { useEffect, useRef, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import './PreviewModal.css';

function PreviewModal({ image, caption, onClose, onPrev, onNext, hasPrev, hasNext }) {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(true);

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

      {hasPrev && (
        <button
          className="preview-nav-button left"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {hasNext && (
        <button
          className="preview-nav-button right"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      )}

      <div className="preview-image-wrapper">
        {loading && (
          <div className="preview-loading-spinner" aria-live="polite">
            Loading image...
          </div>
        )}
        <img
          src={image}
          alt={caption || 'Preview image'}
          onClick={(e) => e.stopPropagation()}
          onLoad={() => setLoading(false)}
          style={{ display: loading ? 'none' : 'block' }}
        />
        {!loading && caption && (
          <p className="preview-caption">{caption}</p>
        )}
      </div>
    </div>
  );
}

export default PreviewModal;
