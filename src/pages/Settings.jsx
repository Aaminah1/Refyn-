import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import './Settings.css';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

function Settings({ username, onClose }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const isMobile = useIsMobile();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeTab = searchParams.get('tab') || 'Profile';

  useEffect(() => {
    // Prevent initial tab from pushing to history
    if (!searchParams.get('tab')) {
      setSearchParams({ tab: 'Profile' }, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const saved = localStorage.getItem(`settings-${username}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setNotificationsEnabled(parsed.notificationsEnabled || false);
    }
  }, [username]);

  useEffect(() => {
    localStorage.setItem(
      `settings-${username}`,
      JSON.stringify({ notificationsEnabled })
    );
  }, [notificationsEnabled, username]);

  const renderProfileSection = () => (
    <section className="settings-section" aria-labelledby="profile-heading">
      <h2 id="profile-heading">Profile</h2>
      <div className="profile-row">
        <span className="avatar-placeholder" role="img" aria-label="User avatar">👤</span>
        <div className="username-box">
          <label htmlFor="username">Username</label>
          <div className="username-field">
            <input
              id="username"
              type="text"
              value={username}
              readOnly
              aria-readonly="true"
              autoComplete="username"
            />
          </div>
        </div>
      </div>
    </section>
  );

  const renderGeneralSection = () => (
    <section className="settings-section" aria-labelledby="general-heading">
      <h2 id="general-heading">General</h2>
      <div className="toggle-row">
        <label htmlFor="notification-toggle">Notifications</label>
        <label className="switch">
          <input
            id="notification-toggle"
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </section>
  );

  const handleBack = () => {
    navigate(-1);
  };

  if (isMobile) {
    return (
      <div className="settings-container" role="region" aria-labelledby="settings-heading">
        <div className="settings-header">
          <button className="back-button" onClick={handleBack} aria-label="Go back">
            <ArrowLeft className="back-icon" />
          </button>
          <h1 id="settings-heading">Settings</h1>
        </div>
        {renderProfileSection()}
        <hr className="settings-divider" />
        {renderGeneralSection()}
      </div>
    );
  }

  return (
    <div className="settings-layout" role="region" aria-labelledby="settings-heading-desktop">
      <aside className="settings-sidebar" role="tablist" aria-label="Settings Tabs">
        <button
          role="tab"
          className={activeTab === 'Profile' ? 'active' : ''}
          aria-selected={activeTab === 'Profile'}
          onClick={() => setSearchParams({ tab: 'Profile' }, { replace: true })}
        >
          Profile
        </button>
        <button
          role="tab"
          className={activeTab === 'General' ? 'active' : ''}
          aria-selected={activeTab === 'General'}
          onClick={() => setSearchParams({ tab: 'General' }, { replace: true })}
        >
          General
        </button>
      </aside>

      <main className="settings-content" role="tabpanel" aria-labelledby="settings-heading-desktop">
        <div className="settings-header">
          <button className="back-button" onClick={handleBack} aria-label="Go back">
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
          <h1 id="settings-heading-desktop">{activeTab} Settings</h1>
          <div style={{ width: '24px' }} aria-hidden="true" />
        </div>

        {activeTab === 'Profile' && renderProfileSection()}
        {activeTab === 'General' && renderGeneralSection()}
      </main>
    </div>
  );
}

export default Settings;
