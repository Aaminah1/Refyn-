import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Move keyboard focus to main content after route change
      // Improves accessibility for screen readers and keyboard users
      const main = document.getElementById('main-content');
      if (main) {
        main.focus();
      }
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
