import React, { useState, useEffect } from 'react';
import { ArtworkData } from '../ArtworkData';
import { Grid, Card, CardMedia, Typography, Container, IconButton, TextField, Button, Box , FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Popup from '../Popup';

function DetailsArtistPage({ popup, context }) {
  const artworks = ArtworkData;
  const navigate = useNavigate();
  let { id } = useParams();
  console.log("ID IS HEREEE ", id)
  const [artworkId, setArtworkId] = useState(id)

  console.log("artwork id is ", artworkId)
  const [userDescription, setUserDescription] = useState('');
  const [userPrice, setUserPrice] = useState('');
  const [artwork, setArtwork] = useState(null)
  const [popupEnabled, setPopupEnabled] = useState(false)
  const [selectedExhibition, setExhibition] = useState('')
  const [currentExhibitions, setCurrentExhibitions] = useState([])
  const [exhibitionId, setExhibitionId] = useState(-1)


  function handleGoBack() {
    console.log("back pressed");
    navigate(`/artistProfile`);
  }


  const handleDescriptionChange = (event) => {
    setUserDescription(event.target.value);
  };


    
  const handleExhibitionChange = (event) => {
    const exhibitionName = event.target.value
    console.log("exhibition ", event.target.value)
    if(exhibitionName === "None"){
      console.log("create nex")
      setExhibition('')
      setExhibitionId(-1)
    }
    else{
      setExhibition(exhibitionName)
      const exhibition = currentExhibitions.find(exhibition => (exhibition.exhibition_name) === exhibitionName);
      if (exhibition) {
        setExhibitionId(exhibition.exhibition_id)
      }
    }
    
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

  const handleAddToExhibition = async() => {
    console.log("Add this artwork to exhibition ", {id}.id);
    setPopupEnabled(true)
  };

  const handleDeleteArtwork = () => {
    console.log("Delete artwork ", artworkId );
    handleDelete()
  };
  function handleClose() {
    setPopupEnabled(false)
  }
  const sendRequest = async () =>  {
    console.log("send ", exhibitionId)
    const formData = new FormData();
    formData.append('exhibitionId', exhibitionId); 
    try {
        const response = await axios.post(`http://localhost:8080/artwork/${artworkId}/addToExhibition`, null, {
          params: { exhibitionId: 1 }
        });
        console.log(response.data);
      } catch (error) {
        console.error('Error sending artist request:', error);
      }
    handleClose()
  }

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
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
  
    getArtwork();
  }, []); 

  useEffect(() => {
    const getExhibitions = async () => {
      try {
        
        const response = await axios.get(`http://localhost:8080/exhibition/getAllExhibitions`);
        const exhibitions = response.data;
        console.log("EXHIBITION IS: ", exhibitions)
        setCurrentExhibitions(exhibitions)
      } catch (error) {
        console.error("Failed to fetch exhibition: ", error);
        throw error;
      }
    };
  
    getExhibitions();
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
      {(popupEnabled &&
        <Popup 
        state={popupEnabled}
        isSendDisabled={exhibitionId == -1 ? true :  false}
        handleClose={handleClose} 
        dialogTitle={"Which exhibition do you want to send this piece to?"} 
        textField={ <>
          <FormControl fullWidth margin="normal">
          <InputLabel id="exhibition-select-label">Exhibitions</InputLabel>
          <Select
            labelId="exhibition-select-label"
            id="exhibition-select"
            value={selectedExhibition}
            label="Exhibition"
            onChange={handleExhibitionChange}
          >
             <MenuItem value="None">
                    <em>None</em>
                  </MenuItem>
            {currentExhibitions.map((exhibition, index) => (
            <MenuItem value={exhibition.exhibition_name}>{exhibition.exhibition_name}</MenuItem>))}
          </Select>
        </FormControl>
       
        </>}
        handleRequest={sendRequest}
        > 
        </Popup>)}
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
          {artwork.status === "auction" && (
            <Typography gutterBottom variant="h5" component="div">
              {artwork.remaining + " left"}
            </Typography>
          )}
          <Typography gutterBottom variant="h4" component="div">
            {artwork.title}
          </Typography>
          <Typography sx={{ width: "45%", color: "grey" }} gutterBottom variant="h7" component="div">
            {artwork.material + " " + artwork.type + ", " + artwork.year}<br />
            {artwork.size}<br />
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
          <Button variant="contained" onClick={handleAddToExhibition}>
            Add this artwork to exhibition
          </Button>
          <br />
          <br />
          <Button variant="contained" onClick={handleDeleteArtwork}>
            Delete artwork
          </Button>
          {artwork.status === "auction" && (
            context
          )}
          {artwork.status === "sale" && (
            context
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default DetailsArtistPage;