import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { Card, CardContent, CardHeader, Container, Grid, Typography, Rating, CardMedia } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import CakeIcon from '@mui/icons-material/Cake';
import HeightIcon from '@mui/icons-material/Height';
import ScaleIcon from '@mui/icons-material/Scale';
import axios from "axios";

interface DogBreedDescription {
  BreedName: string;
  Description: string;
  Image: string;
  LifeExpectancyLow: number;
  LifeExpectancyHigh: number;
  Height: string;
  Weight: string;
  SocialWithDogs: number;
  SocialWithPeople: number;
  SocialWithChildren: number;
  Training: number;
  Energy: number;
  AttentionNeeded: number;
}

const DogDescriptionPage: React.FC = () => {
  const [description, setDescription] = useState<DogBreedDescription | null>(null);
  const { breedName }: { breedName: string } = useParams(); // Get the breed from the URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDescription(breedName);
        setDescription(result);
      } catch (error) {
        console.error('Error fetching description:', error);
      }
    };

    fetchData();
  }, [breedName]);

  const getDescription = async (BreedName: string): Promise<DogBreedDescription> => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/getDescription`, {
        params: {
          dogBreed: BreedName,
        },
      });

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching description:', error);
      throw error;
    }
  };

  return (
    <>
      <div>
      <Container
      id="description"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        mt: { xs: 4, sm: 4 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        background: 'white',
        border: 2
      }}>
        {description ? (
          <Grid container spacing={2}>
            <Grid item sx={{
              
            }}
            xs={3}>
              <img alt={description.BreedName} src={description.Image} width={256} height={256}></img>
            </Grid>
            <Grid item xs={9}>
            <Card sx={{
                  background: '#f5f5f5'
                }}>
              <CardHeader title={description.BreedName} />
              <CardContent>
                <Typography>
                  {description.Description}
                </Typography>
              </CardContent>
            </Card>
            </Grid>
            <Grid item xs={4} sx={{ mt: 2, display:"flex" }}>
              <CakeIcon fontSize="large" sx={{ mr: 1 }}/>
              <Typography sx={{ mt: 1 }}>Life Expectancy: </Typography>
              <Typography sx={{ mt: 1 }}>{description.LifeExpectancyLow} - {description.LifeExpectancyHigh} years</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mt: 2, display:"flex" }}>
              <HeightIcon fontSize="large" sx={{ mr: 1 }}/>
              <Typography sx={{ mt: 1 }}>Height: </Typography>
              <Typography sx={{ mt: 1 }}>{description.Height}</Typography>
            </Grid>
            <Grid item xs={4} sx={{ mt: 2, display:"flex" }}>
              <ScaleIcon fontSize="large" sx={{ mr: 1 }}/>
              <Typography sx={{ mt: 1 }}>Weight: </Typography>
              <Typography sx={{ mt: 1 }}>{description.Weight}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Energy:</Typography>
              <Rating name="read-only" icon={<PetsIcon fontSize="large" />} emptyIcon={<PetsOutlinedIcon fontSize="large" />} value={description.Energy} readOnly />
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Social with Dogs: </Typography>
              <Rating name="read-only" icon={<PetsIcon fontSize="large" />} emptyIcon={<PetsOutlinedIcon fontSize="large" />} value={description.SocialWithDogs}/>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Social with People: </Typography>
              <Rating name="read-only" icon={<PetsIcon fontSize="large" />} emptyIcon={<PetsOutlinedIcon fontSize="large" />} value={description.SocialWithPeople} readOnly />
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Social with Children: </Typography>
              <Rating name="read-only" icon={<PetsIcon fontSize="large" />} emptyIcon={<PetsOutlinedIcon fontSize="large" />} value={description.SocialWithChildren} readOnly />
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Training: </Typography>
              <Rating name="read-only" icon={<PetsIcon fontSize="large" />} emptyIcon={<PetsOutlinedIcon fontSize="large" />} value={description.Training} readOnly />
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Attention Needed: </Typography>
              <Rating name="read-only" icon={<PetsIcon fontSize="large" />} emptyIcon={<PetsOutlinedIcon fontSize="large" />} value={description.AttentionNeeded} readOnly />
            </Grid>
          </Grid>
          ) : (
          <Typography variant="body2" color="textSecondary">
            No description available for this input. If this is an error, please contact me on X, or Twitter
          </Typography>
          )
        }
        </Container>
      </div>
    </>
  );
};

export default DogDescriptionPage;