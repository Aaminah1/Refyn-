import React, { useState, useEffect } from 'react';
import './ProgressTimeline.css';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';
import PreviewModal from './PreviewModal';


function ProgressTimeline({
  routines,
  routineFilter,
  setRoutineFilter,
  sortedImages,
  handleUpload,
  handleCaptionChange,
  handleDeleteImage,
  previewIndex,
  setPreviewIndex,
  showPrev,
  showNext,
  uploading
}) {
  const [captions, setCaptions] = useState([]);
  const [confirmIdx, setConfirmIdx] = useState(null);
  const [deletingIndex, setDeletingIndex] = useState(null);

  useEffect(() => {
    setCaptions(sortedImages.map(img => img.caption || ''));
  }, [sortedImages]);

  const updateCaption = (idx, value) => {
    if (value.length <= 50) {
      const updated = [...captions];
      updated[idx] = value;
      setCaptions(updated);
      handleCaptionChange(idx, value);
    }
  };

  const confirmDelete = () => {
    if (confirmIdx !== null) {
      setDeletingIndex(confirmIdx);
      setTimeout(() => {
        handleDeleteImage(confirmIdx);
        setDeletingIndex(null);
      }, 300);
      setConfirmIdx(null);
    }
  };

  return (
    <div className="progress-timeline-container">
      <h3 className="timeline-heading">Progress Timeline</h3>

      <div className="routine-categories-wrapper">
        <div className="routine-categories" role="radiogroup" aria-label="Routine filters">
          <button
            role="radio"
            aria-checked={routineFilter === 'All'}
            className={routineFilter === 'All' ? 'active' : ''}
            onClick={() => setRoutineFilter('All')}
          >
            All
          </button>

          {routines.map(r => (
            <button
              key={r.id}
              role="radio"
              aria-checked={routineFilter === r.title}
              className={routineFilter === r.title ? 'active' : ''}
              onClick={() => setRoutineFilter(r.title)}
            >
              {r.title}
            </button>
          ))}
        </div>
      </div>

      <div className="fixed-upload-button">
        <label className="cta-button" htmlFor="upload-image">
          + Upload Image
        </label>
        <input
          type="file"
          id="upload-image"
          accept="image/*"
          onChange={handleUpload}
          className="upload-input"
          aria-label="Upload progress image"
        />
      </div>

      {uploading && (
        <div className="uploading-indicator">
          <div className="spinner"></div>
          <p>Uploading image...</p>
        </div>
      )}

      {!uploading && sortedImages.length === 0 ? (
        <div className="empty-progress-msg">
          <p>No progress images yet. Start by uploading one!</p>
        </div>
      ) : (
        <div className="timeline-wrapper">
          {sortedImages.map((img, idx) => {
            const currentText = captions[idx] || '';
            const charCount = currentText.length;
            const isMax = charCount >= 50;

            return (
              <div key={idx} className={`timeline-entry ${deletingIndex === idx ? 'fade-out' : ''}`}>
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-date">{new Date(img.date).toLocaleDateString()}</div>
                </div>

                <div className="timeline-card responsive">
                  <button
                    className="timeline-delete-icon"
                    onClick={() => setConfirmIdx(idx)}
                    aria-label="Delete image"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="image-container">
                    <img
                      src={img.url}
                      alt={`Progress from ${new Date(img.date).toLocaleDateString()}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => setPreviewIndex(idx)}
                      onKeyDown={(e) => e.key === 'Enter' && setPreviewIndex(idx)}
                      aria-label="Click to view full preview"
                    />
                  </div>

                  <div className="timeline-note-wrapper">
                    <textarea
                      placeholder="Add a short note ..."
                      aria-label={`Note for image uploaded on ${new Date(img.date).toLocaleDateString()}`}
                      value={currentText}
                      onChange={(e) => updateCaption(idx, e.target.value)}
                      maxLength={50}
                    />
                    <div className={`word-limit ${isMax ? 'limit-exceeded' : ''}`}>
                      {charCount}/50
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      

      {previewIndex !== null && (
        <PreviewModal
          image={sortedImages[previewIndex].url}
          caption={sortedImages[previewIndex].caption}
          onClose={() => setPreviewIndex(null)}
          onPrev={showPrev}
          onNext={showNext}
          hasPrev={previewIndex > 0}
          hasNext={previewIndex < sortedImages.length - 1}
        />
      )}

      {confirmIdx !== null && (
        <ConfirmDialog
          message="Are you sure you want to delete this progress image?"
          onConfirm={confirmDelete}
          onCancel={() => setConfirmIdx(null)}
        />
      )}
    </div>
  );
}

export default ProgressTimeline;
