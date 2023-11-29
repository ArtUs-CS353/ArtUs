import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import Slider from 'react-slick';
import DisplayImages from '../DisplayImages'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { ArtworkData } from '../ArtworkData';
import { ArtistData } from '../ArtistData';


function ExplorePage() {
  const settings = {
    infinite: false,
    speed: 500,
    mr: 2,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true
  };
  const navigate = useNavigate();
  const artworks = ArtworkData;
  const artists = ArtistData;

  function handleArtworkClick(artwork){
    if(artwork.status === "onAuction"){
      //navigate to auction page
      navigate(`/auction`);
    }
    else{
      //navigate to details page
      navigate(`/details/${artwork.artwork_id}`);
    }

  }
  function handleArtistClick(artist){
    console.log("ARTIST CLICKED")
  }
  return (
    <Container>
      <Typography sx = {{mt: 2}} variant="h5" gutterBottom >
          Featured Artworks
        </Typography>
        <Slider {...settings}>
        {artworks.map((artwork, index) => (
           <div key={index}>
            <DisplayImages type = "artwork" artwork={artwork} func = {handleArtworkClick}/>
           </div>
      ))}
       </Slider>
       <Typography sx = {{mt: 5}} variant="h5" gutterBottom >
          Featured Artists
        </Typography>
        <Slider {...settings}>
        {artists.map((artist, index) => (
           <div key={index}>
            <DisplayImages type = "artist" artwork={artist} func = {handleArtistClick}/>
           </div>
      ))}
       </Slider>

        <Typography sx = {{mt: 2}} variant="h5" gutterBottom >
          For You
        </Typography>
        <Grid container spacing={4}>
      {artworks.map((artwork, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
           <DisplayImages type = "artwork" artwork={artwork} func = {handleArtworkClick}/>
        </Grid>
      ))}
    </Grid>

    </Container>
  );
}

export default ExplorePage;
