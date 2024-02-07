import React, { useState, useEffect } from "react";
import axios from "axios";

const HistoryPage = () => {
  const [list, setList] = useState("");
  let username = sessionStorage.getItem("username")

  const fetchUserPredictions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/userPredictions` , {
        params: {
          username: username,
      }})
      console.log(response.data);
      setList(JSON.stringify(response.data));
    } catch (error) {
      setList("User is not logged in.")
    }
  };

  useEffect(() => {
    fetchUserPredictions();
  }, []);

  return (
    <>
      <div>
        <p>History Page</p>
        <p>{list}</p>
      </div>
    </>
  );
};

export default HistoryPage;