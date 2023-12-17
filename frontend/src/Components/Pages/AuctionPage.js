import React, { useState , useEffect } from 'react';
import DetailsPage from './DetailsPage';
import {TextField,Typography,Button} from '@mui/material';
import Popup from '../Popup';
import axios from "axios";
function AuctionPage() {
  const [highestBid, setHighestBid] = useState(0.0)
  const [state, setState] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(0.0);
  const [isError, setIsError] = React.useState(false);
  const [id, setId] = React.useState(-1);
  const [auction, setAuction] = React.useState(null)
  
  function handlePlaceBid(){
    console.log("PLACE BID CLICKED")
    setState(true)
  }
  function handleClose() {
    console.log("CLOSE IS SEND")
    setState(false)
  }
  const sendBidRequest = async () => {

    console.log("sending bid request ", id)
    const formData = new FormData();
      formData.append('user_id', 1); 
      formData.append('auction_id', id);
      formData.append('price', inputValue);
    try {

      const response = await axios.post('http://localhost:8080/bid/bidForAuction', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error sending bid request:', error);
    }
    handleClose()
  }
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  
    if (value < highestBid) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  };
  useEffect(() => {
    const getHighestBid = async () =>  {
      try {

        const auction = await getAuction()

        const response = await axios.get(`http://localhost:8080/bid/getHighestBid/${auction.auction_id}`);

        console.log(response.data);
        
        const highestBid = response.data

        if(highestBid == 0){
          //use auction id to get the auction and set the starting amount
          highestBid = auction.starting_amount
          console.log("id is ", id)
        }
        setHighestBid(highestBid)
      } catch (error) {
        console.error('Error fetching highest bid:', error);
      }
  }
  if (id !== -1) {
    getHighestBid();
  }
}, [id]);

  const getAuction = async () =>  {
    try {
      console.log("ARTWORK ID IS ", id)
      const response = await axios.get(`http://localhost:8080/artwork/auction/${id}`);
      console.log(response.data);
      const auction = response.data
      setAuction(auction)
      console.log("AUCTION IS ", auction)
    } catch (error) {
      console.error('Error fetching highest bid:', error);
    }
}

  return (
    <DetailsPage 
    setId = {setId}
    popup={<Popup
      state={state}
     handleClose={handleClose} 
     handleRequest={sendBidRequest}
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
       helperText={isError ? "Bid higher than " + highestBid : ""}
     />
     }
     ></Popup>}
     context={  <>
      <hr style={{ width: '50%', marginRight: '50%' }}></hr>
      <Typography gutterBottom variant="h5" component="div">
        {"Highest Bid: "}<span style={{ fontWeight: 'bold' }}>{highestBid} $</span>
      </Typography>
      <Button onClick={handlePlaceBid} sx={{ mt: 2, backgroundColor: "#302F4D", '&:hover': { backgroundColor: "#1e1d30" }, pr: 4, pl: 4 }} variant="contained">
        Place Bid
      </Button>
    </>}
     />
  );
}

export default AuctionPage;
