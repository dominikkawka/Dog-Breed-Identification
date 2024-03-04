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
                1. Lorem Ipsum
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                2. Lorem Ipsum
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                3. Lorem Ipsum
            </Typography>
            <Typography sx={{width: { sm: '100%', md: '85%' }}}>
                4. Lorem Ipsum
            </Typography>
        </Container>
      </Box>
    )
}