import React, {useState, useEffect} from 'react'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, Card, CardMedia, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { uploadImage, getPrediction, patchCorrectBreed, patchUsernameToPrediction } from '../../api/api';
import { useDropzone } from 'react-dropzone';
import LinearProgressBar from '../LinearProgressBar/linearProgressBar';

const filter = createFilterOptions();

export default function DragDropImage() {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [prediction, setPrediction] = useState<string>('');
    const [confidence, setConfidence] = useState<number>(0);
    const [prediction2, setPrediction2] = useState<string>('');
    const [confidence2, setConfidence2] = useState<number>(0);
    const [prediction3, setPrediction3] = useState<string>('');
    const [confidence3, setConfidence3] = useState<number>(0);
    const [uploadError, setUploadError] = useState<string>('')
    const [progressVisible, setProgressVisible] = useState<boolean>(false);
    const [viewPrediction, setViewPrediction] = useState<boolean>(false);
    let username = sessionStorage.getItem("username")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (image == null) {
          setUploadError('Please upload an image')
        } else {
          setUploadError('')
          try {
            setProgressVisible(true)
            const response = await uploadImage(image!);
            if (response) {
              setViewPrediction(true)
            }
          } catch (error) {
            setViewPrediction(true)
          }
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
      setProgressVisible(false)
        try {
          const response = await getPrediction(image.name);
          setPrediction(response.predictedBreed || '');
          setConfidence(parseFloat(response.confidence) || 0);
          setPrediction2(response.secondPredictedBreed || '');
          setConfidence2(parseFloat(response.secondConfidence) || 0);
          setPrediction3(response.thirdPredictedBreed || '');
          setConfidence3(parseFloat(response.thirdConfidence) || 0);
          console.log((confidence + confidence2 + confidence3))
        } catch (error) {
          // Handle error
        }
      };
  
      const saveSubmission = async () => {
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
        const response = await patchCorrectBreed(prediction, image.name, actualBreed);
        if (response) {
        }
      } catch (error) {
        //console.log("prediction: "+ prediction)
        //console.log("image name: "+ image.name)
        //console.log("actualBreed: "+ actualBreed)
      }
    };

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
        {progressVisible && (
          <LinearProgressBar />
        )}
        {viewPrediction && (
          <>
            <Button variant="contained" onClick={handlePredictionResults}>
              View Prediction Results
            </Button>
            <Typography>
              We are {confidence}% sure that the most likely dog breed in this image is a {prediction}!
            </Typography>
            <PieChart
              series={[
                {
                  data: [
                    {value: confidence, label: prediction },
                    {value: confidence2, label: prediction2},
                    {value: confidence3, label: prediction3},
                    {value: (100- (confidence + confidence2 + confidence3)), label: 'other'}
                  ],
                },
              ]}
              width={600}
              height={200}
            >

            </PieChart>
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
      </form>
    </>
  );
}

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