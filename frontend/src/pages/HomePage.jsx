import React from "react";
import FileForm from "../components/FileForm/FileForm";
import WebcamFeed from "../components/WebcamFeed/WebcamFeed";

const HomePage = () => {
  return (
   <>
      <div>
      <p>Upload an image file!</p>
      <FileForm/>
      <br />
      <p>Or... you can just take a picture!</p>
      <br />
      <WebcamFeed />
      </div>
   </>
  );
};

export default HomePage;