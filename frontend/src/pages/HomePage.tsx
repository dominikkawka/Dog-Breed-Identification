import React from "react";
import HomeHeader from "../components/HomeHeader/homeHeader";
import HomeStats from "../components/HomeStats/homeStats";
import HomeFAQ from "../components/HomeFAQ/HomeFAQ";

import { Divider } from "@mui/material";


const HomePage = () => {
  return (
   <>
      <div>
      <HomeHeader />
      <Divider />
      <Divider />
      <HomeStats />
      <Divider />
      <Divider />
      <HomeFAQ />
      <Divider />
      <Divider />
      </div>
   </>
  );
};

export default HomePage;