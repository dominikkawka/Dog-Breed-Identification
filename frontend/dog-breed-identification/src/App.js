import React, {useState, useEffect} from 'react'
import './App.css';
import FileForm from './components/FileForm/FileForm';
import PredictionResults from './components/PredictionResults/PredictionResults';

function App() {

  return (
    <div className="App">
      <FileForm/>
      <PredictionResults/>
    </div>
  );
}

export default App;
