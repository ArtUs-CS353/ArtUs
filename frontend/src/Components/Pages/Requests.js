import React, {useEffect, useState} from 'react';
import { Grid, Container, Typography, Card, CardMedia} from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import Popup from '../Popup';
function Requests() {
  const [auctionRequests, setAuctionRequests] = useState([]);
  const [auctionState, setAuctionState] = useState('')
  const [popupEnabled, setPopupEnabled] = useState(false)
  const [exhibitionState, setExhibitionState] = useState(false)
  const [id,setId] = useState(-1)

  const getArtwork = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/artwork/${id}`);
      console.log("ARTWORK: ", response.data)
      const artwork = response.data;
      return artwork;
    } catch (error) {
      console.error("Failed to fetch artist: ", error);
      throw error;
    }

  }
  const sendRequest = async () =>  {
    console.log("HERE AS REQUEST")
    if(auctionState === "accepted"){
        console.log("sending accepted ", id)
        try {
          const response = await axios.put(`http://localhost:8080/auction/approve/${id}`);
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading artwork:', error);
        }
    }
    else if(auctionState === "rejected") {
        console.log("sending rejected")
        try {
          const response = await axios.put(`http://localhost:8080/auction/decline/${id}`);
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading artwork:', error);
        }
    }
    handleClose()
  }
  const handleAccept = (index) =>{
    console.log("accept ", auctionRequests[index])
    setAuctionState('accepted')
    setId(auctionRequests[index].auction_id)
    setPopupEnabled(true)

  }
  const handleReject = (index) =>{
    console.log('rejected ', auctionRequests[index])
    setAuctionState('rejected')
    setId(auctionRequests[index].auction_id)
    setPopupEnabled(true)
  }
  useEffect(() => {
    const getAuctionsRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/auction/getAllWaitingAuctions`);
        const auctions = response.data;
        console.log("AUCTIONS: ", auctions)
        const requestsWithURL = await Promise.all(auctions.map(async (auction) => {
          const sDate = new Date(auction.start_date);
          const start = sDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
          });
          const eDate = new Date(auction.end_date);
          const end = eDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
          });
          const artwork = await getArtwork(auction.artwork_id);
          return {
            ...auction,
            imageURL: artwork.imageURL,
            auctionType: auction.type,
            start: start,
            end: end,
            title: artwork.title,
            size: artwork.size,
            material: artwork.material,
            description: artwork.description
          };
        }));
        console.log("updated list : ", requestsWithURL)
        setAuctionRequests(requestsWithURL)
      } catch (error) {
        console.error("Failed to fetch artworks: ", error);
        throw error;
      }
    };
  
    getAuctionsRequests();
  }, []); 
  function handleClose() {
    setPopupEnabled(false)
  }
  return (
    <Container sx={{ mr: 2, ml:8, mt: 5 }}>
      {(popupEnabled &&
        <Popup 
        state={popupEnabled}
        handleClose={handleClose} 
        dialogTitle={"Are you sure to make the request " + auctionState  + "?"} 
        handleRequest={sendRequest}
        > 
        </Popup>)}
      {auctionRequests.map((request, index) => (
           <>
           <Grid spacing={4}>
           <Card sx={{ display: 'flex', marginBottom: 2 
           ,'&:hover': {
            boxShadow: '2px 4px 8px 2px rgba(0, 0, 0.1, 0.3)',
            transition: '0.3s'}
           }}
           >
              <CardMedia
                component="img"
                sx={{ width: 160 }} // Adjust the width as needed
                image={request.imageURL}
                alt={request.title}
              />
              <Grid container direction="column" justifyContent="center" sx={{ padding: 2 }}>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Artwork Name: "}</span>{request.title}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Artist Name: "}</span></Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Size: "}</span>{request.size}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Auction Type: "}</span>{request.auctionType}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Starting Amount: "}</span> ${request.starting_amount}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Description: "}</span> {request.description}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Start Date: "}</span> {request.start}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"End Date: "}</span>{request.end}</Typography>
                {/* Add more text information here */}
              </Grid>
              <Grid container sx = {{mt:8,ml:15}}>
              <Button onClick={() => handleAccept(index)}>ACCEPT</Button>
              <Button onClick={() => handleReject(index)}>REJECT</Button>
              </Grid>
            </Card>
           </Grid>
            
          </>
         
        ))}
    </Container>
  );
}

export default Requests;
