import React, { useState, useEffect } from "react";
import axios from "axios";
import BreedList from "../components/BreedList/breedList";
import { Button } from "@mui/material";

const HistoryPage = () => {
  const [predictions, setPredictions] = useState([]);
  let username = sessionStorage.getItem("username");

  const fetchUserPredictions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/userPredictions`, {
        params: {
          username: username,
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
      <div>
        <Button onClick={sortNewest}>Newest Image</Button>
        <Button onClick={sortOldest}>Oldest Image</Button>
        <BreedList predictions={predictions} />
      </div>
    </>
  );
};

export default HistoryPage;