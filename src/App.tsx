import React from 'react';
import ConfiguratorPage from './ConfiguratorPage';
import FrontPage from './FrontPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/configure" element={<ConfiguratorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
