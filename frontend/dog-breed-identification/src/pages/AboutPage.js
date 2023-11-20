import React, { useState, useEffect } from "react";
import axios from "axios";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import FooterBar from "../components/FooterBar/FooterBar";

const AboutPage = () => {
  const [amount, setAmount] = useState();

  const fetchAllPredictions = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/allPredictions`);
      console.log(response.data);
      setAmount(response.data.length);
    } catch (error) {
      setAmount("?")
    }
  };

  useEffect(() => {
   fetchAllPredictions();
  }, []);

  return (
    <>
      <NavigationBar />
      <div>
        <p>About Page</p>
        <p>This model has identified {amount} pictures</p>
        <button onClick={fetchAllPredictions}>Refresh Data</button>
      </div>
      <FooterBar />
    </>
  );
};

export default AboutPage;