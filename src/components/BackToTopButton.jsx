import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Tooltip from './Tooltip';
import './BackToTopButton.css';

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  return visible ? (
    <Tooltip text="Back to top">
      <button
        className="back-to-top-btn"
        onClick={scrollToTop}
        onKeyDown={handleKeyPress}
        aria-label="Back to top"
        tabIndex={0}
      >
        <ArrowUp size={22} strokeWidth={2.5} />
      </button>
    </Tooltip>
  ) : null;
};

export default BackToTopButton;
