import React, {useEffect, useState} from 'react';
import { ArtworkData } from '../ArtworkData';
import { Grid, Card, CardMedia, Typography, Container, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function DetailsExhibition() {
  const artworks = ArtworkData;
  const [artwork, setArtwork] = useState(null);
  const navigate = useNavigate();
  const { exhibitionId, artworkId } = useParams();
  

  useEffect(() => {
    const getRecommendedArtworks = async () => {
      try {
        console.log("getting with id ", artworkId)
        const response = await axios.get(`http://localhost:8080/artwork/${artworkId}`);
        const artwork = response.data;
        setArtwork(artwork)
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
  
    getRecommendedArtworks();
  }, []); 

  function handleGoBack(){
    console.log("back pressed")
    navigate(`/exhibition/${exhibitionId}`);
  }

  if (!artwork) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }
  return (
    <Container>
      <IconButton
        size="medium"
        aria-label="back"
        sx={{mt:2}}
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </IconButton>
      <Grid container spacing={3} sx={{ mt: 1, ml: 8 }}>
        {artwork && (
          <>
            <Grid item xs={12} sx={{ boxShadow: "#2C3333", pb: 2, borderRadius: 7 }} md={6}>
        <Card sx={{ mr: 2 }}>
          <CardMedia
            component="img"
            height="550"
            image={artwork.imageURL}
            alt={artwork.title}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ pl: 5 }} md={6}>
        <Typography gutterBottom variant="h4" component="div">
          {artwork.title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {artwork.artist}
        </Typography>
        <Typography sx={{ width: "45%", color: "grey" }} gutterBottom variant="h7" component="div">
          {artwork.type}<br />
          {artwork.material}<br />
          {artwork.size}<br />
          {artwork.rarity}<br />
          {artwork.movement}<br />
          <br />
          {artwork.description}<br />
          <br />
        </Typography>

      </Grid>
          </>
        )}
        {!artwork && <p>Loading artwork...</p>}
      </Grid>
    </Container>
  );
}

export default DetailsExhibition;
