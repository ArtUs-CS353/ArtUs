import React, { useState, useEffect } from 'react';
import { ArtworkData } from '../ArtworkData';
import { Grid, Card, CardMedia, Typography, Container, IconButton, TextField, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function DetailsArtistPage({ popup, context }) {
  const artworks = ArtworkData;
  const navigate = useNavigate();
  let { id } = useParams();
  const [userDescription, setUserDescription] = useState('');
  const [userPrice, setUserPrice] = useState('');

  var isFound = false;
  var i = 0;
  for (; i < artworks.length && isFound === false; i++) {
    if (artworks[i].artwork_id == id) {
      isFound = true;
    }
  }

  function handleGoBack() {
    console.log("back pressed");
    navigate(`/artistProfile`);
  }

  i = i - 1;
  console.log("isFound at ", i);

  useEffect(() => {
    setUserDescription(artworks[i].description || '');
    setUserPrice(artworks[i].price || '');
  }, [artworks, i]);

  const handleDescriptionChange = (event) => {
    setUserDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setUserPrice(event.target.value);
  };

  const handleSaveDescription = () => {
    artworks[i].description = userDescription;
    console.log("Updated ArtworkData:", artworks);
  };

  const handleSavePrice = () => {
    artworks[i].price = userPrice;
    console.log("Updated ArtworkData:", artworks);
  };

  const handleAddToExhibition = () => {
    console.log("Add this artwork to exhibition");
  };

  const handleDeleteArtwork = () => {
    console.log("Delete artwork");
  };

  return (
    <Container>
      <IconButton
        size="medium"
        aria-label="back"
        sx={{ mt: 2 }}
        onClick={handleGoBack}
      >
        <ArrowBackIcon></ArrowBackIcon>
      </IconButton>
      <Grid container spacing={3} sx={{ mt: 1, ml: 8 }}>
        <Grid item xs={12} sx={{ boxShadow: "#2C3333", pb: 2, borderRadius: 7 }} md={6}>
          <Card sx={{ mr: 2 }}>
            <CardMedia
              component="img"
              height="550"
              image={artworks[i].image}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ pl: 5 }} md={6}>
          {artworks[i].status === "onAuction" && (
            <Typography gutterBottom variant="h5" component="div">
              {artworks[i].remaining + " left"}
            </Typography>
          )}
          <Typography gutterBottom variant="h4" component="div">
            {artworks[i].title}
          </Typography>
          <Typography sx={{ width: "45%", color: "grey" }} gutterBottom variant="h7" component="div">
            {artworks[i].material + " " + artworks[i].type + ", " + artworks[i].year}<br />
            {artworks[i].size}<br />
          </Typography>
          <TextField
            id="userDescription"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={userDescription}
            onChange={handleDescriptionChange}
            style={{ width: "90%", marginTop: 80, marginBottom: 4 }}
          />
          <Button variant="contained" onClick={handleSaveDescription}>
            Save Description
          </Button>
          <Box borderBottom={1} mt={1} mb={2}></Box>
          <Typography sx={{ width: "80%", color: "grey" }} gutterBottom variant="h7" component="div">
            <span style={{ marginRight: '5px' }}></span>
            <TextField
              id="userPrice"
              value={userPrice}
              onChange={handlePriceChange}
              style={{ width: "90px", marginRight: '5px' }}
            />
            <Button variant="contained" onClick={handleSavePrice}>
              Change Price
            </Button>
          </Typography>
          <br />
          <Button variant="contained" onClick={handleAddToExhibition}>
            Add this artwork to exhibition
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={handleDeleteArtwork}>
            Delete artwork
          </Button>
          {artworks[i].status === "onAuction" && (
            context
          )}
          {artworks[i].status === "onSale" && (
            context
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default DetailsArtistPage;