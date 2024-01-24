import React, {useState} from 'react'
import axios from 'axios'
//import SelectCorrectBreed from '../SelectCorrectBreed/SelectCorrectBreed'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { uploadImage, getPrediction, patchCorrectBreed, patchUsernameToPrediction } from '../../api/api'
import { Button, Typography, Card, CardContent, CardMedia, Box , TextField} from '@mui/material';
import './imageAnimation.css';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const filter = createFilterOptions();

function FileForm() { 
   const [image, setImage] = useState(null)
   const [imagePreview, setImagePreview] = useState(null)
   const [prediction, setPrediction]= useState('')   
   const [confidence, setConfidence]= useState('')
   

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
      let actualBreed = value.breed
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

    const saveSubmission = async () => {
      let username = sessionStorage.getItem("username")
      try {
        const response = await patchUsernameToPrediction(prediction, image.name, username)
        if (response) {
        }
      } catch (error) {
      }
    }

    const [value, setValue] = React.useState(''); 
    const [open, toggleOpen] = React.useState(false);
  
    const handleClose = () => {
      setDialogValue('');
      toggleOpen(false);
    };
  
    const [dialogValue, setDialogValue] = React.useState('');
  
    const handleActualDogBreedSubmit = (event) => {
      event.preventDefault();
      setValue(dialogValue.breed);
      handleClose();
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
        <br />
        <Button variant="contained" onClick={saveSubmission}>
          Save Submission to History
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

        <Box >
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
      </Box>

        <Button variant="contained" onClick={handleSubmitActualBreed}>
          Submit Actual Breed
        </Button>
      </>
    );
  }

export default FileForm

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
  { "breed": "Leonberger" },
  { "breed": "Briard" },
  { "breed": "Affenpinscher" },
]