import axios from "axios";
import React, {useState, useRef, useCallback} from "react";
import Webcam from "react-webcam";
import { Container } from "@mui/system";
import { Button } from "@mui/material";

function WebcamFeed() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  let imageSrc = ''
  let imgMetaData = []
  let splitImgMetaData = ''
 
  const capture = useCallback(() => {
    imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
   }, [webcamRef]);
 
   const videoConstraints = {
    width: 256,
    height: 256,
    facingMode: "user",
   };

  const handleSubmit = () => {
    imgMetaData = image.split(",")
    splitImgMetaData = imgMetaData[1]
    
    axios.post( `${import.meta.env.VITE_API_URL}/webcamImage`, {"image": splitImgMetaData}) 
    .then(r => console.log(r.status))
    .catch(e => console.log(e)); 
    console.log(splitImgMetaData) 
  }

    return (
      <div className="Container">
         <Container
              sx={{
                mt: { xs: 4, sm: 4 },
                mb: { xs: 4, sm: 4 },
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
        {image === null ? (
          <>
            <Webcam
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              audio={false}
              height={256}
              width={256}
              ref={webcamRef}
              mirrored={true}
            />
            <Button variant="contained" onClick={capture}>Capture photo</Button>
          </>
        ) : (
          <>
            <img src={image} alt="screenshot" />
            <Button variant="contained" onClick={() => setImage(null)}>Recapture</Button>
            
          </>
        )}
        </Container>
        <Container sx={{
            mt: { xs: 1, sm: 1 },
            pt: { xs: 4, sm: 1 },
            pb: { xs: 8, sm: 16 },
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
          }}>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Container>
        
      </div>
    );
  }

export default WebcamFeed;