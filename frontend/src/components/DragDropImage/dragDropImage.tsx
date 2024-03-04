import React, {useState, useEffect} from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardMedia, CardContent } from '@mui/material';
import { uploadImage } from '../../api/api';
import { useDropzone } from 'react-dropzone';
import './dragDropImage.css'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DragDropImage() {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<string>('');
    const [confidence, setConfidence] = useState<string>('');


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
        setImage(event.target.files![0]);
        setImagePreview(URL.createObjectURL(event.target.files![0]));
    };

    const onDrop = (acceptedFiles: File[]) => {
        const selectedImage = acceptedFiles[0];
        setImage(selectedImage);
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

  return (
    <>
    <form onSubmit={handleSubmit}>
        <Container {...getRootProps()}
              sx={{
                mt: { xs: 4, sm: 4 },
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
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
            </>
          )}
        </Container>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
            Submit Image
        </Button>
      </form>
        
    </>
  );
}