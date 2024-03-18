import React from 'react'
import Box from '@mui/material/Box';
import { Typography, Container } from '@mui/material';


export default function WebcamUploadGuide() {
    return(
        <Box
        sx={(theme) => ({
            width: '100%',
            backgroundImage:
            theme.palette.mode === 'light'
                ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                : 'linear-gradient(#02294F, #090E10)',
            backgroundSize: '100% ',
            backgroundRepeat: 'no-repeat',
        })}>
        <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 4, sm: 4 },
            pb: { xs: 4, sm: 4 },
        }}>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                1. Allow the page to get access to your webcam.
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                2. Inside the box, you can see a live feed of your camera. Press capture photo to take a photo of your dog.
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                3. If not satisfied with the photo, you can choose to retry. Otherwise, you can press the Submit Button.
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                4. Wait for the progress bar to reach 100%, then press the View Prediction Button
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                5. After you see the prediciton, you can choose to read more about them!
            </Typography>
        </Container>
      </Box>
    )
}