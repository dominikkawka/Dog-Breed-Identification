import React from "react";
import BreedCard from "../BreedCard/breedCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface Prediction {
  _id: { $oid: string };
  predictedBreed: string;
  confidence: string;
  actualBreed: string;
  image: string;
  username: string;
}

interface BreedListProps {
  predictions?: Prediction[] | null;
}

const BreedList: React.FC<BreedListProps> = ({ predictions }) => {
  let breedCards = predictions ? (
    predictions.map((m) => (
      <Grid key={m._id} item xs={12} sm={6} md={4} lg={3} xl={2}>
        <BreedCard key={m._id} prediction={m} />
      </Grid>
    ))
  ) : (
    <Grid item xs={12}>
      <Typography>No Cards in History</Typography>
    </Grid>
  );

  return <Grid container>{breedCards}</Grid>;
};

export default BreedList;