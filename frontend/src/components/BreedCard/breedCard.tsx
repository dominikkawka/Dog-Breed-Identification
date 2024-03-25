import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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

interface BreedCardProps {
  prediction: Prediction;
  deletePrediction: (username: string, image: string) => void; // Function to delete prediction
}

const BreedCard: React.FC<BreedCardProps> = ({ prediction, deletePrediction }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDeletePrediction = () => {
    deletePrediction(prediction.username, prediction.image);
  };

  return (
    <Card
      sx={{
        height: 400,
        width: isMobile ? "90%" : 256,
        padding: 1,
        pb: 2,
        mb: 2,
        ml: 2.75,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        component="img"
        alt="Prediction"
        image={prediction.imageFile}
        sx={{ height: 192, width: "100%" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" color="textSecondary" component="p">
          {prediction.predictedBreed}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {prediction.confidence}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {prediction.actualBreed}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {prediction.date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={`/description/${prediction.predictedBreed}`}>
          Read More...
        </Button>
        <Button size="small" color="secondary" onClick={handleDeletePrediction}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default BreedCard;