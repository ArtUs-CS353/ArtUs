import React from 'react';
import { ArtworkData } from '../ArtworkData';
import { Grid, Card, CardMedia, Typography, Container, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';



function DetailsPage({popup,context}) {
  const artworks = ArtworkData;
  const navigate = useNavigate();
  let { id } = useParams();
  console.log("id is ", id)
  var isFound = false;
  var i = 0;
  for (; i < artworks.length && isFound == false; i++) {
    if (artworks[i].artwork_id == id) {
      isFound = true;
    }
  }
  function handleGoBack(){
    console.log("back pressed")
    navigate(`/explore`);
  }
  i = i - 1;
  console.log("isFound at ", i)
  return (
    <Container>
       <IconButton
            size="medium"
            aria-label="back"
            sx = {{mt:2}}
            onClick={handleGoBack}
          >
            <ArrowBackIcon ></ArrowBackIcon>
          </IconButton>
       <Grid container spacing={3} sx={{ mt: 1, ml: 8 }}>
      <Grid item xs={12} sx={{ boxShadow: "#2C3333", pb: 2, borderRadius: 7 }} md={6}>
        <Card sx={{ mr: 2 }}>
          <CardMedia
            component="img"
            height="550"
            image={artworks[i].image}
            alt={artworks[i].title}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ pl: 5 }} md={6}>
        {/* if the artwork is on auction */}
        {artworks[i].status == "onAuction" && (
          <Typography gutterBottom variant="h5" component="div">
            {artworks[i].remaining + " left"}
          </Typography>
        )}
        {popup}
        <Typography gutterBottom variant="h4" component="div">
          {artworks[i].title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {artworks[i].artist}
        </Typography>
        <Typography sx={{ width: "45%", color: "grey" }} gutterBottom variant="h7" component="div">
          {artworks[i].type}<br />
          {artworks[i].material}<br />
          {artworks[i].size}<br />
          {artworks[i].rarity}<br />
          {artworks[i].movement}<br />
          <br />
          {artworks[i].description}<br />
          <br />
        </Typography>
        {artworks[i].status == "onAuction" && (
          context
        )}
        {artworks[i].status == "onSale" && (
          context
        )}
      </Grid>
    </Grid>

    </Container>
  );
}

export default DetailsPage;
