import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Focus main content for screen readers after route change
    const main = document.getElementById('main-content');
    if (main) {
      main.focus();
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
