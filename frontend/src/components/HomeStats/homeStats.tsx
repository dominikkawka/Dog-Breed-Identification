import React, { useState, useEffect } from "react";
import axios from "axios";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';


export default function HomeStats() {

  const [amount, setAmount] = useState<Number>();
  const [userAmount, setUserAmount] = useState<Number>()

  const fetchAllPredictions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/allPredictions`);
      console.log(response.data);
      setAmount(response.data.length);
    } catch (error) {
      setAmount(301)
    }
  };

  const fetchUserPredictions = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/allUsers`);
      console.log(response.data);
      setUserAmount(response.data.length);
    } catch (error) {
      setUserAmount(301)
    }
  };

  useEffect(() => {
   fetchAllPredictions();
   fetchUserPredictions();
  }, []);

  let userAmountDesc = `Over ${userAmount} Users have registered on this site!`
  let amountDesc = `${amount} Images of dogs have been identified!`

  const stats = [
    {
      title: 'Total Users',
      total: userAmount,
      description: [
        userAmountDesc,
      ],
    },
    {
      title: 'Dog Breeds',
      subheader: 'Recommended',
      total: '122',
      description: [
        'This model can tell apart 122 total breeds!',
      ],
    },
    {
      title: 'Total Dogs Identified',
      total: amount,
      description: [
        amountDesc,
      ],
    },
  ];

  return (
    <Container
      id="stats"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.45)), url("https://www.barkingmad.uk.com/wp-content/uploads/2023/09/iStock-1252455620-768x513.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100% auto',
      }}
    >
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        {stats.map((stat) => (
          <Grid
            item
            key={stat.title}
            xs={12}
            md={4}
          >
            <Card
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                border: stat.title === 'Dog Breeds' ? '1px solid' : undefined,
                borderColor:
                  stat.title === 'Dog Breeds' ? 'primary.main' : undefined,
                background:
                  stat.title === 'Dog Breeds'
                    ? 'linear-gradient(#033363, #021F3B)'
                    : undefined,
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color:
                      stat.title === 'Dog Breeds' ? 'primary.contrastText' : '',
                  }}
                >
                  <Typography component="h3" variant="h6">
                    {stat.title}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'baseline',
                    color:
                      stat.title === 'Dog Breeds'
                        ? 'primary.contrastText'
                        : undefined,
                  }}
                >
                  <Typography component="h3" variant="h2">
                    {stat.total}
                  </Typography>
                  <Typography component="h3" variant="h6">
                    &nbsp; {stat.title}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    my: 2,
                    opacity: 0.2,
                    borderColor: 'grey.500',
                  }}
                />
                {stat.description.map((line) => (
                  <Box
                    key={line}
                    sx={{
                      py: 1,
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'center',
                    }}
                  >
                    <CheckCircleRoundedIcon
                      sx={{
                        width: 20,
                        color:
                          stat.title === 'Dog Breeds'
                            ? 'primary.light'
                            : 'primary.main',
                      }}
                    />
                    <Typography
                      component="text"
                      variant="subtitle2"
                      sx={{
                        color:
                          stat.title === 'Dog Breeds'
                            ? 'primary.contrastText'
                            : undefined,
                      }}
                    >
                      {line}
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}