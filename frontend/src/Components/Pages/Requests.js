import React, {useEffect, useState} from 'react';
import { Grid, Container, Typography, Card, CardMedia, Tabs, Tab} from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import Popup from '../Popup';
function Requests() {
  const [auctionRequests, setAuctionRequests] = useState([]);
  const [state, setState] = useState('')
  const [popupEnabled, setPopupEnabled] = useState(false)
  const [exhibitionState, setExhibitionState] = useState(false)
  const [eventRequests, setEventRequests] = useState([])
  const [formattedExhibitionRequest, setFormattedExhibitionRequests] = useState([])
  const [requestType, setRequestType] = useState('')
  const [id,setId] = useState(-1)
  const [id2,setId2] = useState(-1)
  const [selectedTab, setSelectedTab] = useState(0);
  const [artistRequests, setArtistRequest] = useState([])
  const [artworkRequests, setArtworkRequest] = useState([])

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
    if(requestType === "auction"){
      if(state === "accepted"){
        console.log("sending accepted ", id)
        try {
          const response = await axios.put(`http://localhost:8080/auction/approve/${id}`);
          console.log(response.data);
        } catch (error) {
          console.error('Error accepting auction:', error);
        }
      }
      else if(state === "rejected") {
          console.log("sending rejected")
          try {
            const response = await axios.put(`http://localhost:8080/auction/decline/${id}`);
            console.log(response.data);
          } catch (error) {
            console.error('Error rejecting auction:', error);
          }
      }
    }
    else if(requestType === "exhibition"){
      const formData = new FormData();
      formData.append('exhibitionId', id); 
      if(state === "accepted"){
        console.log("sending accepted ", id , " ", id2)
        try {
          const response = await axios.put(`http://localhost:8080/artwork/${id2}/approveToExhibition`, formData);
          console.log(response.data);
        } catch (error) {
          console.error('Error approving artwork:', error);
        }
      }
      else if(state === "rejected") {
          console.log("sending rejected ", id , " ", id2)
          try {
            const response = await axios.put(`http://localhost:8080/artwork/${id2}/declineToExhibition`, formData);
            console.log(response.data);
          } catch (error) {
            console.error('Error approving artwork:', error);
          }
      }

      else if(requestType === "artist"){
        if(state === "accepted"){
          console.log("sending accepted ", id)
          try {
            const response = await axios.put(`http://localhost:8080/artist_request/accept/${id}`);
            console.log(response.data);
          } catch (error) {
            console.error('Error accepting auction:', error);
          }
        }
        else if(state === "rejected") {
            console.log("sending rejected")
            try {
              const response = await axios.put(`http://localhost:8080/artist_request/decline/${id}`);
              console.log(response.data);
            } catch (error) {
              console.error('Error rejecting auction:', error);
            }
        }
      }
    }
    if(requestType === "event"){
      if(state === "accepted"){
        console.log("sending accepted ", id)
        try {
          const response = await axios.put(`http://localhost:8080/event/approve/${id}`);
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading artwork:', error);
        }
      }
      else if(state === "rejected") {
          console.log("sending rejected")
          try {
            const response = await axios.put(`http://localhost:8080/event/decline/${id}`);
            console.log(response.data);
          } catch (error) {
            console.error('Error uploading artwork:', error);
          }
      }
    }
    
    if(requestType === "artwork"){
      if(state === "accepted"){
        console.log("sending accepted ", id)
        try {
          const response = await axios.put(`http://localhost:8080/artwork/approve/${id}`);
          console.log(response.data);
        } catch (error) {
          console.error('Error approving artwork:', error);
        }
      }
      else if(state === "rejected") {
          console.log("sending rejected")
          try {
            const response = await axios.put(`http://localhost:8080/artwork/decline/${id}`);
            console.log(response.data);
          } catch (error) {
            console.error('Error approving artwork:', error);
          }
      }
    }
    handleClose()
  }
  const handleAccept = (index) =>{
    console.log("accept ", auctionRequests[index])
    setRequestType("auction")
    setState('accepted')
    setId(auctionRequests[index].auction_id)
    setPopupEnabled(true)

  }
  const handleReject = (index) =>{
    setRequestType("auction")
    console.log('rejected ', auctionRequests[index])
    setState('rejected')
    setId(auctionRequests[index].auction_id)
    setPopupEnabled(true)
  }

  const handleEventAccept = (index) =>{
    setRequestType("event")
    console.log("accept ", eventRequests[index].event_id)
    setState('accepted')
    setId(eventRequests[index].event_id)
    setPopupEnabled(true)
  }
  const handleEventReject = (index) =>{
    setRequestType("event")
    console.log("rejected ", eventRequests[index].event_id)
    setState('rejected')
    setId(eventRequests[index].event_id)
    setPopupEnabled(true)
  }


  const handleAcceptExhibition = (index, artworkIndex) =>{
    setRequestType("exhibition")
    setState('accepted')
    if(formattedExhibitionRequest != null){
      setId(formattedExhibitionRequest[index].exhibition_id)
      setId2(formattedExhibitionRequest[index].artworks[artworkIndex].artwork_id)
      console.log('accepted ', formattedExhibitionRequest[index].exhibition_id , " ", formattedExhibitionRequest[index].artworks[artworkIndex].artwork_id)
      setPopupEnabled(true)
    }
   
  }
  const handleRejectExhibition = (index, artworkIndex) =>{
    setRequestType("exhibition")
    setState('rejected')
    if(formattedExhibitionRequest != null){
      setId(formattedExhibitionRequest[index].exhibition_id)
      setId2(formattedExhibitionRequest[index].artworks[artworkIndex].artwork_id)
      console.log('rejected ', formattedExhibitionRequest[index].exhibition_id , " ", formattedExhibitionRequest[index].artworks[artworkIndex].artwork_id)
      setPopupEnabled(true)
    }
   
  }

  const handleArtistAccept = (index) =>{
    setRequestType("artist")
    setState('accepted')
    if(artistRequests != null){
      setId(artistRequests[index].request_id)
      setPopupEnabled(true)
    }
   
  }
  const handleArtistReject = (index) =>{
    setRequestType("artist")
    setState('rejected')
    if(artistRequests != null){
      setId(artistRequests[index].request_id)
      setPopupEnabled(true)
    }
   
  }

  const handleArtworkAccept = (index) =>{
    setRequestType("artwork")
    setState('accepted')
    if(artworkRequests != null){
      setId(artworkRequests[index].artwork_id)
      setPopupEnabled(true)
    }
   
  }
  const handleArtworkReject = (index) =>{
    setRequestType("artwork")
    setState('rejected')
    if(artworkRequests != null){
      setId(artworkRequests[index].artwork_id)
      setPopupEnabled(true)
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
          //get artist here
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


  const getArtist = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/artists/${id}`);
      const artist = response.data;
      return artist;
    } catch (error) {
      console.error("Failed to fetch artist: ", error);
      throw error;
    }
  };

  const getAllExhibitions = async() => {
    try {
      const response = await axios.get(`http://localhost:8080/exhibition/getAllFutureExhibitions`);
      const exhibitions = response.data;
      return exhibitions
    } catch (error) {
      console.error("Failed to fetch future exhibitions: ", error);
      throw error;
    }
  }
  
  const getAllWaiting = async(exhibitionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/exhibition/${exhibitionId}/getAllArtworks/${"waiting"}`);
      const artworks = response.data;
      const artworksWithArtists = await Promise.all(artworks.map(async (artwork) => {
        const artist = await getArtist(artwork.artist_id);
        return {
          ...artwork,
          artist: artist.user_name + " " + artist.user_surname,
        };
      }));
      return artworksWithArtists
    } catch (error) {
      console.error("Failed to fetch waiting artworks: ", error);
      throw error;
    }
  }
  useEffect(() => {
    const getExhibitionRequests = async () => {
      try {
        //get all exhibitions
        const exhibitions = await getAllExhibitions();
        var exhibitionsWithArtworks = [];

        // if there are artwork whose status = waiting for that exhibition id, add it to the list
        const artworksPromises = exhibitions.map(exhibition => getAllWaiting(exhibition.exhibition_id));
        const artworksResults = await Promise.all(artworksPromises);

        // list format: exhibition info , artwork info
        for (let i = 0; i < exhibitions.length; i++) {
          exhibitionsWithArtworks.push({
            ...exhibitions[i],
            artworks: artworksResults[i]
          });
        }

        console.log("Exhibitions formatted: ", exhibitionsWithArtworks);
        setFormattedExhibitionRequests(exhibitionsWithArtworks)


      } catch (error) {
        console.error("Failed to fetch exhibitions: ", error);
        throw error;
      }
    };
  
    getExhibitionRequests();
  }, []); 


  useEffect(() => {
    const getEventRequests = async () => {
      try {
        //get waiting events
        const response = await axios.get(`http://localhost:8080/event/getAllWaitingEvents`);
        const events = response.data
        console.log("waiting events: ",  events)

        //get the artist that send it
        //combine
        const eventsWithArtists = await Promise.all(events.map(async (event) => {
          const artist = await getArtist(event.artist_id);
          const sDate = new Date(event.start_date);
          const start = sDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
          });
          const eDate = new Date(event.end_date);
          const end = eDate.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
          });
          return {
            ...event,
            artist: artist.user_name + " " + artist.user_surname,
            startDate: start,
            endDate: end
          };
        }));
        //set
        console.log("events formattted ", eventsWithArtists)
        setEventRequests(eventsWithArtists)
       


      } catch (error) {
        console.error("Failed to fetch events: ", error);
        throw error;
      }
    };
  
    getEventRequests();
  }, []); 

  useEffect(() => {
    const getArtistRequests = async () => {
      try {

        const response = await axios.get(`http://localhost:8080/artist_request/getAll`);
        const artists = response.data
        console.log("waiting artists: ",  artists)

        
        setArtistRequest(artists)


      } catch (error) {
        console.error("Failed to fetch exhibitions: ", error);
        throw error;
      }
    };
  
    getArtistRequests();
  }, []); 


  useEffect(() => {
    const getArtworkRequests = async () => {
      try {

        // const response = await axios.get(`http://localhost:8080/artwork/getAll/${"waiting"}`);
        // const artworks = response.data
        //console.log("waiting artworks: ",  artworks)

        
        // setArtworkRequest(artworks)


      } catch (error) {
        console.error("Failed to fetch artworks: ", error);
        throw error;
      }
    };
  
    getArtworkRequests();
  }, []); 

  function handleClose() {
    setPopupEnabled(false)
  }
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <Container sx={{ mr: 2, ml:8, mt: 5 }}>
      {(popupEnabled &&
        <Popup 
        state={popupEnabled}
        handleClose={handleClose} 
        dialogTitle={"Are you sure to make the request " + state  + "?"} 
        handleRequest={sendRequest}
        > 
        </Popup>)}
        <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        sx={{ '& .MuiTab-root': { minWidth: '20%' } }}
      >
        <Tab label="Auction Requests" />
        <Tab label="Exhibition Requests" />
        <Tab label="Event Requests" />
        <Tab label="Artist Requests" />
        <Tab label="Artwork Requests" />
      </Tabs>
        
        {selectedTab === 0 && (
          <>
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
           </>
        )}
         {selectedTab === 1 && (
          <>
         {formattedExhibitionRequest.map((request, index) => (
                 request.artworks.map((artwork, artworkIndex) =>
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
                image={artwork.imageURL}
                alt={artwork.title}
              />
              <Grid container direction="column" justifyContent="center" sx={{ padding: 2 }}>
              <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Exhibition Name: "}</span>{request.exhibition_name}</Typography>
              <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Artist Name: "}</span>{artwork.artist_name}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Artwork Name: "}</span>{artwork.title}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Description: "}</span> {artwork.description}</Typography>
                {/* Add more text information here */}
              </Grid>
              <Grid container sx = {{mt:8,ml:15}}>
              <Button onClick={() => handleAcceptExhibition(index, artworkIndex)}>ACCEPT</Button>
              <Button onClick={() => handleRejectExhibition(index, artworkIndex)}>REJECT</Button>
              </Grid>
            </Card>
           </Grid>
            
          </>
          )))}
          </>
         )}
      

      {selectedTab === 2 && (
        <>
      {eventRequests.map((request, index) => (
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
                image={request.poster_URL}
                alt={request.title}
              />
              <Grid container direction="column" justifyContent="center" sx={{ padding: 2 }}>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Artist Name: "}</span>{request.artist}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Start Date: "}</span>{request.startDate}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"End Date: "}</span>{request.endDate}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Link: "}</span> https://us04web.zoom.us/j/76958390769?pwd=HdFXpFcnVuD7smwSfRqANsyhlvWsAR.1</Typography>
              </Grid>
              <Grid container sx = {{mt:8,ml:15}}>
              <Button onClick={() => handleEventAccept(index)}>ACCEPT</Button>
              <Button onClick={() => handleEventReject(index)}>REJECT</Button>
              </Grid>
            </Card>
           </Grid>
            
          </>
         
        ))}
        </>
      )}

