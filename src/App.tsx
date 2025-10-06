import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Index } from './pages/Index';
import { Vault } from './pages/Vault';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/vault" element={<Vault />} />
      </Routes>
    </Router>
  );
};

export default App;
