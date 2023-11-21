import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { ConfigProvider } from 'antd';
import AddWord from './components/AddWord';
import List from './pages/List';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const user = useSelector(({ user }) => user.user);

  useEffect(() => {
    if (!user && window.location.pathname !== '/register') {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#2341CC',
        },
      }}
    >
      {user && <AddWord />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/list" element={<List />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
