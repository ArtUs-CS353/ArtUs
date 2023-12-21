import React, { useState , useEffect } from 'react';
import DetailsPage from './DetailsPage';
import {TextField,Typography,Button, Container} from '@mui/material';
import Popup from '../Popup';
import axios from "axios";
function AuctionPage({userId}) {
  const [highestBid, setHighestBid] = useState(0.0)
  const [state, setState] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(0.0);
  const [isError, setIsError] = React.useState(false);
  const [id, setId] = React.useState(-1);
  const [auction, setAuction] = React.useState(null)
  const [isDisabled, setDisabled] = useState(true)
  const [currentBalance, setBalance] = useState(0)
  const [auctionType, setAuctionType] = useState('')
  
  function handlePlaceBid(){
    console.log("PLACE BID CLICKED")
    setState(true)
  }
  function handleClose() {
    console.log("CLOSE IS SEND")
    setState(false)
  }

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/enthusiast/${userId}`);
        const enthusiast = response.data;
        console.log("enthisast ", enthusiast)
        setBalance(enthusiast.balance)
        setDisabled(currentBalance - highestBid < 0)
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
      getBalance();
  });

  const sendBidRequest = async () => {

    console.log("sending bid request ", userId)
    const formData = new FormData();
      formData.append('user_id', userId); 
      formData.append('auction_id', auction.auction_id);
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
  
    if (value <= highestBid) {
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
        
        var highestBid = response.data.price

        if(highestBid == 0 || auction.type == "silent"){
          //use auction id to get the auction and set the starting amount
          highestBid = auction.starting_amount
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
      const response = await axios.get(`http://localhost:8080/artwork/auction/${id}`);
      const auction = response.data
      setAuction(auction)
      setAuctionType(auction.type)
      return auction
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
      <Typography gutterBottom sx = {{color: currentBalance-highestBid >= 0 ? "green" :  "red"}} variant="h5" component="div">
        {"Your Balance: "}<span style={{ fontWeight: 'bold' }}>{currentBalance}$</span>
      </Typography>
      {auctionType === "normal" && (
        <Typography gutterBottom variant="h5" component="div">
        {"Highest Bid: "}<span style={{ fontWeight: 'bold' }}>{highestBid}$</span>
      </Typography>
      )}
      {auctionType === "silent" && (
        <Typography gutterBottom variant="h5" component="div">
        {"Starting Amount: "}<span style={{ fontWeight: 'bold' }}>{highestBid}$</span>
      </Typography>
      )}
      
      <Button disabled={isDisabled} onClick={handlePlaceBid} sx={{ mt: 2, backgroundColor: "#302F4D", '&:hover': { backgroundColor: "#1e1d30" }, pr: 4, pl: 4 }} variant="contained">
        Place Bid
      </Button>
    </>}
     />
  );
}

export default AuctionPage;
