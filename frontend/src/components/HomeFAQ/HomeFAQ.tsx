import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DogBreedsList from '../DogBreedsList/dogBreedsList';

export default function HomeFAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% ',
        backgroundRepeat: 'no-repeat',
      })}
    >
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How does the Dog Breed Identifier Work?
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'block' }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '100%' } }}
            >
                The Dog Breed Identifier uses a custom machine learning algorithm to tell the differences between dog breeds. Over 21,000+ Images of 122 dog breeds have been used to train this model. The model takes the distinct characteristics of each dog into consideration, analysing different features such as coat texture, ear shape, size of their muzzle etc.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle2">
              How accurate is the model?
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'block' }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '100%' } }}
            >
              As the model only takes physical characteristics into consideration, this dog breed model won't be as accurate as a DNA test. For mixed breeds especially, the accuracy of the model lower.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3d-content"
            id="panel3d-header"
          >
            <Typography component="h3" variant="subtitle2">
              Which dog breeds are included in this Identifier?
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'block' }}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '100%' } }}
            >
              There are 122 identifiable dog breeds for this model. Here is a list of all breeds.
              <DogBreedsList/>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2">
              There is something wrong with the product.
            </Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'block'}}>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: '100%', md: '100%' } }}
            >
              If there is something wrong with this application, please message me on X (Twitter) or on LinkedIn. The links are in the footer.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
    </Box>
  );
}