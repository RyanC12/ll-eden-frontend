import React from 'react';

import Dashboard from '../src/components/dashboard/Dashboard';

import { BrowserRouter as Router, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Dashboard
          path='/'
        />
      </Router>
    </div>
  );
}

export default App;
