import React from "react";
import BreedCard from "../BreedCard/breedCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

interface Prediction {
  _id: { $oid: string };
  predictedBreed: string;
  confidence: string;
  actualBreed: string;
  image: string;
  imageFile: string;
  username: string;
  date: string;
}

interface BreedListProps {
  predictions?: Prediction[] | null;
  deletePrediction: (username: string, image: string) => void;
}

const BreedList: React.FC<BreedListProps> = ({ predictions, deletePrediction }) => {
  let breedCards = predictions ? (
    predictions.map((m) => (
        <BreedCard key={m._id} prediction={m} deletePrediction={deletePrediction} />
    ))
  ) : (
    <Grid item xs={12}>
      <Typography>No Cards in History</Typography>
    </Grid>
  );

  return     <Container
  id="stats"
  sx={{
    pt: { xs: 4, sm: 12 },
    pb: { xs: 8, sm: 16 },
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: { xs: 3, sm: 6 },
  }}
><Grid container spacing={3}>{breedCards}</Grid></Container>;
};

export default BreedList;