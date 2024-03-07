import React, { useState, useEffect } from "react";
import axios from "axios";
import BreedList from "../components/BreedList/breedList";

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

  return (
    <>
      <div>
        <p>History Page</p>
        <BreedList predictions={predictions} />
      </div>
    </>
  );
};

export default HistoryPage;