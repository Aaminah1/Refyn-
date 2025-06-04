import React from 'react';
import './TrackerTabs.css';

function TrackerTabs({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'today', label: "Today's Tasks" },
    { id: 'progress', label: 'Progress' }
  ];

  const handleKeyDown = (e, currentIndex) => {
    const nextIndex = e.key === 'ArrowRight' ? (currentIndex + 1) % tabs.length
                     : e.key === 'ArrowLeft' ? (currentIndex - 1 + tabs.length) % tabs.length
                     : null;

    if (nextIndex !== null) {
      e.preventDefault();
      onTabChange(tabs[nextIndex].id);
    }
  };

  return (
    <div className="tracker-tabs" role="tablist" aria-label="Tracker Tabs">
      {tabs.map((tab, idx) => (
        <button
          key={tab.id}
          role="tab"
          id={`tab-${tab.id}`}
          aria-selected={activeTab === tab.id}
          aria-controls={`panel-${tab.id}`}
          tabIndex={activeTab === tab.id ? 0 : -1}
          className={`tracker-tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TrackerTabs;
