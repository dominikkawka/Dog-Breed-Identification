import React, { useState, useEffect } from "react";
import axios from "axios";
import BreedList from "../components/BreedList/breedList";
import { Container, Button, Typography } from "@mui/material";

const HistoryPage = () => {
  const [predictions, setPredictions] = useState([]);
  let username = sessionStorage.getItem("username");
  let token = localStorage.getItem("token");

  const fetchUserPredictions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/userPredictions`, {
        params: {
          token: token
        },
      });
      console.log(response.data);
      setPredictions(response.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchUserPredictions();
  }, []);

  const sortNewest = () => {
    const sortedPredictions = [...predictions].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    setPredictions(sortedPredictions);
  };

  const sortOldest = () => {
    const sortedPredictions = [...predictions].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    setPredictions(sortedPredictions);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
      <Typography sx={{ pt: 4, pb: 2}}>You can filter your predictions by:</Typography>
        <Container sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Button onClick={sortNewest} variant="outlined" sx={{mr: 4}}>Newest Image</Button>
          <Button onClick={sortOldest} variant="outlined">Oldest Image</Button>
        </Container>
        <BreedList predictions={predictions} />
      </div>
    </>
  );
};

export default HistoryPage;