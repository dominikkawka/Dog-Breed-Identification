import React from "react";
import HomeHeader from "../components/HomeHeader/homeHeader";
import ImageUploadGuide from "../components/ImageUploadGuide/imageUploadGuide";
import FileForm from "../components/FileForm/FileForm";
import { Divider } from "@mui/material";
import DragDropImage from "../components/DragDropImage/dragDropImage";


const ImageUploadPage = () => {
  return (
   <>
      <div>
      <ImageUploadGuide />
      <Divider />
      <Divider />
      <DragDropImage />
      <FileForm />
      </div>
   </>
  );
};

export default ImageUploadPage;