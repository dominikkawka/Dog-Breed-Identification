import React from "react";
import FileForm from "../components/FileForm/FileForm";
import WebcamFeed from "../components/WebcamFeed/WebcamFeed";
import HomeHeader from "../components/HomeHeader/homeHeader";
import { Divider } from "@mui/material";

const HomePage = () => {
  return (
   <>
      <div>
      <HomeHeader />
      <Divider />
      <Divider />
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