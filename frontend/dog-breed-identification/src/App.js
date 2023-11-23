import React from 'react'
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import FooterBar from './components/FooterBar/FooterBar';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";


function App() {

  return (
    <>
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
      <FooterBar />
    </BrowserRouter>
    </>
  );
}

export default App;
