import React, { useState, useEffect }  from 'react';
import {Typography, Container, TextField, Select, MenuItem, IconButton, Grid, Card, ThemeProvider, createTheme, InputLabel, FormControl, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DatePicker from '../DatePicker'
import dayjs from 'dayjs';
import axios from "axios";
import AWS from 'aws-sdk';
import Popup from '../Popup';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import DisplayImages from '../DisplayImages';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Exhibition() {


  let { id } = useParams();
  const navigate = useNavigate();
  const [artworks , setArtworks] = useState([])
  const [exhibitionTitle, setTitle] = useState('')

  function handleGoBack(){
    console.log("back pressed")
    navigate(`/explore`);
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
    const getExhibition = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/exhibition/exhibitionInfo/${id}`);
        const exhibition = response.data.exhibition_name;
        setTitle(exhibition)
      } catch (error) {
        console.error("Failed to fetch exhibition: ", error);
        throw error;
      }
    };
    getExhibition()
    
  }, []); 


  useEffect(() => {
    const getArtworks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/exhibition/${id}/getAllArtworks/${"approved"}`);
        const artworks = response.data;
        const artworksWithArtists = await Promise.all(artworks.map(async (artwork) => {
          const artist = await getArtist(artwork.artist_id);
          const year = new Date(artwork.date).getFullYear();
          return {
            ...artwork,
            artist: artist.user_name + " " + artist.user_surname,
            year: year
          };
        }));
        console.log("updated list : ", artworksWithArtists)
        setArtworks(artworksWithArtists)
      } catch (error) {
        console.error("Failed to fetch featuring artworks: ", error);
        throw error;
      }
    };
  
    getArtworks();
  }, []); 


  function handleArtworkClick(artwork){
      navigate(`/exhibitionDetails/${id}/${artwork.artwork_id}`);
  }

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
        <IconButton
        size="medium"
        aria-label="back"
        sx={{mt:2}}
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </IconButton>
            <Typography  sx = {{mt: 2}} variant="h4" gutterBottom>Exhibition <span style={{ fontWeight: 'bold' }} >{exhibitionTitle}</span></Typography>
        <Grid container spacing={4}>
      {artworks.map((artwork, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
           <DisplayImages type = "exhibition" artwork={artwork} func = {handleArtworkClick}/>
        </Grid>
         ))}
         </Grid>
    </Container>
    </ThemeProvider>
  );
}

export default Exhibition;