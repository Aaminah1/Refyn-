import React, { useRef, useState, useEffect } from 'react';
import './Navbar.css';
import { User } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

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

  // Close menu when navigating to another route
  useEffect(() => {
    setShowMenu(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" aria-label="Main navigation">
      <Link to="/" className="logo" role="heading" aria-level="1">✔ Refyn</Link>

      <div className="navbar-right">
        <div className="nav-links" role="menubar">
          {[ 
            { name: 'Home', path: '/' },
            { name: 'Tracker', path: '/tracker' },
            { name: 'Routines', path: '/routines' },
            { name: 'Library', path: '/library' }
          ].map(({ name, path }) => (
            <button
              type="button"
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
            type="button"
            onClick={() => setShowMenu((prev) => !prev)}
            className={`nav-links-button profile-toggle ${isActive('/settings') || showMenu ? 'active' : ''}`}
            aria-haspopup="menu"
            aria-expanded={showMenu}
            aria-controls="user-menu"
            aria-label="Open user settings"
          >
            <User className="menu-icon-desktop" />
            <User className="menu-icon-mobile" />
          </button>

          {showMenu && (
            <div className="dropdown-menu" id="user-menu" role="menu" aria-label="User settings">
              <button
                type="button"
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
                type="button"
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
