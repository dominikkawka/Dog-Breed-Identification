import React from "react";
import FileForm from "../components/FileForm/FileForm";
import { Divider } from "@mui/material";
import WebcamUploadGuide from "../components/WebcamUploadGuide/webcamUploadGuide";
import WebcamFeed from "../components/WebcamFeed/WebcamFeed";


const WebcamUploadPage = () => {
  return (
   <>
      <div>
      <WebcamUploadGuide />
      <Divider />
      <Divider />
      <WebcamFeed />
      <Divider />
      <Divider />
      </div>
   </>
  );
};

export default WebcamUploadPage;