import React, {useState, useEffect} from 'react'
import './App.css';
import FileForm from './components/FileForm/FileForm';
import PredictionResults from './components/PredictionResults/PredictionResults';
import WebcamFeed from './components/WebcamFeed/WebcamFeed';

function App() {

  return (
    <div className="App">
      <p>Upload an image file!</p>
      <FileForm/>
      <PredictionResults/>
      <br />
      <p>Or... you can just take a picture!</p>
      <br />
      <WebcamFeed />
    </div>
  );
}

export default App;
