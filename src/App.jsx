import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/account/login';
import SignIn from './components/account/register';
import TopBar from './components/top_bar/TopBar';
import NotFound from './components/notfound';
import User from './components/account/user';

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

const UserPage = () =>  (
  <>
    <TopBar />
    <User/>
  </>
);

const NotFoundPage = () =>  (
  <>
    <TopBar />
    <NotFound/>
  </>
);

function App() {  
  
  return (
    <Router>
      <Routes>

        <Route path="*" element={<NotFoundPage />} />
        
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<SignInPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/user/:username" element={<UserPage />} />

      </Routes>
    </Router>
  );
}

export default App
