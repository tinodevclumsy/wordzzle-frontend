import React from 'react';
// import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WordListPage from './pages/WordListPage';
import { ConfigProvider, theme } from 'antd';
import AddWord from './components/AddWord';

function App() {
  return (
    <ConfigProvider
      theme={{
        // 1. Use dark algorithm
        algorithm: theme.darkAlgorithm,
        token: {
          // Seed Token
          colorPrimary: '#2ecc71',
        },
        // 2. Combine dark algorithm and compact algorithm
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <AddWord />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/list" element={<WordListPage />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
