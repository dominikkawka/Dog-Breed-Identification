import React, {useState, useEffect} from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardMedia, CardContent } from '@mui/material';
import { uploadImage, getPrediction, patchCorrectBreed, patchUsernameToPrediction } from '../../api/api';
import { useDropzone } from 'react-dropzone';

export default function DragDropImage() {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<string>('');
    const [confidence, setConfidence] = useState<string>('');
    const [uploadError, setUploadError] = useState<string>('')


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
          const response = await uploadImage(image!);
          if (response) {
          }
        } catch (error) {
        }
      };

      const handleImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files![0].type === 'image/png' || event.target.files![0].type === 'image/jpeg') {
            setUploadError('')
            setImage(event.target.files![0]);
            setImagePreview(URL.createObjectURL(event.target.files![0]));
        } else {
            setUploadError('Unsupported file type. Please upload a PNG or JPEG image.')
        }
    };

    const onDrop = (acceptedFiles: File[]) => {
        const selectedImage = acceptedFiles[0];
        if (selectedImage.type === 'image/png' || selectedImage.type === 'image/jpeg') {
            setUploadError('')
            setImage(selectedImage);
            setImagePreview(URL.createObjectURL(selectedImage));
        } else {
            setUploadError('Unsupported file type. Please upload a PNG or JPEG image.')
            console.error('Unsupported file type. Please upload a PNG or JPEG image.');
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
  
      const saveSubmission = async () => {
        let username = sessionStorage.getItem("username")
        try {
          const response = await patchUsernameToPrediction(prediction, image.name, username)
          if (response) {
          }
        } catch (error) {
        }
      }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

  return (
    <>
    <form onSubmit={handleSubmit}>
        <Container {...getRootProps()}
              sx={{
                mt: { xs: 4, sm: 4 },
                pt: { xs: 4, sm: 4 },
                pb: { xs: 4, sm: 4 },
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 3, sm: 6 },
                backgroundColor: 'white',
                border: 2
              }}
            >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <Button variant="contained" component="span">
                Upload Image
              </Button>
              <Typography>
                Or drag the image file here!
              </Typography>
              <Box 
        sx={{ alignContent: "center"}}>
        {uploadError && 
            <Typography>
                {uploadError}
            </Typography>
        }
        {imagePreview && (
          <Card sx={{ height: 256, width: 192, padding: 1, backgroundColor: '#f0f0f0' }}>
            <CardMedia
              component="img"
              alt="Prediction"
              image={imagePreview}
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
            </>
          )}
        </Container>
        <Container
        sx={{
            mt: { xs: 1, sm: 1 },
            pt: { xs: 4, sm: 1 },
            pb: { xs: 8, sm: 16 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
          }}
        >
        <Button type="submit" variant="contained" onClick={handleSubmit}>
            Submit Image
        </Button>
        <Button variant="contained" onClick={handlePredictionResults}>
          View Prediction Results
        </Button>
        <Button variant="contained" onClick={saveSubmission}>
          Save Submission to History
        </Button>
        <Typography>
          Predicted Breed: {prediction} + Confidence: {confidence}
        </Typography>
        </Container>
      </form>
        
    </>
  );
}