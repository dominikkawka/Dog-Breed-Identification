import React, {useState} from 'react'
import axios from 'axios'
//import SelectCorrectBreed from '../SelectCorrectBreed/SelectCorrectBreed'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { uploadImage, getPrediction, patchCorrectBreed } from '../../api/api'
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
  { "breed": "chihuahua" },
  { "breed": "japaneseSpaniel" },
  { "breed": "malteseDog" },
  { "breed": "pekinese" },
  { "breed": "shihtzu" },
  { "breed": "blenheimSpaniel" },
  { "breed": "papillon" },
  { "breed": "toyTerrier" },
  { "breed": "rhodesianRidgeback" },
  { "breed": "afghanHound" },
  { "breed": "basset" },
  { "breed": "beagle" },
  { "breed": "bloodhound" },
  { "breed": "bluetick" },
  { "breed": "blackAndTanCoonhound" },
  { "breed": "walkerHound" },
  { "breed": "englishFoxhound" },
  { "breed": "redbone" },
  { "breed": "borzoi" },
  { "breed": "irishWolfhound" },
  { "breed": "italianGreyhound" },
  { "breed": "whippet" },
  { "breed": "ibizanHound" },
  { "breed": "norwegianElkhound" },
  { "breed": "otterhound" },
  { "breed": "saluki" },
  { "breed": "scottishDeerhound" },
  { "breed": "weimaraner" },
  { "breed": "staffordshireBullTerrier" },
  { "breed": "americanStaffordshireTerrier" },
  { "breed": "bedlingtonTerrier" },
  { "breed": "borderTerrier" },
  { "breed": "kerryBlueTerrier" },
  { "breed": "irishTerrier" },
  { "breed": "norfolkTerrier" },
  { "breed": "norwichTerrier" },
  { "breed": "yorkshireTerrier" },
  { "breed": "wireHairedFoxTerrier" },
  { "breed": "lakelandTerrier" },
  { "breed": "sealyhamTerrier" },
  { "breed": "airedale" },
  { "breed": "cairn" },
  { "breed": "australianTerrier" },
  { "breed": "dandieDinmont" },
  { "breed": "bostonBull" },
  { "breed": "miniatureSchnauzer" },
  { "breed": "giantSchnauzer" },
  { "breed": "standardSchnauzer" },
  { "breed": "scotchTerrier" },
  { "breed": "tibetanTerrier" },
  { "breed": "silkyTerrier" },
  { "breed": "softCoatedWheatenTerrier" },
  { "breed": "westHighlandWhiteTerrier" },
  { "breed": "lhasa" },
  { "breed": "flatCoatedRetriever" },
  { "breed": "curlyCoatedRetriever" },
  { "breed": "goldenRetriever" },
  { "breed": "labradorRetriever" },
  { "breed": "ChesapeakeBayRetriever" },
  { "breed": "germanShortHairedPointer" },
  { "breed": "vizsla" },
  { "breed": "englishSetter" },
  { "breed": "irishSetter" },
  { "breed": "gordonSetter" },
  { "breed": "brittanySpaniel" },
  { "breed": "clumber" },
  { "breed": "englishSpringer" },
  { "breed": "welshSpringerSpaniel" },
  { "breed": "cockerSpaniel" },
  { "breed": "sussexSpainel" },
  { "breed": "irishWaterSpaniel" },
  { "breed": "kuvasz" },
  { "breed": "schipperke" },
  { "breed": "groenendael" },
  { "breed": "malinois" },
  { "breed": "briard" },
  { "breed": "kelpie" },
  { "breed": "komondor" },
  { "breed": "oldEnglishSheepdog" },
  { "breed": "shetlandSheepdog" },
  { "breed": "collie" },
  { "breed": "borderCollie" },
  { "breed": "bouvierDesFlandres" },
  { "breed": "rottweiler" },
  { "breed": "germanShepard" },
  { "breed": "doberman" },
  { "breed": "miniaturePinscher" },
  { "breed": "greaterSwissMountainDog" },
  { "breed": "berneseMountainDog" },
  { "breed": "appenzeller" },
  { "breed": "EntleBucher" },
  { "breed": "boxer" },
  { "breed": "bullMastiff" },
  { "breed": "tibetanMastiff" },
  { "breed": "frenchBulldog" },
  { "breed": "greatDane" },
  { "breed": "saintBernard" },
  { "breed": "eskimoDog" },
  { "breed": "malamute" },
  { "breed": "siberianHusky" },
  { "breed": "affenpinscher" },
  { "breed": "basenji" },
  { "breed": "pug" },
  { "breed": "leonberg" },
  { "breed": "newfoundland" },
  { "breed": "greatPyrenees" },
  { "breed": "samoyed" },
  { "breed": "pomeranian" },
  { "breed": "chow" },
  { "breed": "keeshond" },
  { "breed": "brabanconGriffon" },
  { "breed": "pembroke" },
  { "breed": "cardigan" },
  { "breed": "toyPoodle" },
  { "breed": "miniaturePoodle" },
  { "breed": "standardPoodle" },
  { "breed": "mexicanHairless" },
  { "breed": "dingo" },
  { "breed": "dhole" },
  { "breed": "africanHuntingDog" }
]