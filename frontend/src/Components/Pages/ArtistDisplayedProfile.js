import React, {useEffect, useState} from 'react';
import { Grid, Container, IconButton, Typography, Button} from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import DisplayArtworkArtist from '../DisplayArtworksArtist';
import axios from "axios";
import { useParams } from 'react-router-dom';
import DisplayImages from '../DisplayImages';

function ArtistDisplayedProfile({userType, userId}) {

  let { artistId } = useParams(); 
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [artist, setArtist] = useState(null)

    useEffect(() => {
    const getArtworks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/artwork/artist/${artistId}`);
        const artworks = response.data;
        const artworksWithArtists = await Promise.all(artworks.map(async (artwork) => {
          const year = new Date(artwork.date).getFullYear();
          return {
            ...artwork,
            year: year
          };
        }));
        setArtworks(artworksWithArtists)
      } catch (error) {
        console.error("Failed to fetch artworks: ", error);
        throw error;
      }
    };
  
    getArtworks();
  }); 

  useEffect(() => {
    const getArtist = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/artists/${artistId}`);
          const artist = response.data;
           setArtist(artist)
        } catch (error) {
          console.error("Failed to fetch artist: ", error);
          throw error;
        }
      };
    
  
    getArtist();
  }); 


  const handleArtworkClick = (artwork) =>{
    console.log("clicked at ", artwork.artwork_id)
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
  function handleGoBack(){
    console.log("back pressed")
    navigate(`/explore`);
  }

  const handleFollowClick = () => {
    const followEndpoint = `http://localhost:8080/artist/${artist.user_id}/follow`;

    axios.post(followEndpoint, {
      user_id: userId,
      artist_id: artist.user_id,
    })
      .then(response => {
        // Handle the response data if needed
        console.log('Follow response:', response.data);
      })
      .catch(error => {
        console.error('Follow error:', error);
      });
  };
  
  if(artist == null){
    return(
        <Typography>LOADING..</Typography>
    )
  }
  return (
    <Container style={{ overflowX: 'auto', maxWidth: '100%', paddingTop: '20px', paddingBottom:'20px' }}>
    <IconButton
      size="medium"
      aria-label="back"
      style={{ marginBottom: '20px' }}
      onClick={handleGoBack}
    >
      <ArrowBackIcon />
    </IconButton>
    <Typography sx = {{color:"purple"}} variant='h4' component="h2" gutterBottom style={{ fontWeight: 'bold' }}>
      ARTIST {artist.user_name} {artist.user_surname}
    </Typography>
    <Typography variant='subtitle1' gutterBottom>
      Biography: {artist.biography}
    </Typography>
    <Typography variant='subtitle1' gutterBottom>
      Details: {artist.profile_details}
    </Typography>
    <Typography variant='h5' component="h3" gutterBottom style={{ marginTop: '20px', fontWeight: 'bold' }}>
      {artist.user_name} {artist.user_surname}'s Artworks
    </Typography>
    <Grid container spacing={4}>
      {artworks.map((artwork, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <DisplayImages type="artwork" artwork={artwork} func={handleArtworkClick}/>
        </Grid>
      ))}
    </Grid>
    <br />
    <Button variant="contained" color="primary" onClick={handleFollowClick}>
      Follow Artist
    </Button>
  </Container>
  );
}

export default ArtistDisplayedProfile;