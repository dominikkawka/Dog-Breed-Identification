import axios from "axios";
import React, {useState, useRef, useCallback} from "react";
import Webcam from "react-webcam";

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
    width: 192,
    height: 192,
    facingMode: "user",
   };

  const handleSubmit = () => {
    imgMetaData = image.split(",")
    splitImgMetaData = imgMetaData[1]
    
    axios.post( "http://localhost:8000/webcamImage", {"image": splitImgMetaData}) 
    .then(r => console.log(r.status))
    .catch(e => console.log(e)); 
    console.log(splitImgMetaData) 
  }

    return (
      <div className="Container">
        {image === null ? (
          <>
            <Webcam
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
              audio={false}
              height={192}
              width={192}
              ref={webcamRef}
              mirrored={true}
            />
            <button onClick={capture}>Capture photo</button>
          </>
        ) : (
          <>
            <img src={image} alt="screenshot" />
            <button onClick={() => setImage(null)}>Recapture</button>
            <button onClick={handleSubmit}>Submit</button>
          </>
        )}
      </div>
    );
  }

export default WebcamFeed;