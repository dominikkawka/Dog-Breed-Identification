import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { Card, CardContent, CardHeader, Container, Grid, Typography, Rating } from "@mui/material";
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
        background: 'white'
      }}>
        {description ? (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <img alt={description.BreedName} src={description.Image} width={256} height={256}></img>
            </Grid>
            <Grid item xs={9}>
            <Card>
              <CardHeader title={description.BreedName} />
              <CardContent>
                <Typography>
                  {description.Description}
                </Typography>
              </CardContent>
            </Card>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Energy: <Rating name="read-only" value={description.Energy} readOnly /></Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Life Expectancy: {description.LifeExpectancyLow} - {description.LifeExpectancyHigh} years</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Height: {description.Height}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Weight: {description.Weight}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Social with Dogs: <Rating name="read-only" value={description.SocialWithDogs}/> </Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Social with People: <Rating name="read-only" value={description.SocialWithPeople} readOnly /></Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Social with Children: <Rating name="read-only" value={description.SocialWithChildren} readOnly /></Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Training: <Rating name="read-only" value={description.Training} readOnly /></Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
              <Typography>Attention Needed: <Rating name="read-only" value={description.AttentionNeeded} readOnly /></Typography>
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