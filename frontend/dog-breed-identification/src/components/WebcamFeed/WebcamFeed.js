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

   
    //https://github.com/axios/axios/issues/4034
    //https://stackoverflow.com/questions/50836366/error-in-console-of-axios
    //http://localhost:8000/webcamImage
    //https://stackoverflow.com/questions/73701378/object-msg-field-required-type-value-error-missing-loc-even-whe
  const handleSubmit = async () => {
    
    imgMetaData = image.split(",")
    splitImgMetaData = imgMetaData[1]
    
    axios.post( "http://localhost:8000/webcamImage", splitImgMetaData) 
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