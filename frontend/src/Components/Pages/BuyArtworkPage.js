import React, { useState, useEffect }  from 'react';
import DetailsPage from './DetailsPage';
import {Typography,Button} from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from "axios";
function BuyArtworkPage() {
  const [id,setId] = useState(-1)
  const [price, setPrice] = useState(0)
  function handleBuy(){
    console.log("BUY CLICKED ", id)
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
  return (
    <DetailsPage 
     setId={setId}
     context={  <>
      <hr style={{ width: '50%', marginRight: '50%' }}></hr>
      <Typography gutterBottom variant="h5" component="div">
        {"Price: "}<span style={{ fontWeight: 'bold' }}>{price}$</span>
      </Typography>
      <Button onClick={handleBuy} sx={{ mt: 2, backgroundColor: "#302F4D", '&:hover': { backgroundColor: "#1e1d30" }, pr: 4, pl: 4 }} variant="contained">
        Buy Artwork
      </Button>
    </>}
     />
  );
}

export default BuyArtworkPage;
