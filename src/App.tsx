import React, { useState } from 'react';
import { ModuleProvider } from './context/ModuleContext';
import { ParameterControls } from './components/ParameterControls';
import { Module3D } from './components/Module3D';
import { BOMDisplay } from './components/BOMDisplay';
import './App.css';

function App() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  return (
    <ModuleProvider>
      <div className="app">
        <div className="app-header">
          <h1>Parametric 3D Module</h1>
          <p>Configure your module parameters and view the Bill of Materials</p>
        </div>
        <div className="app-content">
          <div className={`app-sidebar app-sidebar-left ${leftSidebarOpen ? 'open' : 'collapsed'}`}>
            <button
              className="sidebar-toggle sidebar-toggle-left"
              onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
              aria-label={leftSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {leftSidebarOpen ? '◀' : '▶'}
            </button>
            {leftSidebarOpen && <ParameterControls />}
          </div>
          <div className="app-main">
            <Module3D />
          </div>
          <div className={`app-sidebar app-sidebar-right ${rightSidebarOpen ? 'open' : 'collapsed'}`}>
            <button
              className="sidebar-toggle sidebar-toggle-right"
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              aria-label={rightSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {rightSidebarOpen ? '▶' : '◀'}
            </button>
            {rightSidebarOpen && <BOMDisplay />}
          </div>
        </div>
      </div>
    </ModuleProvider>
  );
}

export default App;

