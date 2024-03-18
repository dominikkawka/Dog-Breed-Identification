import React from 'react'
import Box from '@mui/material/Box';
import { Typography, Container } from '@mui/material';


export default function ImageUploadGuide() {
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
                1. Drag your image into the dropbox OR press upload image button and select your .JPG or .PNG
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                2. When your image is uploaded, it should be displayed inside the box. Press the Submit Image button below the dropbox.
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                3. Wait for the progress bar to reach 100%, then press the View Prediction Button
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                4. After you see the prediciton, you can choose to read more about them!
            </Typography>
        </Container>
      </Box>
    )
}