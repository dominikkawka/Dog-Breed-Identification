import axios from "axios";
import React, {useState, useRef, useCallback} from "react";
import Webcam from "react-webcam";
import { Container } from "@mui/system";
import { Button, Typography } from "@mui/material";
import LinearProgressBar from '../LinearProgressBar/linearProgressBar';
import { getPrediction, patchUsernameToPrediction } from "../../api/api";


function WebcamFeed() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [progressVisible, setProgressVisible] = useState<boolean>(false);
  const [viewPrediction, setViewPrediction] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string>('');
  const [confidence, setConfidence] = useState<string>('');
  const [imageName, setImageName] = useState<string>('')

  let imageSrc = '';
  let imgMetaData = [];
  let splitImgMetaData = '';
  

  const capture = useCallback(() => {
    imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    const randInt = Math.floor(Math.random() * 10000);
    let imgName = 'webcam-' + randInt + '.jpeg'
    setImageName(imgName)
  }, [webcamRef]);

  const videoConstraints = {
    width: 256,
    height: 256,
    facingMode: "user",
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    imgMetaData = image.split(",");
    splitImgMetaData = imgMetaData[1];

    setProgressVisible(true);

    try {
      await axios
      .post(`${import.meta.env.VITE_API_URL}/webcamImage`, {
        image: splitImgMetaData,
        imageName: imageName,
      })
      .then((r) => {
        console.log(r.status);
        setProgressVisible(false); 
      })
      .catch((e) => console.log(e));
      //console.log(splitImgMetaData);
      setViewPrediction(true)
    } catch (error) {
    setViewPrediction(true)
    }
  };

  const handlePredictionResults = async () => {
    setProgressVisible(false)
      try {
        const response = await getPrediction(imageName);
        setPrediction(response.predictedBreed || '');
        setConfidence(response.confidence || '');
      } catch (error) {
        // Handle error
      }
  };

  const saveSubmission = async () => {
    let username = sessionStorage.getItem("username")
    try {
      const response = await patchUsernameToPrediction(prediction, imageName, username)
        if (response) {
      }
    } catch (error) {
    }
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
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Submit Image
        </Button>
        {progressVisible && (
          <LinearProgressBar />
        )}

        {viewPrediction && (
          <>
            <Button variant="contained" onClick={handlePredictionResults}>
              View Prediction Results
            </Button>
            <Typography>
              Predicted Breed: {prediction} + Confidence: {confidence}
            </Typography>
            <Typography>
              If you would like to find out about your dog, you can read more here!
            </Typography>
            <Button variant="outlined" color="primary" href={`/description/${prediction}`}>
                  Start now
              </Button>
            <Button variant="contained" onClick={saveSubmission}>
              Save Submission to History
            </Button>
          </>
        )}
        </Container>
        
      </div>
    );
  }

export default WebcamFeed;