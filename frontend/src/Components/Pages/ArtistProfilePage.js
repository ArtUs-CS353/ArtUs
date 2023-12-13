import React, {useEffect, useState} from 'react';
import { Grid, Container, TextField, Typography, InputLabel, Select, MenuItem} from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import { ArtworkData } from '../ArtworkData';
import DisplayArtworkArtist from '../DisplayArtworksArtist';
import axios from "axios";
import Popup from '../Popup';
import DateAndTimePicker from '../DateTimePicker'
import dayjs from 'dayjs';

function ArtistProfilePage() {
  const settings = {
    infinite: false,
    speed: 500,
    slidesToScroll: 3,
    dots: true,
    variableWidth: true,
  };
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState([]);
  const [auctionPopup, setAuctionPopup] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const [amount,setAmount] = useState(0.0)
  const [artworkId, setId] = useState(-1)
  const handleStartDateSelection = (newDate) =>{
    console.log("geldi date as", newDate )
    setStartDate(newDate);
  };
  const handleEndDateSelection = (newDate) =>{
    console.log("geldi date as", newDate )
    setEndDate(newDate);
  };
  const handleStartingAmountChange = (event) => {
    setAmount(event.target.value)
  }

  const handleAuctionTypeSelection = (event) =>  {
    setType(event.target.value)
  }

  const sendAuctionRequest = async () => {
      if(artworkId == -1){
        return
      }
      console.log("SENDING AUCTION REQUEST...")
      console.log("price: ", amount)
      const formData = new FormData();
      formData.append('type', type);
      formData.append('price', amount);
      formData.append('artworkId', artworkId); 
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      
      try {
        const response = await axios.post('http://localhost:8080/auction/create', formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error creating auction request:', error);
      }
      handleClose()
  }
    useEffect(() => {
    const getArtworks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/artwork/artist/${1}`);
        const artworks = response.data;
        console.log("ARTWORKS: ", artworks)
        const artworksWithArtists = await Promise.all(artworks.map(async (artwork) => {
          const year = new Date(artwork.date).getFullYear();
          return {
            ...artwork,
            year: year
          };
        }));
        console.log("updated list : ", artworksWithArtists)
        setArtworks(artworksWithArtists)
      } catch (error) {
        console.error("Failed to fetch artworks: ", error);
        throw error;
      }
    };
  
    getArtworks();
  }, []); 

  function handleArtworkClick(artwork) {
    navigate(`/detailsArtist/${artwork.artwork_id}`);
  }

  const createAuctionRequest = (index) => {
    console.log("CREATING AUCTION REQUEST ", artworks[index].artwork_id)
    setId(artworks[index].artwork_id)
    setAuctionPopup(true)

  }
  function handleClose() {
    console.log("CLOSE IS SEND")
    setAuctionPopup(false)
  }
  
  return (
    <Container style={{ overflowX: 'auto', maxWidth: '100%', paddingTop: '20px', paddingBottom:'5px' }}>
      <Grid container spacing={4}>
        {(auctionPopup === true &&
          <Popup
          state={auctionPopup}
         handleClose={handleClose}
         handleRequest={sendAuctionRequest} 
         dialogTitle={"Create Auction Request"} 
         textField={
          <>
          <Typography variant="h6" gutterBottom>
          Start Date
        </Typography>
        <DateAndTimePicker handleSelection = {handleStartDateSelection} minDate={dayjs()} />
        <br></br>
        <Typography variant="h6" gutterBottom>
          End Date
        </Typography>
        <DateAndTimePicker handleSelection = {handleEndDateSelection} minDate={dayjs()} />
        <br></br>
        <Typography variant="h6" gutterBottom>
          Auction Type
        </Typography>
              <Select
                sx = {{width: "100%"}}
                labelId="auction-type-label"
                id="type-select"
                value={type}
                label="Type"
                onChange={handleAuctionTypeSelection}
              >
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Silent">Silent</MenuItem>
              </Select>
              <br></br>
              <br></br>

        <Typography variant="h6">
          Staring Amount
        </Typography>
        <TextField onChange={handleStartingAmountChange} fullWidth label="Min Bid" variant="outlined" margin="normal" />
         </>
         }
         ></Popup>
          )}
        {artworks.map((artwork, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DisplayArtworkArtist type="artwork" artwork={artwork} func={handleArtworkClick} funcAuction={() => createAuctionRequest(index)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ArtistProfilePage;