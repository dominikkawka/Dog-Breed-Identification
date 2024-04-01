import axios from "axios";
import React, {useState, useRef, useCallback} from "react";
import Webcam from "react-webcam";
import { Container } from "@mui/system";
import { Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Box } from "@mui/material";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import LinearProgressBar from '../LinearProgressBar/linearProgressBar';
import { getPrediction, patchUsernameToPrediction, patchCorrectBreed } from "../../api/api";

const filter = createFilterOptions();

function WebcamFeed() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [progressVisible, setProgressVisible] = useState<boolean>(false);
  const [viewPrediction, setViewPrediction] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<string>('');
  const [confidence, setConfidence] = useState<string>('');
  const [imageName, setImageName] = useState<string>('')

  let username = sessionStorage.getItem("username")

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
    try {
      const response = await patchUsernameToPrediction(prediction, imageName, username)
        if (response) {
      }
    } catch (error) {
    }
  }  

  const [value, setValue] = useState<any>(null); 
    const [open, toggleOpen] = React.useState(false);
  
    const handleClose = () => {
      setDialogValue('');
      toggleOpen(false);
    };
  
    const [dialogValue, setDialogValue] = React.useState('');
  
    const handleActualDogBreedSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setValue(dialogValue.breed);
      handleClose();
    };

    const handleSubmitActualBreed = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      let actualBreed = value.breed
      try {
        const response = await patchCorrectBreed(prediction, imageName, actualBreed);
        if (response) {
        }
      } catch (error) {
      }
    };

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
            {username && (
              
              <Box sx={{ width: '33%'}}>
                <Autocomplete 
                  value={value}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                      // timeout to avoid instant validation of the dialog's form.
                      setTimeout(() => {
                        toggleOpen(true);
                        setDialogValue({
                          breed: newValue,
                        });
                      });
                    } else if (newValue && newValue.inputValue) {
                      toggleOpen(true);
                      setDialogValue({
                        breed: newValue.inputValue,
                      });
                    } else {
                      setValue(newValue);
                      console.log('newValue: '+ JSON.stringify(newValue))
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
    
                    if (params.inputValue !== '') {
                      filtered.push({
                        inputValue: params.inputValue,
                        breed: `Add "${params.inputValue}"`,
                      });
                    }
    
                    return filtered;
                  }}
                  id="free-solo-dialog-demo"
                  options={dogBreeds}
                  getOptionLabel={(option) => {
                    // e.g. value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    return option.breed;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  renderOption={(props, option) => <li {...props}>{option.breed}</li>}
                  sx={{ background: "#DBE4EE", justifyContent: 'center !important'}}
                  freeSolo
                  renderInput={(params) => <TextField {...params} label="Select dog breed" />}
                />
                <Dialog open={open} onClose={handleClose}>
                  <form onSubmit={handleActualDogBreedSubmit}>
                    <DialogTitle>Add a new breed</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Did your dogs breed not appear on this list? add it here!
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogValue.breed}
                        onChange={(event) =>
                          setDialogValue({
                            ...dialogValue,
                            breed: event.target.value,
                          })
                        }
                        label="breed"
                        type="text"
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Add</Button>
                    </DialogActions>
                  </form>
                </Dialog>
                <Button variant="contained" onClick={handleSubmitActualBreed}>
                  Submit Actual Breed
                </Button>
                </Box>
                )}
          </>
        )}
        </Container>
        
      </div>
    );
  }

export default WebcamFeed;

