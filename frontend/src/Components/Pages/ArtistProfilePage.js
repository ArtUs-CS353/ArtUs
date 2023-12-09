import React from 'react';
import { Grid, Container } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { ArtworkData } from '../ArtworkData';
import DisplayArtworkArtist from '../DisplayArtworksArtist';

function ArtistProfilePage() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 3,
    dots: true,
    variableWidth: true,
  };
  const navigate = useNavigate();
  const artworks = ArtworkData;

  function handleArtworkClick(artwork) {
    navigate(`/detailsArtist/${artwork.artwork_id}`);
  }

  return (
    <Container style={{ overflowX: 'auto', maxWidth: '100%', paddingTop: '20px', paddingBottom:'5px' }}>
      <Grid container spacing={4}>
        {artworks.map((artwork, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DisplayArtworkArtist type="artwork" artwork={artwork} func={handleArtworkClick} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ArtistProfilePage;