import React from 'react';
import { ArtworkData } from '../ArtworkData';
import {Grid, Card, CardMedia, Typography, Button} from '@mui/material';
import { useParams } from 'react-router-dom';



function DetailsPage() {

  const artworks = ArtworkData;
  let { id } = useParams();
  console.log("id is ", id)
  var isFound = false;
  var i = 0; 
  for(; i < artworks.length && isFound == false ; i++){
    if(artworks[i].artwork_id == id){
        isFound = true;
    }
  }
  i = i -1;
  console.log("isFound at ", i)
  return (
    <Grid container spacing={3} sx = {{mt: 5, ml: 2}}>
        <Grid item xs={12} sx = {{boxShadow: "#2C3333", pb: 2, borderRadius: 7}} md={6}>
            <Card sx = {{mr:2}}>
                <CardMedia
                    component="img"
                    height="550"
                    image={artworks[i].image}
                    alt={artworks[i].title}
                    />
          </Card>
        </Grid>
        <Grid item xs={12} sx = {{pl: 3}} md={6}>
        <Typography gutterBottom variant="h4" component="div">
            {artworks[i].title}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
            {artworks[i].artist}
        </Typography>
        <Typography sx = {{width: "45%", color: "grey"}} gutterBottom variant="h7" component="div">
            {artworks[i].type}<br />
            {artworks[i].material}<br />
            {artworks[i].size}<br />
            {artworks[i].rarity}<br />
            {artworks[i].movement}<br />
            <br />
            {artworks[i].description}<br />
            <br />
        </Typography>
        {artworks[i].price && (
            <>
            <hr></hr>
            <Typography gutterBottom variant="h4" component="div">
            {artworks[i].price}
           </Typography>
           <Button sx =  {{mt: 2, backgroundColor: "#302F4D", '&:hover': {backgroundColor: "#1e1d30"}, pr: 4, pl: 4}} variant="contained">
              Buy
            </Button>
            </>
        )}
        </Grid>
    </Grid>
  );
}

export default DetailsPage;
