import React, { useState }  from 'react';
import {Typography, Container, TextField, Select, MenuItem, Button, Grid, Card, ThemeProvider, createTheme, InputLabel, FormControl, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DatePicker from '../DatePicker'
import dayjs from 'dayjs';

function UploadArtworkPage() {
  const [type, setType] = useState('');
  const [material, setMaterial] = useState('');
  const [movement, setMovement] = useState('');
  const [rarity, setRarity] = useState('');
  const [date, setDate] = useState('');

  const handleTypeSelection = (event) => {
    setType(event.target.value);
  };
  
  const handleMaterialSelection = (event) => {
    setMaterial(event.target.value);
  };
  const handleMovementSelection = (event) => {
    setMovement(event.target.value);
  };
  const handleRaritySelection = (event) => {
    setRarity(event.target.value);
  };
  const handleDateSelection = (date) =>{
    setDate(date);
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: '#302F4D',
      },
      background: {
        default: '#FFFBF5'
      },
      window: {
        default: "#FFFBF5"
      }
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFBF5'
          }
        }
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
        <Container sx={{pt: 5, pb: 2}}>
      <Card variant="outlined" sx={{ marginTop: 2, padding: 2, backgroundColor: theme.palette.window.default, boxShadow: 1}}>
        <Typography variant="h5" gutterBottom>
          Upload Artwork
        </Typography>
       <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Title" variant="outlined" margin="normal" />
            <FormControl fullWidth margin="normal">
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  label="Type"
                  onChange={handleTypeSelection}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Painting">Painting</MenuItem>
                  <MenuItem value="Sculpture">Sculpture</MenuItem>
                  <MenuItem value="Photography">Photography</MenuItem>
                  {/* ...other types */}
                </Select>
              </FormControl>
            <TextField fullWidth label="Size" variant="outlined" margin="normal" />
            <FormControl fullWidth margin="normal">
                <InputLabel id="movement-select-label">Movement</InputLabel>
                <Select
                  labelId="movement-select-label"
                  id="movement-select"
                  value={movement}
                  label="Movement"
                  onChange={handleMovementSelection}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Impressionism">Impressionism</MenuItem>
                  <MenuItem value="Expressionism">Expressionism</MenuItem>
                  <MenuItem value="Cubism">Cubism</MenuItem>
                  <MenuItem value="Surrealism">Surrealism</MenuItem>
                  <MenuItem value="Expressionism">Expressionism</MenuItem>
                  <MenuItem value="Abstract Expressionism">Abstract Expressionism</MenuItem>
                  <MenuItem value="Minimalism">Minimalism</MenuItem>
                  <MenuItem value="Pop Art">Pop Art</MenuItem>
                </Select>
              </FormControl>
            <TextField fullWidth label="Price" variant="outlined" margin="normal" />
            <Grid container spacing={2}>
              <Grid item xs={6}><DatePicker maxDate={dayjs()} /></Grid>
              <Grid item xs={6}><Button sx = {{mt:1, ml: 4, pt: 1.8, pb: 1.8, pl: 4, pr: 7.5}}  variant="outlined" component="span" margin="normal" startIcon={<PhotoCamera />}>
                Choose Image
              </Button></Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Artist Name" variant="outlined" margin="normal" />
            <FormControl fullWidth margin="normal">
                <InputLabel id="material-select-label">Material</InputLabel>
                <Select
                  labelId="material-select-label"
                  id="material-select"
                  value={material}
                  label="material"
                  onChange={handleMaterialSelection}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Bronze">Bronze</MenuItem>
                  <MenuItem value="Gemstones">Gemstones</MenuItem>
                  <MenuItem value="Metal">Metal</MenuItem>
                  <MenuItem value="Glass">Glass</MenuItem>
                  <MenuItem value="Wax">Wax</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="material-select-label">Rarity</InputLabel>
                <Select
                  labelId="rarity-select-label"
                  id="rarity-select"
                  value={rarity}
                  label="rarity"
                  onChange={handleRaritySelection}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Unique">Unique</MenuItem>
                  <MenuItem value="Very Rare">Very Rare</MenuItem>
                  <MenuItem value="Rare">Rare</MenuItem>
                  <MenuItem value="Common">Common</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth label="Description" variant="outlined" margin="normal" multiline rows={4.5} />
              <Button sx =  {{mt: 2}} variant="contained" color="primary">
              Submit Artwork
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
    </ThemeProvider>
  );
}

export default UploadArtworkPage;
