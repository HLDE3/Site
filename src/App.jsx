import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/account/login';
import SignIn from './components/account/register';
import TopBar from './components/top_bar/TopBar';

const LoginPage = () =>  (
  <>
    <Login />
    <TopBar />
  </>
);

const SignInPage = () =>  (
  <>
    <SignIn />
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

        <Route path="*" element={<Navigate to="/home" replace />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<SignIn />} />

        <Route path="/home" element={<SignIn />} />

      </Routes>
    </Router>
  );
}

export default App
