import { useState } from 'react';
import './App.css';

import Home from './pages/Home.jsx';
import Tracker from './pages/Tracker.jsx';
import Routines from './pages/Routines.jsx';
import Library from './pages/Library.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  const renderPage = () => {
    switch (activeTab) {
      case 'Home': return <Home />;
      case 'Tracker': return <Tracker />;
      case 'Routines': return <Routines />;
      case 'Library': return <Library />;
      default: return <Home />;
    }
  };

  return (
    <div className="App">
      <nav className="navbar">
        <button onClick={() => setActiveTab('Home')}>Home</button>
        <button onClick={() => setActiveTab('Tracker')}>Tracker</button>
        <button onClick={() => setActiveTab('Routines')}>Routines</button>
        <button onClick={() => setActiveTab('Library')}>Library</button>
      </nav>
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
