import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import NotFound404 from './Pages/NotFound404/NotFound404';
import LoginPage from './Pages/Login/LoginPage';
import HomePage from './Pages/Home/HomePage';
import ProfilePage from './Pages/Profile/ProfilePage';

import './App.css';

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    user_token = localStorage.getItem(sp_token);
    if (!user_token) {
      navigate("/login");
    }
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
