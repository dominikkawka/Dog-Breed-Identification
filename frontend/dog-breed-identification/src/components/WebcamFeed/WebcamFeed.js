import axios from "axios";
import React, {useState, useRef, useCallback} from "react";
import Webcam from "react-webcam";

// https://javascript.plainenglish.io/image-and-video-capturing-with-react-webcam-f4ea36ed4080
// https://blog.logrocket.com/using-react-webcam-capture-display-images/
// https://medium.com/@razibul.ahmed/a-quick-and-dirty-primer-on-using-react-webcam-d3e65faa1a3


function WebcamFeed() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  let imageSrc = ''
 
  const capture = useCallback(() => {
    imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    //console.log(imageSrc) //image is in base64 string... how can I convert this to jpeg so that it can be accepted by the model
   }, [webcamRef]);
 
   const videoConstraints = {
    width: 192,
    height: 192,
    facingMode: "user",
   };

  const handleSubmit = async () => {
    console.log(image)
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
            <button onClick={(console.log(webcamRef))}>log</button>
          </>
        )}
      </div>
    );
  }

export default WebcamFeed