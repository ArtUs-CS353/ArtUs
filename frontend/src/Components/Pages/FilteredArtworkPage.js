import React, {useEffect, useState} from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import DisplayImages from '../DisplayImages';

function FilteredArtworkPage({userId, userType}) {
  const navigate = useNavigate();
  const [artworkNotFound, setArtworkNotFound] = useState(true)
  const [artworks, setArtworks] = useState([])
  const location = useLocation();
  const filters = location.state || {};

  // Extracting individual filters
  const { types, materials, rarity, status, start_date, end_date, max_price, min_price, sortByPrice } = filters;

  

  function handleArtworkClick(artwork){
    console.log("artwork clicked ", artwork)
    if(userType == 2 ){
        navigate(`/details/${artwork.artwork_id}`);
      }
    else if (artwork.status === "auction"){
      //navigate to auction page
      console.log("GOING TO AUCTION PAGE")
      navigate(`/auction/${artwork.artwork_id}`);
    }
    else if (artwork.status === "sale") {
      //navigate to buy page
      console.log("GOING TO BUY PAGE")
      navigate(`/buy/${artwork.artwork_id}`);
    }
    else{
      //navigate to details page
      navigate(`/details/${artwork.artwork_id}`);
    }

  }
  
  const getArtist = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/artists/${id}`);
      const artist = response.data;
      return artist;
    } catch (error) {
      console.error("Failed to fetch artist: ", error);
      throw error;
    }
  };

  useEffect(() => {
    const getArtworks = async () => {
        const getArtworks = async () => {
            const params = new URLSearchParams();
        
            if (materials.length > 0) params.append('material', materials.join(','));
            if (types.length > 0) params.append('types', types.join(','));
            if (rarity.length > 0) params.append('rarity', rarity.join(','));
            if (status.length > 0) params.append('status', status.join(','));
        
            if (start_date) params.append('start_date', start_date);
            if (end_date) params.append('end_date', end_date);
        
            if (min_price != null) params.append('min_price', min_price);
            if (max_price != null) params.append('max_price', max_price);

            if (sortByPrice != null) params.append('is_desc', sortByPrice);
            
        
            try {
                const response = await axios.get(`http://localhost:8080/artwork/filter`, { params });
                const artworks = response.data;
                console.log("ARTWORK FILTERED ", artworks)
                const artworksWithArtists = await Promise.all(artworks.map(async (artwork) => {
                    const artist = await getArtist(artwork.artist_id);
                    const year = new Date(artwork.date).getFullYear();
                    console.log("year: ", year)
                    return {
                      ...artwork,
                      artist: artist.user_name + " " + artist.user_surname,
                      year: year
                    };
                  }));
                  setArtworks(artworksWithArtists)
                  if(artworks.length != 0){
                    setArtworkNotFound(false)
                }
            } catch (error) {
                console.error("Failed to fetch recommended artwork: ", error);
                throw error;
            }
        };
        
        getArtworks();
        
    }

  
    getArtworks();
  }, []); 

  return (
    <Container>
        <Typography sx = {{mt: 2}} variant="h5" gutterBottom >
            Artworks
        </Typography>
        {(artworkNotFound === true &&
            <Typography>No Artwork found for the search...</Typography>
            )}
        <Grid container spacing={4}>
      {artworks.map((artwork, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
           <DisplayImages type = "artwork" artwork={artwork} func = {handleArtworkClick}/>
        </Grid>
      ))}
    </Grid>

<br></br>
    </Container>
  );
}

export default FilteredArtworkPage;
