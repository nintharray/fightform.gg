import React from 'react';
import ConfiguratorPage from './ConfiguratorPage';
import FrontPage from './FrontPage';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
