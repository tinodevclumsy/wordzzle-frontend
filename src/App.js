import React from 'react';
// import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import WordListPage from './pages/WordListPage';
import { ConfigProvider, theme } from 'antd';
import AddWord from './components/AddWord';
import List from './pages/List'
import Quiz from './pages/Quiz'

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
        <Route path="/list" element={<List />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
