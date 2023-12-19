import React, {useEffect, useState } from 'react';
import { Grid, Container } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import DisplayArtworksCollector from '../DisplayArtworksCollector';
import axios from "axios";

function CollectorProfilePage({userId}) {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 3,
    dots: true,
    variableWidth: true,
  };
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  
  
    useEffect(() => {
    const getArtworks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/enthusiast/${userId}/artworks`);
        const artworks = response.data;
        console.log("ARTWORKS: ", artworks)
        const artworksWithCollectors = await Promise.all(artworks.map(async (artwork) => {
          const year = new Date(artwork.date).getFullYear();
          return {
            ...artwork,
            year: year
          };
        }));
        console.log("updated list : ", artworksWithCollectors)
        setArtworks(artworksWithCollectors)
      } catch (error) {
        console.error("Failed to fetch artworks: ", error);
        throw error;
      }
    };
  
    getArtworks();
  }, []); 

  const handleArtworkClick = (artwork) =>{
    console.log("HEREEEE")
    console.log("clicked at ", artwork.artwork_id)
    navigate(`/detailsCollector/${artwork.artwork_id}`);
  }
  
  return (
    <Container style={{ overflowX: 'auto', maxWidth: '100%', paddingTop: '20px', paddingBottom:'5px' }}>
      <Grid container spacing={4}>
        {artworks.map((artwork, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DisplayArtworksCollector type="artwork" artwork={artwork} func={handleArtworkClick} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CollectorProfilePage;