import React, {useState} from 'react'
import axios from 'axios'
import SelectCorrectBreed from '../SelectCorrectBreed/SelectCorrectBreed'
import { uploadImage, getPrediction, patchCorrectBreed } from '../../api/api'
import { Button, Typography, Card, CardContent, CardMedia, Box } from '@mui/material';
import './imageAnimation.css';

function FileForm() {
   const [image, setImage] = useState(null)
   const [imagePreview, setImagePreview] = useState(null)
   const [prediction, setPrediction]= useState('')
   const [confidence, setConfidence]= useState('')
   const [actualBreed, setActualBreed] = useState()
   

   const handleImageInputChange = (event) => {
      setImage(event.target.files[0])
      setImagePreview(URL.createObjectURL(event.target.files[0]))
   }

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await uploadImage(image);
        if (response) {
        }
      } catch (error) {
      }
    };
  
    const handlePredictionResults = async () => {
      try {
        const response = await getPrediction(image.name);
        setPrediction(response.predictedBreed || '');
        setConfidence(response.confidence || '');
      } catch (error) {
        // Handle error
      }
    };

    const handleSubmitActualBreed = async (event) => {
      event.preventDefault();
      let actualBreed = "FrontEndTest"
      try {
        const response = await patchCorrectBreed(prediction, image.name, actualBreed);
        if (response) {
        }
      } catch (error) {
        //console.log("prediction: "+ prediction)
        //console.log("image name: "+ image.name)
        //console.log("actualBreed: "+ actualBreed)
      }
    };

   return (
      <>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={handleImageInputChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
            <Button type="submit" variant="contained" onClick={handleSubmit}>
               Submit Image
            </Button>
          </label>
        </form>
        <br />
        <Button variant="contained" onClick={handlePredictionResults}>
          View Prediction Results
        </Button>
        <Typography>
          Predicted Breed: {prediction} + Confidence: {confidence}
        </Typography>
        <Typography>
        <Box 
        sx={{ alignContent: "center"}}>
        {imagePreview && (
          <Card sx={{ height: 256, width: 192, padding: 1 }}>
            <CardMedia
              component="img"
              alt="Prediction"
              image={imagePreview}
              className="animation"
              sx={{ height: 192, width: 192 }}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {image.name}
              </Typography>
            </CardContent>
          </Card> 
        )}
        </Box>
        </Typography> 
        <Box style={{paddingLeft: "42%"}}>
        <SelectCorrectBreed />
        </Box>
        <Button variant="contained" onClick={handleSubmitActualBreed}>
          Submit Actual Breed
        </Button>
      </>
    );
  }

export default FileForm