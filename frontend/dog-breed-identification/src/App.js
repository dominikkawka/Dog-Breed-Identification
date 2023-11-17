import React from 'react'
import './App.css';
import FileForm from './components/FileForm/FileForm';
import NavigationBar from './components/NavigationBar/NavigationBar';
import WebcamFeed from './components/WebcamFeed/WebcamFeed';
import FooterBar from './components/FooterBar/FooterBar';

function App() {

  return (
    <>
      <NavigationBar />
      <div>
      <p>Upload an image file!</p>
      <FileForm/>
      <br />
      <p>Or... you can just take a picture!</p>
      <br />
      <WebcamFeed />
      </div>
      <FooterBar />
    </>
  );
}

export default App;
