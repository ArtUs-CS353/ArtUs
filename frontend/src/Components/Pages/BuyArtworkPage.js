import React from 'react';
import DetailsPage from './DetailsPage';
import {Typography,Button} from '@mui/material';
function BuyArtworkPage() {
  function handleBuy(){
    console.log("BUY CLICKED")
  }
  return (
    <DetailsPage 
     context={  <>
      <hr style={{ width: '50%', marginRight: '50%' }}></hr>
      <Typography gutterBottom variant="h5" component="div">
        {"Price: "}<span style={{ fontWeight: 'bold' }}>1500$</span>
      </Typography>
      <Button onClick={handleBuy} sx={{ mt: 2, backgroundColor: "#302F4D", '&:hover': { backgroundColor: "#1e1d30" }, pr: 4, pl: 4 }} variant="contained">
        Buy Artwork
      </Button>
    </>}
     />
  );
}

export default BuyArtworkPage;
