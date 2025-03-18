import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import TopBar from './components/top_bar/TopBar';

const LoginPage = () =>  (
  <>
    <Login />
    <TopBar />
  </>
);

const HomePage = () =>  (
  <>
    <TopBar />
  </>
);

function App() {  
  
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<HomePage />} />

      </Routes>
    </Router>
  );
}

export default App
