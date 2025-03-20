import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/account/login';
import SignIn from './components/account/register';
import TopBar from './components/top_bar/TopBar';

const LoginPage = () =>  (
  <>
    <TopBar />
    <Login />
  </>
);

const SignInPage = () =>  (
  <>
    <TopBar />
    <SignIn />
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

        <Route path="*" element={<Navigate to="/home" replace />} />
        
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<SignInPage />} />

        <Route path="/home" element={<HomePage />} />

      </Routes>
    </Router>
  );
}

export default App