{selectedTab === 3 && (
        <>
      {artistRequests.map((request, index) => (
           <>
           <Grid spacing={4}>
           <Card sx={{ display: 'flex', marginBottom: 2 
           ,'&:hover': {
            boxShadow: '2px 4px 8px 2px rgba(0, 0, 0.1, 0.3)',
            transition: '0.3s'}
           }}
           >
              <Grid container direction="column" justifyContent="center" sx={{ padding: 2 }}>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Artist Name: "}</span>{request.user_name}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Artist Surname: "}</span>{request.user_surname}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Details: "}</span>{request.profile_details}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Biography: "}</span> {request.biography}</Typography>
              </Grid>
              <Grid container sx = {{mt:8,ml:15}}>
              <Button onClick={() => handleArtistAccept(index)}>ACCEPT</Button>
              <Button onClick={() => handleArtistReject(index)}>REJECT</Button>
              </Grid>
            </Card>
           </Grid>
            
          </>
         
        ))}
        </>
      )}


{selectedTab === 4 && (
        <>
      {artworkRequests.map((request, index) => (
           <>
           <Grid spacing={4}>
           <Card sx={{ display: 'flex', marginBottom: 2 
           ,'&:hover': {
            boxShadow: '2px 4px 8px 2px rgba(0, 0, 0.1, 0.3)',
            transition: '0.3s'}
           }}
           >
              <Grid container direction="column" justifyContent="center" sx={{ padding: 2 }}>
              <CardMedia
                   component="img"
                   sx={{ width: 160 }} // Adjust the width as needed
                   image={request.imageURL}
                   alt={request.title}
                 />
              <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Artwork Name: "}</span>{request.title}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Artist Name: "}</span>{request.user_name} {request.user_surname}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Description: "}</span>{request.description}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Type: "}</span> {request.type}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Material: "}</span> {request.material}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Size: "}</span> {request.size}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Rarity: "}</span> {request.rarity}</Typography>
                <Typography variant="h8"><span style={{ fontWeight: 'bold' }}>{"Price: "}</span> {request.price}</Typography>
              </Grid>
              <Grid container sx = {{mt:8,ml:15}}>
              <Button onClick={() => handleArtworkAccept(index)}>ACCEPT</Button>
              <Button onClick={() => handleArtworkReject(index)}>REJECT</Button>
              </Grid>
            </Card>
           </Grid>
            
          </>
         
        ))}
        </>
      )}
    </Container>
  );
}

export default Requests;
