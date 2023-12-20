import React, { useState, useEffect } from 'react';
import { ArtworkData } from '../ArtworkData';
import { Grid, Card, CardMedia, Typography, Container, IconButton, TextField, Button, Box , FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function DetailsCollectorPage({ context }) {
  const artworks = ArtworkData;
  const navigate = useNavigate();
  let { id } = useParams();
  console.log("ID IS HEREEE ", id)
  const [artworkId, setArtworkId] = useState(id)

  console.log("artwork id is ", artworkId)
  const [userDescription, setUserDescription] = useState('');
  const [userPrice, setUserPrice] = useState('');
  const [artwork, setArtwork] = useState(null)
  const [artist, setArtist] = useState(null)

  function handleGoBack() {
    console.log("back pressed");
    navigate(`/collectorProfile`);
  }

  const handleDescriptionChange = (event) => {
    setUserDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setUserPrice(event.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/artwork/delete/${artworkId}`)
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  }

  const handleUpdate = async (title,type,size,movement,price,description,material,rarity,imageURL,date,availability) => {
    const formData = new FormData();
    formData.append('title', title); 
    formData.append('type', type);
    formData.append('size', size); 
    formData.append('movement', movement); 
    formData.append('price', price); 
    formData.append('description', description); 
    formData.append('material', material); 
    formData.append('rarity', rarity); 
    formData.append('imageURL', imageURL); 
    formData.append('date', date); 
    formData.append('availability', availability); 
    try {
        const response = await axios.post(`http://localhost:8080/artwork/update/${artworkId}`, formData)
        console.log(response.data);
      } catch (error) {
        console.error('Error sending update artwork request:', error);
      }
  }
  const handleSaveDescription = () => {
    console.log("Updated ArtworkData:", userDescription);
    handleUpdate( artwork.title, 
                  artwork.type, 
                  artwork.size, 
                  artwork.movement, 
                  artwork.price,
                  userDescription, 
                  artwork.material, 
                  artwork.rarity, 
                  artwork.imageURL, 
                  artwork.date, 
                  artwork.availability)
  };

  const handleSavePrice = () => {
    console.log("Updated ArtworkData:", userPrice);
    handleUpdate( artwork.title, 
      artwork.type,
      artwork.size, 
      artwork.movement, 
      userPrice,
      artwork.description, 
      artwork.material, 
      artwork.rarity, 
      artwork.imageURL, 
      artwork.date, 
      artwork.availability)
  };

  const handleDeleteArtwork = () => {
    console.log("Delete artwork ", artworkId );
    handleDelete()
  };

    useEffect(() => {
    const getArtwork = async () => {
      try {

        console.log("getting with id ", id)
        
        const response = await axios.get(`http://localhost:8080/artwork/${artworkId}`);
        const artwork = response.data;
        console.log("ARTWORK IS: ", artwork, " ", artwork.status)
        setArtwork(artwork)
        setUserDescription(artwork.description || '');
        setUserPrice(artwork.price || '');

        const artistResponse = await axios.get(`http://localhost:8080/artists/${artwork.artist_id}`);
        const artistDetails = artistResponse.data;
        setArtist(artistDetails);
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
  
    getArtwork();
  }, []); 

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
        sx={{ mt: 2 }}
        onClick={handleGoBack}
      >
        <ArrowBackIcon></ArrowBackIcon>
      </IconButton>
      <Grid container spacing={3} sx={{ mt: 1, ml: 8 }}>
        <Grid item xs={12} sx={{ boxShadow: "#2C3333", pb: 2, borderRadius: 7 }} md={6}>
          <Card sx={{ mr: 2 }}>
            <CardMedia
              component="img"
              height="550"
              image={artwork.imageURL}
            />
          </Card>
        </Grid>
        <Grid item xs={12} sx={{ pl: 5 }} md={6}>
          <Typography gutterBottom variant="h4" component="div">
            {artwork.title}
          </Typography>
          <Typography sx={{ width: "45%", color: "grey" }} gutterBottom variant="h7" component="div">
            {artist && (
              <>
                {artist.user_name + " " + artist.user_surname}<br />
                <br />
                {artwork.material + " " + artwork.type + ", " + artwork.year}<br />
                <br />
                {artwork.size}<br />
              </>
            )}
          </Typography>
          <TextField
            id="userDescription"
            label="Description"
            multiline
            rows={4}
            fullWidth
            value={userDescription}
            onChange={handleDescriptionChange}
            style={{ width: "90%", marginTop: 80, marginBottom: 4 }}
          />
          <Button variant="contained" onClick={handleSaveDescription}>
            Save Description
          </Button>
          <Box borderBottom={1} mt={1} mb={2}></Box>
          <Typography sx={{ width: "80%", color: "grey" }} gutterBottom variant="h7" component="div">
            <span style={{ marginRight: '5px' }}></span>
            <TextField
              id="userPrice"
              value={userPrice}
              onChange={handlePriceChange}
              style={{ width: "90px", marginRight: '5px' }}
            />
            <Button variant="contained" onClick={handleSavePrice}>
              Change Price
            </Button>
          </Typography>
          <br />
          <br />
          <br />
          <Button variant="contained" onClick={handleDeleteArtwork} style={{ marginBottom: '16px' }}>
            Delete artwork
          </Button>
          {artwork.status === "sale" && (
            context
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default DetailsCollectorPage;