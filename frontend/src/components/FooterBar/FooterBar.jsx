import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const goToGithub = () => {
  window.open('https://github.com/dominikkawka/Dog-Breed-Identification', '_blank')
}

const goToLinkedIn = () => {
  window.open('https://www.linkedin.com/in/dominik-kawka/', '_blank')
}

const goToTwitter = () => {
  window.open('https://twitter.com/dominik_kawka', '_blank')
}

function FooterBar() {
  return (
    <>
    <footer style={{position: "fixed", bottom:0, width: '100%', background: "#004385", color: "#DBE4EE"}}>
        <Container maxHeight="xl" sx={{ m: 2 }}>
            <Grid container spacing={0}>
              <Grid item>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <GitHubIcon sx={{ paddingRight: 4}} color='#DBE4EE' fontSize="large" onClick={goToGithub}/>
                  <LinkedInIcon sx={{ paddingRight: 4}} color='#DBE4EE' fontSize="large" onClick={goToLinkedIn}/>
                  <TwitterIcon sx={{ paddingRight: 4}} color='#DBE4EE' fontSize="large" onClick={goToTwitter}/>
                </Box>
              </Grid>
            </Grid>
        </Container>
    </footer>
    </>
  ); 
}
export default FooterBar;