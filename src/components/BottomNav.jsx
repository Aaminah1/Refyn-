import React from 'react';
import './BottomNav.css';
import { Home, CheckSquare, List, BarChart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bottom-nav" aria-label="Mobile navigation" role="navigation">
      <button
        onClick={() => navigate('/')}
        className={isActive('/') ? 'active' : ''}
        aria-label="Go to Home"
        aria-current={isActive('/') ? 'page' : undefined}
      >
        <Home size={24} />
        <span>Home</span>
      </button>

      <button
        onClick={() => navigate('/tracker')}
        className={isActive('/tracker') ? 'active' : ''}
        aria-label="Go to Tracker"
        aria-current={isActive('/tracker') ? 'page' : undefined}
      >
        <CheckSquare size={24} />
        <span>Tracker</span>
      </button>

      <button
        onClick={() => navigate('/routines')}
        className={isActive('/routines') ? 'active' : ''}
        aria-label="Go to Routines"
        aria-current={isActive('/routines') ? 'page' : undefined}
      >
        <List size={24} />
        <span>Routines</span>
      </button>

      <button
        onClick={() => navigate('/library')}
        className={isActive('/library') ? 'active' : ''}
        aria-label="Go to Library"
        aria-current={isActive('/library') ? 'page' : undefined}
      >
        <BarChart size={24} />
        <span>Library</span>
      </button>
    </nav>
  );
}

export default BottomNav;
