import React, {useEffect, useState} from 'react';
import { Grid, Container, Typography, Card, CardMedia} from '@mui/material';
import axios from "axios";
function HomePage() {
  const [auctionRequests, setAuctionRequests] = useState([]);

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
  return (
    <Container sx={{ mr: 2, ml:8, mt: 5 }}>
      {auctionRequests.map((request, index) => (
           <>
           <Grid spacing={4}>
           <Card sx={{ display: 'flex', marginBottom: 2 
           ,'&:hover': {
            boxShadow: '2px 4px 8px 2px rgba(0, 0, 0.1, 0.3)',
            transition: '0.3s'}
           }}>
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
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Description: "}</span> ${request.description}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Start Date: "}</span> {request.start}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"End Date: "}</span>{request.end}</Typography>
                {/* Add more text information here */}
              </Grid>
            </Card>
           </Grid>
            
          </>
         
        ))}
    </Container>
  );
}

export default HomePage;
