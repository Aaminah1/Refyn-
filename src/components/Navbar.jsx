import React, { useRef, useState, useEffect } from 'react';
import './Navbar.css';
import { User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ user, handleLogout }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-left">
        <span className="logo" role="heading" aria-level="1">✔ Refyn</span>
      </div>

      <div className="navbar-right">
        <div className="nav-links" role="menubar">
          {[
            { name: 'Home', path: '/' },
            { name: 'Tracker', path: '/tracker' },
            { name: 'Routines', path: '/routines' },
            { name: 'Library', path: '/library' }
          ].map(({ name, path }) => (
            <button
              key={name}
              onClick={() => navigate(path)}
              className={isActive(path) ? 'active' : ''}
              role="menuitem"
              aria-current={isActive(path) ? 'page' : undefined}
              aria-label={`Go to ${name}`}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="menu-container" ref={menuRef}>
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className={`nav-links-button profile-toggle ${isActive('/settings') || showMenu ? 'active' : ''}`}
            aria-haspopup="menu"
            aria-expanded={showMenu}
            aria-label="Open user settings"
          >
            <User className="menu-icon-desktop" />
            <User className="menu-icon-mobile" />
          </button>

          {showMenu && (
            <div className="dropdown-menu" role="menu" aria-label="User settings">
              <button
                onClick={() => {
                  navigate('/settings');
                  setShowMenu(false);
                }}
                className={isActive('/settings') ? 'active-setting' : ''}
                role="menuitem"
                aria-label="Go to Settings"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="logout-btn"
                role="menuitem"
                aria-label="Log out"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
