import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutPage = () => {
  const [amount, setAmount] = useState();
  const [userAmount, setUserAmount] = useState()

  const fetchAllPredictions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/allPredictions`);
      console.log(response.data);
      setAmount(response.data.length);
    } catch (error) {
      setAmount("?")
    }
  };

  const fetchUserPredictions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/allUsers`);
      console.log(response.data);
      setUserAmount(response.data.length);
    } catch (error) {
      setUserAmount("?")
    }
  };

  useEffect(() => {
   fetchAllPredictions();
   fetchUserPredictions();
  }, []);

  return (
    <>
      <div>
        <p>About Page</p>
        <p>This model has identified {amount} pictures</p>
        <p>This app has {userAmount} users</p>
        <button onClick={fetchAllPredictions}>Refresh Data</button>
      </div>
    </>
  );
};

export default AboutPage;