const dogBreeds = [
  { "breed": "Chihuahua" },
  { "breed": "Japanese Spaniel" },
  { "breed": "Maltese Dog" },
  { "breed": "Pekingese" },
  { "breed": "Shih Tzu" },
  { "breed": "Blenheim Spaniel" },
  { "breed": "Papillon" },
  { "breed": "Toy Terrier" },
  { "breed": "Rhodesian Ridgeback" },
  { "breed": "Afghan Hound" },
  { "breed": "Basset" },
  { "breed": "Beagle" },
  { "breed": "Bloodhound" },
  { "breed": "Bluetick" },
  { "breed": "Black and Tan Coonhound" },
  { "breed": "Walker Hound" },
  { "breed": "English Foxhound" },
  { "breed": "Redbone" },
  { "breed": "Borzoi" },
  { "breed": "Irish Wolfhound" },
  { "breed": "Italian Greyhound" },
  { "breed": "Whippet" },
  { "breed": "Ibizan Hound" },
  { "breed": "Norwegian Elkhound" },
  { "breed": "Otterhound" },
  { "breed": "Saluki" },
  { "breed": "Scottish Deerhound" },
  { "breed": "Weimaraner" },
  { "breed": "Staffordshire Bull Terrier" },
  { "breed": "American Staffordshire Terrier" },
  { "breed": "Bedlington Terrier" },
  { "breed": "Border Terrier" },
  { "breed": "Kerry Blue Terrier" },
  { "breed": "Irish Terrier" },
  { "breed": "Norfolk Terrier" },
  { "breed": "Norwich Terrier" },
  { "breed": "Yorkshire Terrier" },
  { "breed": "Wire Haired Fox Terrier" },
  { "breed": "Lakeland Terrier" },
  { "breed": "Sealyham Terrier" },
  { "breed": "Airedale" },
  { "breed": "Cairn" },
  { "breed": "Australian Terrier" },
  { "breed": "Dandie Dinmont" },
  { "breed": "Boston Bull" },
  { "breed": "Miniature Schnauzer" },
  { "breed": "Giant Schnauzer" },
  { "breed": "Standard Schnauzer" },
  { "breed": "Scotch Terrier" },
  { "breed": "Tibetan Terrier" },
  { "breed": "Silky Terrier" },
  { "breed": "Soft Coated Wheaten Terrier" },
  { "breed": "West Highland White Terrier" },
  { "breed": "Lhasa" },
  { "breed": "Flat Coated Retriever" },
  { "breed": "Curly Coated Retriever" },
  { "breed": "Golden Retriever" },
  { "breed": "Labrador Retriever" },
  { "breed": "Chesapeake Bay Retriever" },
  { "breed": "German Short Haired Pointer" },
  { "breed": "Vizsla" },
  { "breed": "English Setter" },
  { "breed": "Irish Setter" },
  { "breed": "Gordon Setter" },
  { "breed": "Brittany Spaniel" },
  { "breed": "Clumber" },
  { "breed": "English Springer" },
  { "breed": "Welsh Springer Spaniel" },
  { "breed": "Cocker Spaniel" },
  { "breed": "Sussex Spaniel" },
  { "breed": "Irish Water Spaniel" },
  { "breed": "Kuvasz" },
  { "breed": "Schipperke" },
  { "breed": "Groenendael" },
  { "breed": "Malinois" },
  { "breed": "Briard" },
  { "breed": "Kelpie" },
  { "breed": "Komondor" },
  { "breed": "Old English Sheepdog" },
  { "breed": "Shetland Sheepdog" },
  { "breed": "Collie" },
  { "breed": "Border Collie" },
  { "breed": "Bouvier Des Flandres" },
  { "breed": "Rottweiler" },
  { "breed": "German Shepherd" },
  { "breed": "Doberman" },
  { "breed": "Miniature Pinscher" },
  { "breed": "Greater Swiss Mountain Dog" },
  { "breed": "Bernese Mountain Dog" },
  { "breed": "Appenzeller" },
  { "breed": "Entlebucher" },
  { "breed": "Boxer" },
  { "breed": "Bull Mastiff" },
  { "breed": "Tibetan Mastiff" },
  { "breed": "French Bulldog" },
  { "breed": "Great Dane" },
  { "breed": "Saint Bernard" },
  { "breed": "Eskimo Dog" },
  { "breed": "Malamute" },
  { "breed": "Siberian Husky" },
  { "breed": "Affenpinscher" },
  { "breed": "Basenji" },
  { "breed": "Pug" },
  { "breed": "Leonberg" },
  { "breed": "Newfoundland" },
  { "breed": "Great Pyrenees" },
  { "breed": "Samoyed" },
  { "breed": "Pomeranian" },
  { "breed": "Chow" },
  { "breed": "Keeshond" },
  { "breed": "Brabancon Griffon" },
  { "breed": "Pembroke" },
  { "breed": "Cardigan" },
  { "breed": "Toy Poodle" },
  { "breed": "Miniature Poodle" },
  { "breed": "Standard Poodle" },
  { "breed": "Mexican Hairless" },
  { "breed": "Dingo" },
  { "breed": "Dhole" },
  { "breed": "African Hunting Dog" },
  { "breed": "Shiba Inu" },
  { "breed": "Dalmatian" },
]