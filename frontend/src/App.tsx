import React from 'react'
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import FooterBar from './components/FooterBar/FooterBar';
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import SignUp from './pages/signupPage';
import SignInSide from './pages/signinPage';
import HistoryPage from './pages/HistoryPage';
import ImageUploadPage from './pages/ImageUploadPage';
import WebcamUploadPage from './pages/webcamUploadPage';
import DogDescriptionPage from './pages/DogDescriptionPage';


function App() {

  return (
    <>
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignInSide />} />
        <Route path="/imageUpload" element={<ImageUploadPage />} />
        <Route path="/webcamUpload" element={<WebcamUploadPage />} />
        <Route path="/description/:breedName" element={<DogDescriptionPage />} />
        <Route path="*" element={ <Navigate to="/" /> } />
      </Routes>
      <FooterBar />
    </BrowserRouter>
    </>
  );
}

export default App;
