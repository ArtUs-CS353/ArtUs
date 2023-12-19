import React, { useState, useEffect }  from 'react';
import DetailsPage from './DetailsPage';
import {Typography,Button} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from "axios";
function BuyArtworkPage({userId}) {
  const [id,setId] = useState(-1)
  const [price, setPrice] = useState(0)
  const [isDisabled, setDisabled] = useState(true)
  const [currentBalance, setBalance] = useState(0)

  const handleBuy = async () =>{
    console.log("BUY CLICKED ", id)
    console.log("for user ", userId)
    const formData = new FormData();
    formData.append('user_id', userId); 
    try {
      const response = await axios.post(`http://localhost:8080/artwork/${id}/direct-purchase`, formData);
      console.log(response.data)
    } catch (error) {
      console.error("Failed to buy artwork: ", error);
      throw error;
    }
  }
  
  useEffect(() => {
    const getPrice = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/artwork/${id}`);
        const artwork = response.data;
        setPrice(artwork.price)
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
  
    if (id !== -1) {
      getPrice();
    }
  }, [id]);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/enthusiast/${userId}`);
        const enthusiast = response.data;
        console.log("enthisast ", enthusiast)
        setBalance(enthusiast.balance)
        setDisabled(currentBalance - price < 0)
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
      getBalance();
  });
  return (
    <DetailsPage 
     setId={setId}
     context={  <>
      <hr style={{ width: '50%', marginRight: '50%' }}></hr>
      <Typography gutterBottom sx = {{color: currentBalance-price >= 0 ? "green" :  "red"}} variant="h5" component="div">
        {"Your Balance: "}<span style={{ fontWeight: 'bold' }}>{currentBalance}$</span>
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        {"Price: "}<span style={{ fontWeight: 'bold' }}>{price}$</span>
      </Typography>
      <Button disabled={isDisabled} onClick={handleBuy} sx={{ mt: 2, backgroundColor: "#302F4D", '&:hover': { backgroundColor: "#1e1d30" }, pr: 4, pl: 4 }} variant="contained">
        Buy Artwork
      </Button>
    </>}
     />
  );
}

export default BuyArtworkPage;
