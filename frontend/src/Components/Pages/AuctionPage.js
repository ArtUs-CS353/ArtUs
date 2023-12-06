import React from 'react';
import DetailsPage from './DetailsPage';
import {TextField,Typography,Button} from '@mui/material';
import Popup from '../Popup';
function AuctionPage() {
  function handlePlaceBid(){
    console.log("PLACE BID CLICKED")
    setState(true)
  }
  function handleClose() {
    console.log("CLOSE IS SEND")
    setState(false)
  }
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  
    if (value < 1500) { // Assuming 10 is your minimum value
      setIsError(true);
    } else {
      setIsError(false);
    }
  };
  const [state, setState] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  return (
    <DetailsPage popup={<Popup
      state={state}
     handleClose={handleClose} 
     dialogTitle={"Send Bid Request"} 
     textField={ <TextField
       autoFocus
       margin="dense"
       id="name"
       label="Bid Amount"
       type="number"
       fullWidth
       variant="standard"
       value={inputValue}
       onChange={handleInputChange}
       error={isError}
       helperText={isError ? "Bid higher than " + " 1500$": ""}
     />
     }
     ></Popup>}
     context={  <>
      <hr style={{ width: '50%', marginRight: '50%' }}></hr>
      <Typography gutterBottom variant="h5" component="div">
        {"Highest Bid: "}<span style={{ fontWeight: 'bold' }}>1500$</span>
      </Typography>
      <Button onClick={handlePlaceBid} sx={{ mt: 2, backgroundColor: "#302F4D", '&:hover': { backgroundColor: "#1e1d30" }, pr: 4, pl: 4 }} variant="contained">
        Place Bid
      </Button>
    </>}
     />
  );
}

export default AuctionPage;
