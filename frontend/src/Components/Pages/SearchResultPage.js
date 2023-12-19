import React, {useEffect, useState} from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLocation } from 'react-router-dom';
import DisplayImages from '../DisplayImages';

function SearchResultPage({userId, userType}) {
  const navigate = useNavigate();
  const [artworkNotFound, setArtworkNotFound] = useState(true)
  const [artistNotFound, setArtistNotFound] = useState(true)
  const [artworks, setArtworks] = useState([])
  const [artists, setArtists] = useState([])
  const location = useLocation();
  const { query } = location.state || {};
  

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
  function handleArtistClick(artist){
    console.log("ARTIST CLICKED ", artist)
    navigate(`/artistDisplayed/${artist.user_id}`)
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
  const getArtistUrl = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/artists/${id}/artwork_url`);
      const url = response.data;
      return url;
    } catch (error) {
      console.error("Failed to fetch artist url: ", error);
      throw error;
    }
  };

  useEffect(() => {
    const getArtists = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/artists/search/${query}`);
          const artists = response.data;
          console.log("artists: ", artists)
          const formattedArtists = await Promise.all(artists.map(async (artist) => {
            const url = await getArtistUrl(artist.user_id);
              return {
                ...artist,
                artist: artist.user_name + " " + artist.user_surname,
                imageURL: url
              };
            }));
          setArtists(formattedArtists)
          if(artists.length != 0){
            setArtistNotFound(false)
        }
        } catch (error) {
          console.error("Failed to fetch artist: ", error);
          throw error;
        }
      };
    getArtists()
  }, []); 



  useEffect(() => {
    const getArtworks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/artwork/title/${query}`);
        const artworks = response.data;
        console.log("ARTWORKS: ", artworks)
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
        console.log("updated list : ", artworksWithArtists)
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
<br></br>
    <Typography sx = {{mt: 2}} variant="h5" gutterBottom >
            Artists
        </Typography>
        {(artistNotFound === true &&
            <Typography>No Artist found for the search...</Typography>
            )}
        <Grid container spacing={4}>
      {artists.map((artwork, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
           <DisplayImages type = "artist" artwork={artwork} func = {handleArtistClick}/>
        </Grid>
      ))}
    </Grid>

    </Container>
  );
}

export default SearchResultPage;
